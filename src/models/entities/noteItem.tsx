import TagItem from "./tagItem";

class NoteItem {
    idWeb: string = "";
    userIdWeb: string = "";
    tags: TagItem[] = [];
    content: string = "";
    insertedDate: Date = new Date();
    isArchived:boolean = false;
}

export default NoteItem;