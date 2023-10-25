import './Notes.css';
import { useContext, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { UserContext } from '../../contexts/UserContext';
import Filter from '../Filter/Filter';
import Note from '../Note/Note';
import AddUpdateNoteModal from '../AddUpdateNoteModal/AddUpdateNoteModal';
import NoteFilter from '../../models/filters/noteFilter';
import NoteItem from '../../models/entities/noteItem';
import NoteHandler from '../../handlers/noteHandler';
import { AlertContext } from '../../contexts/AlertContext';

function Notes() {
  const { strings } = useContext(LanguageContext);
  const { setAlertContext } = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const noteHandler = new NoteHandler(userContext);

  const defaultModalState = {
    isOpen: false,
    noteItem: new NoteItem()
  };
  const newNoteModalState = {
    isOpen: true,
    noteItem: new NoteItem()
  };

  function updateModalState(noteItem: NoteItem) {
    return {
      isOpen: true,
      noteItem: noteItem
    }
  }

  const [notes, setNotes] = useState([] as NoteItem[]);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [filter, setFilter] = useState(new NoteFilter());
  const [updateFilters, setUpdateFilters] = useState(true);
  const [modalState, setModalState] = useState(defaultModalState);

  if (!notesLoaded && !updateFilters) {
    noteHandler.getNotesByCriteria(filter).then(
      (value: NoteItem[]) => {
        setNotesLoaded(true);
        setNotes(value);
      },
      (error: any) => {
        setNotesLoaded(false);
        setNotes([]);
        setAlertContext(true, error.response.data.message.result);
      }
    );
  };

  const toggleArchive = (noteItem: NoteItem) => {
    noteItem.isArchived = !noteItem.isArchived;
    noteHandler.addUpdateNote(noteItem).then(
      () => setNotesLoaded(false),
      (error: any) => {
        setAlertContext(true, error.response.data.message.result);
      }
    );
  };
  const deleteNote = (idWeb: string) => {
    noteHandler.deleteNote(idWeb).then(
      () => {
        setAlertContext(true, strings.alerts.deleteSuccess, false, (accept: boolean) => { setNotesLoaded(false) });
        setUpdateFilters(true);
      },
      (error: any) => {
        setAlertContext(true, error.response.data.message.result);
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
    if (accepted && noteItem !== undefined) {
      noteHandler.addUpdateNote(noteItem).then(
        () => {
          setModalState(defaultModalState);
          setNotesLoaded(false);
          setUpdateFilters(true);
        },
        (error: any) => {
          setAlertContext(true, error.response.data.message.result);
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
    filter.userIdWeb = userContext.user.userIdWeb;
    setFilter(filter);
    setNotesLoaded(false);
    setUpdateFilters(false);
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
  const newNoteHTML = alertNote(strings.headers.newNote, strings.messages.addNoteMessage, createNewNote);
  const emptyResultHTML = (
    <>
      {newNoteHTML}
      {alertNote(strings.headers.emptyResult, strings.messages.noNotesFound, null)}
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
        <Filter defaultFilters={[]} refreshFilters={refreshFilters} updateFilters={updateFilters} />
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