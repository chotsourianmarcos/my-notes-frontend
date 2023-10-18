import ApiMyNotesService from "./apiMyNotesService";
import UserItem from "../models/entities/userItem";
import NoteItem from "../models/entities/noteItem";
import { AddUpdateNoteRequest, GetNotesByCriteriaRequest } from "../models/requests/noteRequests";

class NoteService extends ApiMyNotesService {
    constructor(user:UserItem){         
        super(user);
      }

    async getNotesByCriteria(params: GetNotesByCriteriaRequest): Promise<NoteItem[]> {
        let queryString = "?userIdWeb=" + params.userIdWeb + "&tagsIncluded=" + params.tagsIncluded + "&isArchived=" + params.isArchived;
        let result = await this.apiMyNotes.get("/Note/GetNotesByCriteria" + queryString);
        return result.data;
    };

    async addNote(requestData: AddUpdateNoteRequest): Promise<void> {
        let result = await this.apiMyNotes.post("/Note/AddNote", JSON.stringify(requestData));
        return result.data;
    };

    async updateNote(requestData: AddUpdateNoteRequest): Promise<void> {
        let result = await this.apiMyNotes.patch("/Note/UpdateNote", JSON.stringify(requestData));
        return result.data;
    };

    async deleteNote(idWeb: string): Promise<void> {
        let result = await this.apiMyNotes.delete("/Note/DeleteNote" + "?idWeb=" + idWeb);
        return result.data;
    };
}

export default NoteService;