import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

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

ModalComponent.propTypes = {
  title: PropTypes.number,
  children: PropTypes.node,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.bool,
};
