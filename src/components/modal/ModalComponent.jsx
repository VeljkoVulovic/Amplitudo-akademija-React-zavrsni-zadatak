import React from "react";
import { Modal } from "antd";

const ModalComponent = ({
  title = "",
  children = <></>,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      width="400px"
      title={title}
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
