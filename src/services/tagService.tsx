import ApiMyNotesSercice from "./apiMyNotesService";
import UserItem from "../models/entities/userItem";
import functions from "../resources/functions";

class TagService extends ApiMyNotesSercice {
    
    constructor(user:UserItem){         
        super(user);
      }

    async getAllTags(): Promise<string[]> {
        functions.awaitCursor();
        let result = await this.apiMyNotes.get("/Tag/GetAllTags");
        functions.defaultCursor();
        return result;
    };

}

export default TagService;