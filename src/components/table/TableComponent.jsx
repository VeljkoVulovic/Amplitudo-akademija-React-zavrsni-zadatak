import React from "react";
import { Table } from "antd";

const TableComponent = ({ columns, data }) => {
  return (
    <div className="tableDiv">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log("Row clicked - " + rowIndex);
            },
          };
        }}
      />
    </div>
  );
};

export default TableComponent;
