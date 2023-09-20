import './Note.css';
import NoteItem from '../../models/entities/noteItem';
import { useContext } from 'react';
import { AlertContext } from '../../contexts/AlertContext';

type NoteProps = {
    key: number;
    noteItem: NoteItem;
    openModal: (noteItem: NoteItem) => void;
    toggleArchive: (noteItem: NoteItem) => void;
    deleteNote: (idWeb: string) => void;
}

function Note(props: NoteProps) {

    const { setAlertContext } = useContext(AlertContext);

    let tagListString = "";
    if (props.noteItem.tags.length > 0) {
        props.noteItem.tags.forEach(t => {
            tagListString += t.name + ' ';
        });
        tagListString = tagListString.slice(0, -1);
    } else {
        tagListString = "general";
    }

    function updateNote() {
        props.openModal(props.noteItem);
    }
    function toggleArchive() {
        props.toggleArchive(props.noteItem);
    }
    function confirmDeleteNote() {
        setAlertContext(
            {
                isOpen: true,
                modalText: "Please confirm that you really want to permanently delete this note.",
                isConfirm: true,
                onClose(accept: boolean) {
                    if (accept) {
                        deleteNote();
                    }
                }
            });
    }
    function deleteNote() {
        props.deleteNote(props.noteItem.idWeb);
    }

    return (
        <>
            <div className="note__contnr">
                <div className="card border-light flex-grow-1">
                    <div className="card-header">{tagListString}</div>
                    <div className="card-body">
                        <p className="card-text">{props.noteItem.content}</p>
                        <br />
                    </div>
                </div>
                <div className="card bg-light mb-3">
                    <div className="card-body">
                        <p className="card-text dflt-row">
                            <span onClick={updateNote}>Update</span>
                            {!props.noteItem.isArchived ?
                                <span onClick={toggleArchive}>Archive</span> :
                                <span onClick={toggleArchive}>Unarchive</span>}
                            <span onClick={confirmDeleteNote}>Delete</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Note;