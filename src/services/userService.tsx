import ApiMyNotesService from "./apiMyNotesService";
import { LoginRequestData, RefreshTokenRequestData, RegisterRequestData } from "../models/requests/userRequests";
import LoginResponseData from "../models/responses/loginResponseData";
import { UserContextType } from "../contexts/UserContext";

class UserService extends ApiMyNotesService {
    constructor(userContext:UserContextType){         
        super(userContext);
    }
    
    async register(requestData: RegisterRequestData): Promise<void> {
        await this.apiMyNotes.post("/User/Register", JSON.stringify(requestData));
        return;
    };

    async login(requestData: LoginRequestData): Promise<LoginResponseData> {
        let result = await this.apiMyNotes.post("/User/Login", JSON.stringify(requestData));
        return result.data;
    };

    async generateNewRefreshToken(requestData: RefreshTokenRequestData): Promise<string> {
        let result = await this.apiMyNotes.post("/User/GenerateRefreshJWT", JSON.stringify(requestData));
        return result.data;
    };
}

export default UserService;