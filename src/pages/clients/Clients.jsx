import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import { getClients, deleteClient } from "../../services/clients";
import { Table, Button, Modal, Input } from "antd";
import { useModal } from "../../contexts/ModalContext";
import ClientForm from "../../components/forms/ClientForm";
import {
  DeleteFilled,
  EditFilled,
  PlusSquareOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const Clients = () => {
  const queryClient = useQueryClient();
  const { open } = useModal();
  const { confirm } = Modal;
  const { Search } = Input;
  const [search, setSearch] = useState("");

  const deleteMutation = useMutation((id) => deleteClient(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editButtonClick = (record) => {
    open({
      title: `Edit client - ${record?.name}`,
      content: <ClientForm id={record?.user.id} />,
    });
  };

  const {
    data: getClientsResponse,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["clients", { search }], getClients, {
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
      key: "identification_document_no",
      dataIndex: "identification_document_no",
      title: "No of id doc",
      width: "85px",
    },
    { key: "name", dataIndex: "name", title: "Name", width: "100px" },
    { key: "phone_no", dataIndex: "phone_no", title: "Phone" },
    { key: "email", dataIndex: "email", title: "Email" },
    {
      key: "date_of_first_reservation",
      dataIndex: "date_of_first_reservation",
      title: "Date of first reservation",
    },
    {
      key: "date_of_last_reservation",
      dataIndex: "date_of_last_reservation",
      title: "Date of last reservation",
    },
    { key: "remarks", dataIndex: "remarks", title: "Remarks", ellipsis: true },
    {
      key: "edit",
      title: "Edit",
      render: (record) => (
        <Button
          icon={
            <EditFilled
              className="site-form-item-icon"
              style={{ color: "blue" }}
            />
          }
          onClick={(e) => {
            e.stopPropagation();
            if (record?.user.id) {
              editButtonClick(record);
            } else {
              confirm({
                title: "This user is not client.",
                icon: <ExclamationCircleOutlined />,
                onOk() {
                  console.log("OK");
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }
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
              title: `Do you want to delete client ${record?.name}?`,
              icon: <DeleteFilled style={{ color: "red" }} />,
              content: `This action will also delete all reservations tied to client ${record?.name}!`,
              okType: "danger",
              onOk() {
                deleteMutation.mutate(record?.user.id);
              },
              onCancel() {},
            });
          }}
          icon={<DeleteFilled style={{ color: "red" }} />}
        >
          Delete
        </Button>
      ),
      width: "120px",
    },
  ];

  const onSearch = (data) => {
    setSearch(data);
  };

  const newData = [];
  getClientsResponse?.pages.forEach((page) => {
    newData.push(...page.data.data);
  });

  return (
    <div>
      <div className="header">
        <Button
          onClick={() =>
            open({
              title: `Add new client`,
              content: <ClientForm />,
            })
          }
          icon={<PlusSquareOutlined style={{ color: "green" }} />}
        >
          Add Client
        </Button>
        <Search
          style={{ width: "150px" }}
          placeholder="Search name..."
          onSearch={onSearch}
          loading={isFetching}
          allowClear
        />
      </div>
      <div className="tableDiv">
        <Table
          columns={columns}
          dataSource={newData}
          loading={isFetchingNextPage}
          scroll={{ y: 480 }}
          pagination={false}
          rowKey={(record) => record?.id}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record?.user?.id) {
                  open({
                    title: `Info - ${record?.name}`,
                    content: (
                      <ClientForm id={record?.user.id} disabled={true} />
                    ),
                  });
                } else {
                  confirm({
                    title: "This user is not client.",
                    icon: <ExclamationCircleOutlined />,
                    onOk() {
                      console.log("OK");
                    },
                    onCancel() {
                      console.log("Cancel");
                    },
                  });
                }
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default Clients;
