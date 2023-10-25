import { FC, createContext, useState } from "react";
import stringsEN from "../resources/constants/strings/EN";
import stringsES from "../resources/constants/strings/ES";

type LanguageContextType = {
    language:string;
    strings: any,
    setLanguage: (language: string) => void;
}

class DefaultLanguageContext implements LanguageContextType {
    language = "EN";
    strings: any = {};
    setLanguage(language: string):void { };
}

export const LanguageContext = createContext<LanguageContextType>(new DefaultLanguageContext());

interface Props {
    children: React.ReactNode;
}

const LanguageContextProvider: FC<Props> = ({ children }) => {
    const [language, setLanguage] = useState(new DefaultLanguageContext().language);

    let strings = {};

    if(language == "EN"){
        strings = stringsEN;
    }else if(language == "ES"){
        strings = stringsES;
    }else{
        throw new Error;
    }
    
    const value = {
        language: language,
        strings: strings,
        setLanguage: (language:string) => {
            setLanguage(language);
        }
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageContextProvider;