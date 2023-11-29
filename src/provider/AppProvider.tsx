import { ReactNode, createContext, useState } from "react";
import { ProfileInfo, TaskListInfo } from "../types";

interface Context {
    user?: ProfileInfo
    setUser?: React.Dispatch<React.SetStateAction<ProfileInfo | undefined>>
    task?: TaskListInfo
    setTask?: React.Dispatch<React.SetStateAction<TaskListInfo | undefined>>
}

const authContextValue: Context = {
    user: undefined,
    setUser: undefined
}

const editTaskContextValue: Context = {
    task: undefined,
    setTask: undefined
}

interface Props {
    children: ReactNode
}
export const AuthContext = createContext(authContextValue);
export const TaskEditContext = createContext(editTaskContextValue);

const AppProvider = ({children}: Props) => {
    const [user, setUser] = useState<ProfileInfo>();
    const [task, setTask] = useState<TaskListInfo>();

    return (
        <AuthContext.Provider value={{user: user, setUser: setUser }}>
            <TaskEditContext.Provider value={{task: task, setTask: setTask }}>
                {children}
            </TaskEditContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppProvider