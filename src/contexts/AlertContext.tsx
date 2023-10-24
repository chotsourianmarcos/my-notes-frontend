import { FC, createContext, useState } from "react";
import { AlertModalProps } from "../models/types/alertModalProps";

type AlertContextType = {
    modalValues: AlertModalProps,
    setAlertContext: (isOpen: boolean,
        modalText?: string,
        isConfirm?: boolean,
        onClose?: ((accept: boolean) => void)) => void;
}

class DefaultAlertContext implements AlertContextType {
    modalValues = {
        isOpen: false,
        modalText: "",
        isConfirm: false,
        onClose(accept: boolean) { }
    };
    setAlertContext(isOpen: boolean,
        modalText?: string,
        isConfirm?: boolean,
        onClose?: ((accept: boolean) => void)) { };
}

export const AlertContext = createContext<AlertContextType>(new DefaultAlertContext());

interface Props {
    children: React.ReactNode;
}

const AlertContextProvider: FC<Props> = ({ children }) => {
    const [modalValues, setAlertContext] = useState(new DefaultAlertContext().modalValues);

    const value = {
        setAlertContext(isOpen: boolean,
            modalText?: string,
            isConfirm?: boolean,
            onClose?: ((accept: boolean) => void)) {
            let modalProps = new DefaultAlertContext();

            modalProps.modalValues.isOpen = isOpen ? true : false;
            modalProps.modalValues.modalText = modalText !== undefined ? modalText : "";
            modalProps.modalValues.isConfirm = isConfirm ? isConfirm : false;
            modalProps.modalValues.onClose = onClose !== undefined ? onClose : (accept: boolean) => { };

            setAlertContext(modalProps.modalValues);
        },
        modalValues
    };

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

export default AlertContextProvider;