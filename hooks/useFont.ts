import { FontContext } from "@/contexts/FontContext";
import { useContext } from "react";

export function useFont (){
    const context = useContext(FontContext);
    if(!context)
        throw new Error("useFont must be used withina FontProvider");
    return context;
}