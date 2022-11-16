
import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../models/user";


interface AppContextInterface {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const AppContext = createContext<AppContextInterface>({
    user: undefined,
    setUser: () => null,
});