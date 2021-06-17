import React, { createContext, useState, useContext } from "react";
import ModalComponent from "../components/modal/ModalComponent";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const data = {
    open: (data) => {
      data.title && setTitle(data.title);
      data.content && setContent(data.content);
      setIsModalOpen(true);
    },
    close: () => {
      setIsModalOpen(false);
      setTitle(null);
      setContent(null);
    },
  };

  return (
    <ModalContext.Provider value={data}>
      <ModalComponent
        title={title}
        children={content}
        isModalOpen={isModalOpen}
        setIsModalOpen={(e) => setIsModalOpen(e)}
      />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const data = useContext(ModalContext);

  return data;
};

export default ModalProvider;
