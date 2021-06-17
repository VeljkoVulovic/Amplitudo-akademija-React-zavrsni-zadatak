import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getClients, deleteClient } from "../../services/clients";
import { Table, Button, Modal } from "antd";
import { useModal } from "../../contexts/ModalContext";
import ClientForm from "../../components/forms/ClientForm";
import {
  DeleteFilled,
  EditFilled,
  PlusSquareOutlined,
} from "@ant-design/icons";

const Clients = () => {
  const queryClient = useQueryClient();
  const { data: getClientsResponse } = useQuery("getClients", getClients);
  const newData = getClientsResponse?.data?.data;
  const { open } = useModal();
  const { confirm } = Modal;

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
      content: <ClientForm id={record?.id} />,
    });
  };

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
              title: `Do you want to delete client ${record?.name}?`,
              icon: <DeleteFilled style={{ color: "red" }} />,
              content: `This action will also delete all reservations tied to client ${record?.name}!`,
              okType: "danger",
              onOk() {
                deleteMutation.mutate(record.id);
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

  return (
    <div>
      <div style={{ width: "105px", margin: "20px auto" }}>
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
      </div>
      <div className="tableDiv">
        <Table
          columns={columns}
          dataSource={newData}
          pagination={false}
          rowKey={(record) => record.id}
          onRow={(record) => {
            return {
              onClick: () => {
                open({
                  title: `Info - ${record?.name}`,
                  content: <ClientForm id={record?.id} disabled={true} />,
                });
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default Clients;
