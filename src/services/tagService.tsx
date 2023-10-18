import ApiMyNotesSercice from "./apiMyNotesService";
import UserItem from "../models/entities/userItem";

class TagService extends ApiMyNotesSercice {
    constructor(user:UserItem){         
        super(user);
      }

    async getAllTags(): Promise<string[]> {
        let result = await this.apiMyNotes.get("/Tag/GetAllTags");
        return result.data;
    };
}

export default TagService;