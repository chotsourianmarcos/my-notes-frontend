import NoteService from "../services/noteService";
import NoteFilter from "../models/filters/noteFilter";
import NoteItem from "../models/entities/noteItem";
import UserItem from "../models/entities/userItem";
import { AddUpdateNoteRequest, GetNotesByCriteriaRequest } from "../models/requests/noteRequests";

class NoteHandler {
    user: UserItem;
    noteService: NoteService;

    constructor(user?: UserItem) {
        if (user) {
            this.user = user;
        } else {
            this.user = new UserItem();
        }
        this.noteService = new NoteService(this.user);
    }

    async getNotesByCriteria(filter: NoteFilter): Promise<NoteItem[]> {
        let requestData = new GetNotesByCriteriaRequest();
        requestData.userIdWeb = filter.userIdWeb;
        if (filter.tagsIncluded.length == 0) {
            requestData.tagsIncluded = "all";
        } else {
            let tagsString = "";
            filter.tagsIncluded.forEach((t) => {
                if(t !== "archived"){
                    tagsString += t + ",";
                }
            });
            tagsString = tagsString.slice(0, -1);
            requestData.tagsIncluded = tagsString;
            if(!requestData.tagsIncluded){
                requestData.tagsIncluded = "all";
            }
        }
        requestData.isArchived = filter.isArchived;
        return await this.noteService.getNotesByCriteria(requestData);
    }

    async addUpdateNote(noteItem: NoteItem): Promise<void> {
        let requestData = new AddUpdateNoteRequest();
        requestData.noteIdWeb = noteItem.idWeb;
        requestData.userIdWeb = this.user.userIdWeb;
        requestData.content = noteItem.content;
        requestData.tagsNames = noteItem.tags.map((t) => t.name);
        requestData.isArchived = noteItem.isArchived;

        let isNew = (noteItem.idWeb === '' || noteItem.idWeb === null || noteItem.idWeb === undefined) ? true : false;

        if (isNew) {
            return await this.noteService.addNote(requestData);
        } else {
            return await this.noteService.updateNote(requestData);
        }
    }

    async deleteNote(idWeb: string): Promise<void> {
        return await this.noteService.deleteNote(idWeb);
    }
}

export default NoteHandler;