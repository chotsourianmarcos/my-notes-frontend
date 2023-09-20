export type AlertModalProps = {
    isOpen: boolean;
    modalText: string;
    isConfirm: boolean;
    onClose: (accept: boolean) => void;
}