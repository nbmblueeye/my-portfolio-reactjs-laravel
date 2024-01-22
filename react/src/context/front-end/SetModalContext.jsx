import React, { createContext, useContext, useRef, useState } from 'react';

const createModalContext = createContext({
    modal: false,
    setModal: () => {},
})

export const useModalContext = () => {
    return useContext(createModalContext);
}

const SetModalContext = ({ children }) => {
    const [modal, setModal]           = useState(null);

    const data = {
        modal,
        setModal,
    }

  return (
    <createModalContext.Provider value={data}>
        { children }
    </createModalContext.Provider>
  )
}

export default SetModalContext