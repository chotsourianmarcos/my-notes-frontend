import axios from "axios";
import UserItem from "../models/entities/userItem";

class ApiMyNotesService {

    apiMyNotes: any = null;

    constructor(user: UserItem) {
        this.apiMyNotes = axios.create({
            baseURL: 'https://my-notes-mc-backend-fbe1ee92a1cf.herokuapp.com',
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer " + user.userName + ":" + user.accessToken
            }
        });
    }
}

export default ApiMyNotesService;