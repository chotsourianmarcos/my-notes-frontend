import axios from "axios";
import UserItem from "../models/entities/userItem";

class ApiMyNotesService {

    apiMyNotes: any = null;

    constructor(user: UserItem) {
        this.apiMyNotes = axios.create({
            baseURL: 'https://my-notes-mc-7fee2f4c1588.herokuapp.com',
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