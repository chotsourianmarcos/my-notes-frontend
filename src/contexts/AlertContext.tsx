import { FC, createContext, useState } from "react";
import { AlertModalProps } from "../models/types/alertModalProps";

type AlertContextType = {
    modalValues: AlertModalProps,
    setAlertContext: (values: any) => void;
}

class DefaultAlertContext implements AlertContextType {
    modalValues = {
        isOpen: false,
        modalText: "",
        isConfirm: false,
        onClose(accept: boolean){ }
    };
    setAlertContext(values: any){ };
}

export const AlertContext = createContext<AlertContextType>(new DefaultAlertContext());

interface Props {
    children: React.ReactNode;
}

const AlertContextProvider: FC<Props> = ({ children }) => {

    const [modalValues, setAlertContext] = useState(new DefaultAlertContext().modalValues);

    const value = {
        setAlertContext: (value: AlertModalProps) => {
            setAlertContext(value);
        },
        modalValues
    };

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

export default AlertContextProvider;