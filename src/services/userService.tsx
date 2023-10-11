import ApiMyNotesSercice from "./apiMyNotesService";
import { LoginRequestData, RegisterRequestData } from "../models/requests/userRequests";
import LoginResponseData from "../models/responses/loginResponseData";
import functions from "../resources/functions";

class UserService extends ApiMyNotesSercice {

    async register(requestData: RegisterRequestData): Promise<void> {
        functions.awaitCursor();
        let result = await this.apiMyNotes.post("/User/Register", JSON.stringify(requestData));
        functions.defaultCursor();
        return result;
    };

    async login(requestData: LoginRequestData): Promise<LoginResponseData> {
        functions.awaitCursor();
        let result = await this.apiMyNotes.post("/User/Login", JSON.stringify(requestData));
        functions.defaultCursor();
        return result;
    };

}

export default UserService;