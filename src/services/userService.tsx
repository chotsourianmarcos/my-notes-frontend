import ApiMyNotesSercice from "./apiMyNotesService";
import { LoginRequestData, RegisterRequestData } from "../models/requests/userRequests";
import LoginResponseData from "../models/responses/loginResponseData";

class UserService extends ApiMyNotesSercice {
    async register(requestData: RegisterRequestData): Promise<void> {
        let result = await this.apiMyNotes.post("/User/Register", JSON.stringify(requestData));
        return result.data;
    };

    async login(requestData: LoginRequestData): Promise<LoginResponseData> {
        let result = await this.apiMyNotes.post("/User/Login", JSON.stringify(requestData));
        return result.data;
    };
}

export default UserService;