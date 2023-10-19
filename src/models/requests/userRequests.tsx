class RefreshTokenRequestData {
    accessToken: string = ""; 
    userIdWeb: string = "";
}

class LoginRequestData {
    userName: string = "";
    userEmail: string = "";
    userPassword: string = "";
}

class RegisterRequestData {
    userName: string = "";
    userEmail: string = "";
    userPassword: string = "";
}

export { RefreshTokenRequestData, LoginRequestData, RegisterRequestData };