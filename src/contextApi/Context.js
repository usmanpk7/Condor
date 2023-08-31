import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(true);
    console.log('modq')
  }

  return ( 
    <ModalContext.Provider value={{ showModal, setShowModal, handleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
