import { createContext, Dispatch, SetStateAction } from "react";


interface AppContextInterface {
    username: string | null;
    setUsername: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<AppContextInterface>({
    username: '',
    setUsername: () => '',
});