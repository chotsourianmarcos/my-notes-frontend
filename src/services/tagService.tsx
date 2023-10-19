import ApiMyNotesSercice from "./apiMyNotesService";
import { UserContextType } from "../contexts/UserContext";

class TagService extends ApiMyNotesSercice {
    constructor(userContext:UserContextType){         
        super(userContext);
    }

    async getAllTags(): Promise<string[]> {
        let result = await this.apiMyNotes.get("/Tag/GetAllTags");
        return result.data;
    };
}

export default TagService;