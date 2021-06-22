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

  const editButtonClick = (id) => {
    open({
      title: `Edit client - ${id}`,
      content: <ClientForm id={id} />,
    });
  };

  const {
    data: getClientsResponse,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["clients", { search },2], getClients, {
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
    },
    { key: "name", dataIndex: "name", title: "Name" },
    {
      key: "phone_no",
      dataIndex: "phone_no",
      title: "Phone",
    },
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
    {
      key: "country_id",
      dataIndex: ["country", "name"],
      title: "Country",
    },
    {
      key: "remarks",
      dataIndex: "remarks",
      title: "Remarks",
      ellipsis: true,
    },
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
            if (record?.user?.id) {
              editButtonClick(record?.user.id);
            } else {
              confirm({
                title: "This user dont have client data.",
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
            if (record?.user?.id) {
              confirm({
                title: `Do you want to delete client ${record?.name}?`,
                icon: <DeleteFilled className="red" />,
                okType: "danger",
                onOk() {
                  deleteMutation.mutate(record?.user.id);
                },
                onCancel() {},
              });
            } else {
              confirm({
                title: "This user dont have client data. You cant delete it.",
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
          icon={<DeleteFilled className="red" />}
        >
          Delete
        </Button>
      ),
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
      <div className="buttons">
        <Button
          onClick={() =>
            open({
              title: `Add new client`,
              content: <ClientForm />,
            })
          }
          icon={<PlusSquareOutlined className="green" />}
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
          scroll={{ x: "1200px", y: "500px" }}
          pagination={false}
          rowKey={(record) => record?.id}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record?.user?.id) {
                  open({
                    title: `Info - ${record?.name}`,
                    content: (
                      <ClientForm id={record?.user?.id} disabled={true} />
                    ),
                  });
                } else {
                  confirm({
                    title: "This user dont have client data.",
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
