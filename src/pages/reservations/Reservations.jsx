import React, { useEffect } from "react";
import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import {
  getReservations,
  deleteReservation,
} from "../../services/reservations";
import { Table, Button, Modal } from "antd";
import { useModal } from "../../contexts/ModalContext";
import ReservationForm from "../../components/forms/ReservationForm";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Reservations = () => {
  const queryClient = useQueryClient();
  const { open } = useModal();
  const { confirm } = Modal;

  const deleteMutation = useMutation((id) => deleteReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("reservations");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editButtonClick = (record) => {
    open({
      title: `Edit reservation - ${record?.id}`,
      content: <ReservationForm id={record?.id} />,
    });
  };

  const {
    data: getReservationsResponse,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["reservations", 2], getReservations, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.current_page === lastPage.data.last_page
        ? undefined
        : lastPage.data.current_page + 1;
    },
  });

  useEffect(() => {
    let data = document.querySelector(".ant-table-body");
    data.addEventListener("scroll", (event) => {
      if (
        event.target.scrollTop ===
        event.target.scrollHeight - event.target.clientHeight
      ) {
        fetchNextPage();
      }
    });
  });

  const columns = [
    {
      key: "client",
      dataIndex: ["client", "name"],
      title: "Client",
    },
    {
      key: "plate_no",
      dataIndex: ["vehicle", "plate_no"],
      title: "Plate number",
    },
    {
      key: "from_date",
      dataIndex: "from_date",
      title: "From date",
    },
    {
      key: "to_date",
      dataIndex: "to_date",
      title: "To date",
    },
    {
      key: "rent_location",
      dataIndex: ["rent_location", "name"],
      title: "Pick-up location",
    },
    {
      key: "return_location",
      dataIndex: ["return_location", "name"],
      title: "Drop-off location",
    },
    {
      key: "total_price",
      dataIndex: "total_price",
      title: "Total price",
    },
    {
      key: "edit",
      title: "Edit",
      render: (record) => (
        <Button
          icon={<EditFilled className="site-form-item-icon blue" />}
          onClick={(e) => {
            e.stopPropagation();
            editButtonClick(record);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      title: "Delete",
      render: (record) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            confirm({
              title: `Do you want to delete reservation ${record?.id}?`,
              icon: <DeleteFilled className="red" />,
              content: `This action will delete reservation ${record?.id}!`,
              okType: "danger",
              onOk() {
                deleteMutation.mutate(record.id);
              },
              onCancel() {},
            });
          }}
          icon={<DeleteFilled className="red" />}
        >
          Delete
        </Button>
      ),
      width: "120px",
    },
  ];

  const newData = [];
  getReservationsResponse?.pages.forEach((page) => {
    newData.push(...page.data.data);
  });

  return (
    <div>
      <div className="buttons"></div>
      <div className="tableDiv">
        <Table
          columns={columns}
          dataSource={newData}
          loading={isFetchingNextPage}
          scroll={{ x: "1200px", y: "500px" }}
          pagination={false}
          rowKey={(record) => record?.id}
          onRow={(record) => {
            return {
              onClick: () => {
                open({
                  title: `Info reservation - ${record?.id}`,
                  content: <ReservationForm id={record?.id} disabled={true} />,
                });
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default Reservations;
