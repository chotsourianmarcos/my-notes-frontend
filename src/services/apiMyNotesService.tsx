import axios from "axios";
import UserItem from "../models/entities/userItem";
import functions from "../resources/functions";

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
        service.interceptors.request.use(function (config) {
            functions.awaitCursor();
            return config;
          }, function (error) {
            functions.defaultCursor();
            return Promise.reject(error);
          });
        service.interceptors.response.use(
            (response) => {
                functions.defaultCursor();
                return response;
            },
            (error) => {
            functions.defaultCursor();
            if(error.response.data.ReasonPhrase.includes('Expired token')){
                console.log("asdasdasd");   
            };
        });
        this.apiMyNotes = service;
    }
}

export default ApiMyNotesService;