import UserService from "../services/userService";
import UserItem from "../models/entities/userItem";
import RegisterFormData from "../models/forms/registerFormData";
import LoginFormData from "../models/forms/loginFormData";
import {LoginRequestData, RegisterRequestData} from "../models/requests/userRequests";
import LoginResponseData from "../models/responses/loginResponseData";

class UserHandler {

    user:UserItem;
    userService:UserService;

    constructor(user?:UserItem) {
        if(user){
            this.user = user;
        }else{
            this.user = new UserItem();
        }
        this.userService = new UserService(this.user);
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
}

export default UserHandler;