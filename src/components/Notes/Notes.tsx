import './Notes.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Filter from '../Filter/Filter';
import Note from '../Note/Note';
import AddUpdateNoteModal from '../AddUpdateNoteModal/AddUpdateNoteModal';
import NoteHandler from '../../handlers/noteHandler';
import NoteItem from '../../models/entities/noteItem';
import NoteFilter from '../../models/filters/noteFilter';
import { AlertContext } from '../../contexts/AlertContext';

function Notes() {

  const { setAlertContext } = useContext(AlertContext);
  const { user } = useContext(UserContext);
  const noteHandler = new NoteHandler(user);

  const defaultModalState = {
    isOpen: false,
    noteItem: new NoteItem()
  };
  const newNoteModalState = {
    isOpen: true,
    noteItem: new NoteItem()
  };
  const defaultFilter = new NoteFilter();
  defaultFilter.userIdWeb = user.userIdWeb;

  function updateModalState(noteItem: NoteItem) {
    return {
      isOpen: true,
      noteItem: noteItem
    }
  }

  const [notesLoaded, setNotesLoaded] = useState(false);
  const [notes, setNotes] = useState([] as NoteItem[]);
  const [filter, setFilter] = useState(defaultFilter);
  const [updateFilters, setUpdateFilters] = useState(true);
  const [modalState, setModalState] = useState(defaultModalState);

  if (!notesLoaded && filter.userIdWeb) {
    noteHandler.getNotesByCriteria(filter).then(
      (value: NoteItem[]) => {
        setNotesLoaded(true);
        setNotes(value);
        setUpdateFilters(false);
      },
      (error: any) => {
        setNotesLoaded(false);
        setNotes([]);
        setAlertContext(
          {
            isOpen: true,
            modalText: error.response.data.message.result,
            isConfirm: false,
            onClose(accept: boolean) { }
          });
      }
    );
  };

  const toggleArchive = (noteItem: NoteItem) => {
    noteItem.isArchived = !noteItem.isArchived;
    noteHandler.addUpdateNote(noteItem).then(
      () => setNotesLoaded(false),
      (error: any) => {
        setAlertContext(
          {
            isOpen: true,
            modalText: error.response.data.message.result,
            isConfirm: false,
            onClose(accept: boolean) { }
          });
      }
    );
  };
  const deleteNote = (idWeb:string) => {
    noteHandler.deleteNote(idWeb).then(
      () => {
        setAlertContext(
          {
            isOpen: true,
            modalText: "Successful delete.",
            isConfirm: false,
            onClose(accept: boolean) {
              setNotesLoaded(false);
              setUpdateFilters(true);
            }
          }
        );
      },
      (error: any) => {
        setAlertContext(
          {
            isOpen: true,
            modalText: error.response.data.message.result,
            isConfirm: false,
            onClose(accept: boolean) { }
          });
      });
  }
  const openModal = (noteItem: NoteItem) => {
    if (noteItem.idWeb == "") {
      setModalState(newNoteModalState);
    } else {
      setModalState(updateModalState(noteItem));
    }
    return undefined;
  };
  const closeModal = (accepted: boolean, noteItem?: NoteItem) => {
    if (accepted && typeof noteItem !== "undefined") {
      noteHandler.addUpdateNote(noteItem).then(
        () => {
          setModalState(defaultModalState);
          setNotesLoaded(false);
          setUpdateFilters(true);
        },
        (error: any) => {
          setAlertContext(
            {
              isOpen: true,
              modalText: error.response.data.message.result,
              isConfirm: false,
              onClose(accept: boolean) { }
            });
        }
      );
    } else {
      setModalState(defaultModalState);
    }
  };
  const createNewNote = () => {
    openModal(new NoteItem);
  }
  const refreshFilters = (filters: string[]) => {
    let filter = new NoteFilter();
    if (filters.includes("archived")) {
      filter.isArchived = true;
    }
    filter.tagsIncluded = filters;
    filter.userIdWeb = user.userIdWeb;
    setFilter(filter);
    setNotesLoaded(false);
  }

  const alertNote = (header: string, content: string, onClick: any) => (
    <div className='alert-note__contnr mb-3'>
      <div className="card border-light flex-grow-1">
        <div className="card-header">{header}</div>
        <div onClick={createNewNote} className="card-body">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
  const newNoteHTML = alertNote("New note", "Click here to add a new note.", createNewNote);
  const emptyResultHTML = (
    <>
    {newNoteHTML}
    {alertNote("Empty result", "There are no notes to be shown yet.", null)}
    </>
  );
  let notesHTML = (
    <>
      {newNoteHTML}
      {notes.map((n: NoteItem) => (
        <div key={notes.indexOf(n)}>
          <Note key={notes.indexOf(n)} noteItem={n} openModal={openModal} toggleArchive={toggleArchive} deleteNote={deleteNote} />
        </div>
      ))}
    </>
  );

  return (
    <>
      <div>
        <Filter defaultFilters={[]} refreshSearch={refreshFilters} updateFilters={updateFilters} />
        <br></br>
        <div id="Notes-contnr">
          {(notesLoaded && notes.length == 0) ? emptyResultHTML : null}
          {(notesLoaded && notes.length > 0) ? notesHTML : null}
        </div>
      </div>
      <AddUpdateNoteModal modalState={modalState} onClose={closeModal} />
    </>
  );
};

export default Notes;