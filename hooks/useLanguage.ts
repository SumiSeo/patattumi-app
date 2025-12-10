import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext } from "react";

export function useLanguage (){
    const context = useContext(LanguageContext);
    if(!context)
        throw new Error("userLanguage must be used withina LanguageProvider");
    return context;
}