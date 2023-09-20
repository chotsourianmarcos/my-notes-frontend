import ApiMyNotesSercice from "./apiMyNotesService";
import UserItem from "../models/entities/userItem";
import functions from "../resources/functions";

class TagService extends ApiMyNotesSercice {
    
    constructor(user:UserItem){         
        super(user);
      }

    async getAllTags(): Promise<string[]> {
        functions.awaitCursor();
        return await this.apiMyNotes.get("/Tag/GetAllTags").then(
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

export default TagService;