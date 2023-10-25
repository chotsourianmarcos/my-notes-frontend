import './AddUpdateNoteModal.css';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AlertContext } from '../../contexts/AlertContext';
import NoteItem from '../../models/entities/noteItem';
import TagItem from '../../models/entities/tagItem';
import AddUpdateNoteFormData from '../../models/forms/addUpdateNoteFormData';
import regex from '../../resources/regexs';

type AddUpdateNoteModalProps = {
  modalState: {
    isOpen: boolean,
    noteItem: NoteItem
  };
  onClose: (accept: boolean, noteItem?: NoteItem) => void;
}

function AddUpdateNoteModal(props: AddUpdateNoteModalProps) {
  const { strings } = useContext(LanguageContext);
  const { setAlertContext } = useContext(AlertContext);

  const [noteItem, setNoteItem] = useState(new NoteItem());
  const [formData, setFormData] = useState(new AddUpdateNoteFormData(noteItem));
  const [validationErrorMsg, setvalidationErrorMsg] = useState("" as string);

  useEffect(() => {
    if (validationErrorMsg && props.modalState.isOpen) {
      setAlertContext(true, validationErrorMsg, false, (accept: boolean) => { setvalidationErrorMsg("");} );
    }
  }, [validationErrorMsg]);

  useEffect(() => {
    if (props.modalState.noteItem.idWeb !== "") {
      setNoteItem(props.modalState.noteItem);
      setFormData(new AddUpdateNoteFormData(props.modalState.noteItem));
    } else {
      setFormData(new AddUpdateNoteFormData(new NoteItem()));
      setFormData((values: any) => ({ ...values, tagsNames: [] }));
      setNoteItem(props.modalState.noteItem);
    }
  }, [props.modalState.noteItem]);

  if (!props.modalState.isOpen) return null;

  const validateTag = (tag: string) => {
    if (tag.length > 20) {
      setvalidationErrorMsg(strings.errors.tagsTooLong);
      return false;
    }
    const alphabetical = regex.alphabetical;
    if (!alphabetical.test(tag)) {
      setvalidationErrorMsg(strings.errors.tagsOnlyAlphabetical);
      return false;
    }
    return true;
  }
  const validateNotRepeatedTag = (tag: string) => {
    if (formData.tagsNames.includes(tag)) {
      setvalidationErrorMsg(strings.errors.tagAlreadyIncluded);
      return false;
    }
    return true;
  }
  const validateForm = () => {
    if (!formData.content) {
      setvalidationErrorMsg(strings.errors.emptyContent);
      return false;
    }
    if (formData.content.length > 2000) {
      setvalidationErrorMsg(strings.errors.contentTooLong);
      return false;
    }
    if (formData.newTag.length > 0) {
      setvalidationErrorMsg(strings.errors.newTagPending);
      return false;
    }
    formData.tagsNames.forEach(t => {
      validateTag(t);
    });
    return true;
  }

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values: any) => ({ ...values, [name]: value }));
  }

  const addTag = () => {
    if (!validateTag(formData.newTag) || !validateNotRepeatedTag(formData.newTag)) {
      return;
    }
    formData.tagsNames.push(formData.newTag);
    let newTag = new TagItem();
    newTag.name = formData.newTag;
    noteItem.tags.push(newTag);
    setFormData((values: any) => ({ ...values, tagsNames: formData.tagsNames }));
    setNoteItem((values: any) => ({ ...values, tags: noteItem.tags }));
    setFormData((values: any) => ({ ...values, newTag: "" }));
    return undefined;
  }
  const removeTag = (event: any) => {
    let tagName = event.target.id;
    formData.tagsNames = formData.tagsNames.filter(n => n !== tagName);
    noteItem.tags = noteItem.tags.filter(t => t.name !== tagName);
    setFormData((values: any) => ({ ...values, tagsNames: formData.tagsNames }));
    setNoteItem((values: any) => ({ ...values, tags: noteItem.tags }));
    return undefined;
  }

  function closeModal() {
    props.onClose(false);
    setFormData(new AddUpdateNoteFormData(new NoteItem));
    return undefined;
  }
  function handleSubmit(event: any) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    noteItem.content = formData.content;
    noteItem.tags = formData.tagsNames.map(n => {
      let tag = new TagItem();
      tag.name = n;
      return tag;
    });
    props.onClose(true, noteItem);
    setFormData(new AddUpdateNoteFormData(new NoteItem));
  }

  let tagsHTML = (
    <>
      <div>
        {noteItem.tags.map((t: TagItem) => (
          <p key={noteItem.tags.indexOf(t)}>
            <span>{t.name}</span>
            <span className='delete__char' id={t.name} onClick={removeTag}>&nbsp; X</span>
          </p>
        ))}
      </div>
    </>
  )

  return (
    <div className="modal__overlay">
      <div className="modal__body">
        <form onSubmit={handleSubmit} id='AddUpdate__form'>
          <div className='inpt-contnr hor-ver-center-cnt'>
            <div className='dflt-column hor-ver-center-cnt'>
              <label className='full-width row-start underlined'>
                New Tag:
              </label>
              <input
                className='full-width'
                type="text"
                name="newTag"
                value={formData.newTag}
                onChange={handleChange}
              />
              <label className='full-width row-start' onClick={addTag}>Confirm<span className="confirm__char">&nbsp; &#10003;</span></label>
              <br></br>
              <label className='full-width row-start underlined'>
                Tags:
              </label>
              <div className='full-width row-start'>
                {tagsHTML}
              </div>
              <br></br>
              <label className='full-width row-start underlined'>
                Content:
              </label>
              <textarea
                className='expandable-textarea full-width'
                name="content"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
              <br></br>
            </div>
          </div>
          <div>
            <div className='dflt-row'>
              <div className='width-15'></div>
              <button className='dflt-btn' type="submit">Confirm</button>
              <button className='dflt-btn' onClick={closeModal}>Close</button>
              <div className='width-15'></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateNoteModal;