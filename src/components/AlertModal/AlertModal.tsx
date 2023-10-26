import './AlertModal.css';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AlertContext } from '../../contexts/AlertContext';
import { AlertModalProps } from '../../models/types/alertModalProps';

function AlertModal(props: AlertModalProps) {
    const { strings } = useContext(LanguageContext);
    const { setAlertContext } = useContext(AlertContext);

    if (!props.isOpen) return null;

    function resetModal() {
        setAlertContext(false);
    }
    function closeModal() {
        props.onClose(false);
        resetModal();
    }
    function confirm() {
        props.onClose(true);
        resetModal();
    }

    const confirmBtn = (
        <>
            <button className='dflt-btn' onClick={confirm}>Confirm</button>
        </>
    )

    return (
        <div className="modal__overlay">
            <div className="alert__modal__body hor-ver-center-cnt">
                <p className='margin-all-5'>{props.modalText}</p>
                <br></br>
                <div className="dflt-row full-width">
                    {props.isConfirm ? confirmBtn : null}
                    <button className='dflt-btn' onClick={closeModal}>
                        {strings.labels.close}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;