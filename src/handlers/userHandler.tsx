import UserService from "../services/userService";
import UserItem from "../models/entities/userItem";
import RegisterFormData from "../models/forms/registerFormData";
import LoginFormData from "../models/forms/loginFormData";
import {LoginRequestData, RefreshTokenRequestData, RegisterRequestData} from "../models/requests/userRequests";
import LoginResponseData from "../models/responses/loginResponseData";
import { UserContextType } from "../contexts/UserContext";

class UserHandler {
    user:UserItem;
    userService:UserService;

    constructor(userContext: UserContextType) {
        if(userContext.user){
            this.user = userContext.user;
        }else{
            this.user = new UserItem();
        }
        this.userService = new UserService(userContext);
    }

    async register(formData:RegisterFormData):Promise<void> {
        let requestData = new RegisterRequestData();
        requestData.userName = formData.userName;
        requestData.userEmail = formData.userEmail;
        requestData.userPassword = formData.userPassword;

        return await this.userService.register(requestData);
    }

    async login(formData:LoginFormData):Promise<LoginResponseData> {
        let requestData = new LoginRequestData();
        requestData.userName = formData.userName;
        requestData.userEmail = formData.userEmail;
        requestData.userPassword = formData.userPassword;

        return await this.userService.login(requestData);
    }

    async generateNewRefreshToken():Promise<string> {
        let requestData = new RefreshTokenRequestData();
        requestData.accessToken = this.user.accessToken;
        requestData.userIdWeb = this.user.userIdWeb;

        return await this.userService.generateNewRefreshToken(requestData);
    }
}

export default UserHandler;