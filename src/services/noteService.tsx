import ApiMyNotesSercice from "./apiMyNotesService";
import UserItem from "../models/entities/userItem";
import NoteItem from "../models/entities/noteItem";
import { AddUpdateNoteRequest, GetNotesByCriteriaRequest } from "../models/requests/noteRequests";
import functions from "../resources/functions";

class NoteService extends ApiMyNotesSercice {
    
    constructor(user:UserItem){         
        super(user);
      }

    async getNotesByCriteria(params: GetNotesByCriteriaRequest): Promise<NoteItem[]> {
        let queryString = "?userIdWeb=" + params.userIdWeb + "&tagsIncluded=" + params.tagsIncluded + "&isArchived=" + params.isArchived;
        
        functions.awaitCursor();
        let result = await this.apiMyNotes.get("/Note/GetNotesByCriteria" + queryString);
        functions.defaultCursor();
        return result.data;
    };

    async addNote(requestData: AddUpdateNoteRequest): Promise<void> {
        functions.awaitCursor();
        let result = await this.apiMyNotes.post("/Note/AddNote", JSON.stringify(requestData));
        functions.defaultCursor();
        return result.data;
    };

    async updateNote(requestData: AddUpdateNoteRequest): Promise<void> {
        functions.awaitCursor();
        let result = await this.apiMyNotes.patch("/Note/UpdateNote", JSON.stringify(requestData));
        functions.defaultCursor();
        return result.data;
    };

    async deleteNote(idWeb: string): Promise<void> {
        functions.awaitCursor();
        let result = await this.apiMyNotes.delete("/Note/DeleteNote" + "?idWeb=" + idWeb);
        functions.defaultCursor();
        return result.data;
    };

}

export default NoteService;