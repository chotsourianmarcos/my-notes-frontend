
import TagService from "../services/tagService";
import UserItem from "../models/entities/userItem";
import { UserContextType } from "../contexts/UserContext";

class TagHandler {
    user: UserItem;
    tagService: TagService;

    constructor(userContext: UserContextType) {
        if (userContext.user) {
            this.user = userContext.user;
        } else {
            this.user = new UserItem();
        }
        this.tagService = new TagService(userContext);
    }

    async getAllTags(): Promise<string[]> {
        return await this.tagService.getAllTags();
    }
}

export default TagHandler;