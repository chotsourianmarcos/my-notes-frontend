import { FC, createContext, useState } from "react";
import UserItem from "../models/entities/userItem";
import LoginResponseData from "../models/responses/loginResponseData";

export type UserContextType = {
    isLogActive: boolean;
    setLogActive: (active: boolean) => void;
    user: UserItem;
    setUserData: (logData: LoginResponseData) => void;
    setNewRefreshToken: (token: string) => void;
}

class DefaultUserContext implements UserContextType {
    isLogActive: boolean = false;
    setLogActive(active: boolean) { };
    user: UserItem = new UserItem();
    setUserData(logData: LoginResponseData) { };
    setNewRefreshToken(token: string) { };
}

export const UserContext = createContext<UserContextType>(new DefaultUserContext());

interface Props {
    children: React.ReactNode;
}

const UserContextProvider: FC<Props> = ({ children }) => {
    const [isLogActive, setLogActive] = useState(false);
    const [user, setUser] = useState(new UserItem());

    const value = {
        isLogActive: isLogActive,
        setLogActive: (isActive: boolean) => {
            setLogActive(isActive);
        },
        user: user,
        setUserData: (logData: LoginResponseData) => {
            let user = new UserItem();
            user.userName = logData.userName;
            user.userIdWeb = logData.userIdWeb;
            user.userRol = logData.userRol;
            user.accessToken = logData.accessToken;
            user.refreshToken = logData.refreshToken;
            setUser(user);
        },
        setNewRefreshToken: (token: string) => {
            let updatedUser = {...user};
            updatedUser.refreshToken = token;
            setUser(user);
        }
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;