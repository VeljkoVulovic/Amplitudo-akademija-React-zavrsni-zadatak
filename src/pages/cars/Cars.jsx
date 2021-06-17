import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCars, deleteCar } from "../../services/cars";
import { Table, Button, Modal } from "antd";
import { useModal } from "../../contexts/ModalContext";
import CarForm from "../../components/forms/CarForm";
import {
  DeleteFilled,
  EditFilled,
  PlusSquareOutlined,
} from "@ant-design/icons";

const Cars = () => {
  const queryClient = useQueryClient();
  const { data: getCarsResponse } = useQuery("getCars", getCars);
  const newData = getCarsResponse?.data?.data;
  const { open } = useModal();
  const { confirm } = Modal;

  const deleteMutation = useMutation((id) => deleteCar(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("cars");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editButtonClick = (record) => {
    open({
      title: `Edit car - ${record?.id}`,
      content: <CarForm id={record?.id} />,
    });
  };

  const columns = [
    { key: "id", dataIndex: "id", title: "Id", width: "80px" },
    {
      key: "plate_no",
      dataIndex: "plate_no",
      title: "Plate number",
      width: "150px",
    },
    {
      key: "production_year",
      dataIndex: "production_year",
      title: "Production year",
      width: "135px",
    },
    {
      key: "car_type_id",
      title: "Car type",
      render: (record) => record.car_type.name,
      width: "120px",
    },
    {
      key: "no_of_seats",
      dataIndex: "no_of_seats",
      title: "No of seats",
      width: "120px",
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
              title: `Do you want to delete car ${record?.id}?`,
              icon: <DeleteFilled style={{ color: "red" }} />,
              content: `This action will also delete all reservations tied to car ${record?.id}!`,
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
              title: `Add new car`,
              content: <CarForm />,
            })
          }
          icon={<PlusSquareOutlined style={{ color: "green" }} />}
        >
          Add Car
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
                  content: <CarForm id={record?.id} disabled={true} />,
                });
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default Cars;
