import { FC, createContext, useState } from "react";
import stringsEN from "../constants/strings/EN";
import stringsES from "../constants/strings/ES";
import { values } from "../constants/values";

type LanguageContextType = {
    language:string;
    strings: any,
    setLanguage: (language: string) => void;
}

class DefaultLanguageContext implements LanguageContextType {
    language = values.english;
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

    if(language == values.english){
        strings = stringsEN;
    }else if(language == values.spanish){
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