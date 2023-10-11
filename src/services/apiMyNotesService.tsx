import axios from "axios";
import UserItem from "../models/entities/userItem";

class ApiMyNotesService {

    apiMyNotes: any = null;

    constructor(user: UserItem) {
        this.apiMyNotes = axios.create({
            baseURL: 'https://localhost:7032',
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