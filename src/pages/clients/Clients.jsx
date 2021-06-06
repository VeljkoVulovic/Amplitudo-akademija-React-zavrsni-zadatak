import React from "react";
import TableComponent from "../../components/table/TableComponent";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Clients = () => {
  const history = useHistory();

  const columns = [
    { key: "id", dataIndex: "id", title: "Id" },
    { key: "name", dataIndex: "name", title: "Name" },
    { key: "phone", dataIndex: "phone", title: "Phone" },
    { key: "email", dataIndex: "email", title: "Email" },
    {
      key: "firstReservation",
      dataIndex: "firstReservation",
      title: "First reservation",
    },
    {
      key: "lastReservation",
      dataIndex: "lastReservation",
      title: "Last reservation",
    },
    { key: "note", dataIndex: "note", title: "Note" },
    {
      key: "edit",
      title: "Edit",
      render: () => (
        <Button
          icon={<EditFilled style={{ color: "blue" }} />}
          onClick={() =>
            history.push({
              pathname: `/editClient`,
            })
          }
        >
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      title: "Delete",
      render: () => (
        <Button
          icon={<DeleteFilled style={{ color: "red" }} />}
          onClick={() =>
            history.push({
              pathname: `/editClient`,
            })
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  const data = [
    // {
    //   id: "1",
    //   name: "Janko Jankovic",
    //   phone: "069000000",
    //   email: "janko@gmail.com",
    //   firstReservation: "01.01.2020",
    //   lastReservation: "05.05.2021",
    //   note: "Old User",
    // },
  ];
  for (let i = 1; i < 50; i++) {
    data.push({
      key: i,
      id: i,
      name: `Test ${i}`,
      phone: `06900000${i}`,
      email: `test${i}@gmail.com`,
      firstReservation: `${i}.01.20${i}`,
      lastReservation: `${i}.01.20${i}`,
      note: `Note ${i}`,
    });
  }

  return (
    <div>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Clients;
