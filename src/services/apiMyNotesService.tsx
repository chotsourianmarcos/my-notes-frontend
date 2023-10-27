import axios, { AxiosInstance } from "axios";
import { UserContextType } from "../contexts/UserContext";
import UserHandler from "../handlers/userHandler";
import functions from "../resources/functions";
import { values } from "../constants/values";

class ApiMyNotesService {

    apiMyNotes: AxiosInstance;
    createService(userContext: UserContextType, refreshToken: string = ""): AxiosInstance {
        let currentToken = refreshToken.length > 0 ? refreshToken : userContext.user.refreshToken;

        var service = axios.create({
            baseURL: 'https://my-notes-mc-backend-fbe1ee92a1cf.herokuapp.com',
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: values.bearerTokenIntro + currentToken
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
                    if (error.response.data.ReasonPhrase.includes(values.expiredTokenPhrase)) {
                        let userHandler = new UserHandler(userContext);
                        let newRefreshToken = await userHandler.generateNewRefreshToken();
                        let originalRequest = error.config;
                        originalRequest.headers.Authorization = values.bearerTokenIntro + newRefreshToken;
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
                    }else{
                        functions.defaultCursor();
                        throw error;
                    }
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