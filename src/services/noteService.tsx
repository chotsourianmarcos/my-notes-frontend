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
        return await this.apiMyNotes.get("/Note/GetNotesByCriteria" + queryString).then(
            (response: any) => {
                functions.defaultCursor();
                return response.data;
            },
            (error: any) => {
                functions.defaultCursor();
                throw error;
            }
        );
    };

    async addNote(requestData: AddUpdateNoteRequest): Promise<void> {
        functions.awaitCursor();
        return await this.apiMyNotes.post("/Note/AddNote", JSON.stringify(requestData)).then(
            (response: any) => {
                functions.defaultCursor();
                return response.data;
            },
            (error: any) => {
                functions.defaultCursor();
                throw error;
            }
        );
    };

    async updateNote(requestData: AddUpdateNoteRequest): Promise<void> {
        functions.awaitCursor();
        return await this.apiMyNotes.patch("/Note/UpdateNote", JSON.stringify(requestData)).then(
            (response: any) => {
                functions.defaultCursor();
                return response.data;
            },
            (error: any) => {
                functions.defaultCursor();
                throw error;
            }
        );
    };

    async deleteNote(idWeb: string): Promise<void> {
        functions.awaitCursor();
        return await this.apiMyNotes.delete("/Note/DeleteNote" + "?idWeb=" + idWeb).then(
            (response: any) => {
                functions.defaultCursor();
                return response.data;
            },
            (error: any) => {
                functions.defaultCursor();
                throw error;
            }
        );
    };

}

export default NoteService;