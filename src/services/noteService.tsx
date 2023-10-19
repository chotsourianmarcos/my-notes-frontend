import ApiMyNotesService from "./apiMyNotesService";
import NoteItem from "../models/entities/noteItem";
import { AddUpdateNoteRequest, GetNotesByCriteriaRequest } from "../models/requests/noteRequests";
import { UserContextType } from "../contexts/UserContext";

class NoteService extends ApiMyNotesService {
    constructor(userContext:UserContextType){         
        super(userContext);
    }

    async getNotesByCriteria(params: GetNotesByCriteriaRequest): Promise<NoteItem[]> {
        let queryString = "?userIdWeb=" + params.userIdWeb + "&tagsIncluded=" + params.tagsIncluded + "&isArchived=" + params.isArchived;
        let result = await this.apiMyNotes.get("/Note/GetNotesByCriteria" + queryString);
        return result.data;
    };

    async addNote(requestData: AddUpdateNoteRequest): Promise<void> {
        await this.apiMyNotes.post("/Note/AddNote", JSON.stringify(requestData));
        return;
    };

    async updateNote(requestData: AddUpdateNoteRequest): Promise<void> {
        await this.apiMyNotes.patch("/Note/UpdateNote", JSON.stringify(requestData));
        return;
    };

    async deleteNote(idWeb: string): Promise<void> {
        await this.apiMyNotes.delete("/Note/DeleteNote" + "?idWeb=" + idWeb);
        return;
    };
}

export default NoteService;