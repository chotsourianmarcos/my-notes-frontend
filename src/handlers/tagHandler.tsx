
import TagService from "../services/tagService";
import UserItem from "../models/entities/userItem";

class TagHandler {
    user: UserItem;
    tagService: TagService;

    constructor(user?: UserItem) {
        if (user) {
            this.user = user;
        } else {
            this.user = new UserItem();
        }
        this.tagService = new TagService(this.user);
    }

    async getAllTags(): Promise<string[]> {
        return await this.tagService.getAllTags();
    }
}

export default TagHandler;