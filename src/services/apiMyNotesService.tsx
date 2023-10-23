import axios, { AxiosInstance } from "axios";
import functions from "../resources/functions";
import { UserContextType } from "../contexts/UserContext";
import UserHandler from "../handlers/userHandler";

class ApiMyNotesService {

    apiMyNotes: AxiosInstance;
    createService(userContext: UserContextType, refreshToken: string = ""): AxiosInstance {
        let currentToken = refreshToken.length > 0 ? refreshToken : userContext.user.refreshToken;

        var service = axios.create({
            baseURL: 'https://dashboard.heroku.com/apps/my-notes-mc-backend',
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer " + currentToken
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
            async (error) => {
                try {
                    if (error.response.data.ReasonPhrase.includes('Expired token')) {
                        let userHandler = new UserHandler(userContext);
                        let newRefreshToken = await userHandler.generateNewRefreshToken();
                        let originalRequest = error.config;
                        originalRequest.headers.Authorization = 'Bearer ' + newRefreshToken;
                        originalRequest._retry = true;
                        this.apiMyNotes = this.createService(userContext, newRefreshToken);

                        return this.apiMyNotes(originalRequest).then(
                            (value) => {
                                userContext.setNewRefreshToken(newRefreshToken);
                                functions.defaultCursor();
                                return value;
                            },
                            (error) => {
                                userContext.setNewRefreshToken(newRefreshToken);
                                functions.defaultCursor();
                                throw error;
                            }
                        );
                    };
                } catch {
                    functions.defaultCursor();

                    throw error;
                }
            }
        );

        return service;
    };

    constructor(userContext: UserContextType) {
        this.apiMyNotes = this.createService(userContext);
    }
}

export default ApiMyNotesService;