import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export function useUser (){
    const context = useContext(UserContext)
    if(!context)
        throw new Error("userUser must be used withina UserProvider");
    return context;
}