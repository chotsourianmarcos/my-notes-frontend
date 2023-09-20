import NoteItem from "../entities/noteItem";

class AddUpdateNoteFormData {

  constructor(noteItem: NoteItem) {
    this.tagsNames = noteItem.tags.map(t => t.name);
    this.content = noteItem.content;
  }

  newTag: string = "";
  tagsNames: string[];
  content: string;

}

export default AddUpdateNoteFormData;