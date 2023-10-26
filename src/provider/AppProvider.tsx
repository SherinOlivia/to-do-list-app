import { ReactNode, createContext, useState } from "react";
import { ProfileInfo } from "../types";

interface Context {
    user?: ProfileInfo
    setUser?: React.Dispatch<React.SetStateAction<ProfileInfo | undefined>>
}

const authContextValue: Context = {
    user: undefined,
    setUser: undefined
}

interface Props {
    children: ReactNode
}

export const AuthContext = createContext(authContextValue);


const AppProvider = ({children}: Props) => {
    const [user, setUser] = useState<ProfileInfo>();

    return (
        <AuthContext.Provider value={{user: user, setUser: setUser }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AppProvider