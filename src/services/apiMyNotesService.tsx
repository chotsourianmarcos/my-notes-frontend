import axios from "axios";
import UserItem from "../models/entities/userItem";

class ApiMyNotesService {

    apiMyNotes: any = null;

    constructor(user: UserItem) {
        var service = axios.create({
            baseURL: 'https://localhost:7032',
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer " + user.refreshToken
            }
        });
        service.interceptors.response.use((response) => response, (error) => {
            // whatever you want to do with the error
            if(error.response.data.ReasonPhrase.includes('Expired token')){
                console.log("asdasdasd");   
            };
        });
        this.apiMyNotes = service;
    }
}

export default ApiMyNotesService;