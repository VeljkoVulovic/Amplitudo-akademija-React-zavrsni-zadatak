import React from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined, DeleteFilled } from "@ant-design/icons";

const { confirm } = Modal;

const DeleteModal = ({ name, id, onDelete }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete " + name + " with id = " + id + "?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space>
      <Button
        onClick={showDeleteConfirm}
        type="dashed"
        icon={
          <DeleteFilled
            className="site-form-item-icon"
            style={{ color: "red" }}
          />
        }
      >
        Delete
      </Button>
    </Space>
  );
};

export default DeleteModal;
