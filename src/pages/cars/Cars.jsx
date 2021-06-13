import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getCars, deleteCar } from "../../services/cars";
import CarModal from "../../components/modal/CarModal";
import DeleteModal from "../../components/modal/DeleteModal";

const Clients = () => {
  const [data, setData] = useState([]);

  const columns = [
    { key: "id", dataIndex: "id", title: "Id" },
    { key: "plate_no", dataIndex: "plate_no", title: "Plate number" },
    {
      key: "production_year",
      dataIndex: "production_year",
      title: "Production year",
    },
    {
      key: "car_type_id",
      title: "Car type",
      render: (record) => record.car_type.name,
    },
    { key: "no_of_seats", dataIndex: "no_of_seats", title: "No of seats" },
    { key: "remarks", dataIndex: "remarks", title: "Remarks" },
    {
      key: "info",
      title: "Info",
      render: (record) => <CarModal name={"Info"} carData={record} />,
    },
    {
      key: "edit",
      title: "Edit",
      render: (record) => <CarModal name={"Edit"} carData={record} />,
    },
    {
      key: "delete",
      title: "Delete",
      render: (record) => (
        <DeleteModal name="Car" id={record.id} onDelete={onDelete} />
      ),
    },
  ];

  useEffect(() => {
    getCars()
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDelete = (id) => {
    deleteCar(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div style={{ width: "105px", margin: "20px auto" }}>
        <CarModal name={"Add"} />
      </div>
      <div className="tableDiv">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default Clients;
