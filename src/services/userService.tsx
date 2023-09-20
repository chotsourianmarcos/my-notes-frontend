import ApiMyNotesSercice from "./apiMyNotesService";
import { LoginRequestData, RegisterRequestData } from "../models/requests/userRequests";
import LoginResponseData from "../models/responses/loginResponseData";
import functions from "../resources/functions";

class UserService extends ApiMyNotesSercice {

    async register(requestData: RegisterRequestData): Promise<void> {
        functions.awaitCursor();
        await this.apiMyNotes.post("/User/Register", JSON.stringify(requestData)).then(
            (response: any) => {
                functions.defaultCursor();
                return response.data;
            },
            (error: any) => {
                functions.defaultCursor();
                throw error;
            }
        );
    };

    async login(requestData: LoginRequestData): Promise<LoginResponseData> {
        functions.awaitCursor();
        return await this.apiMyNotes.post("/User/Login", JSON.stringify(requestData)).then(
            (response: any) => {
                functions.defaultCursor();
                return response.data;
            },
            (error: any) => {
                functions.defaultCursor();
                throw error;
            });
    };

}

export default UserService;