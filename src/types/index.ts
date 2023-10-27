export interface RegisterInfo {
    username: string;
    email: string;
    password: string;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export interface DashboardInfo {
    username: string;
    handleLogOut: () => Promise<void>
}
export interface ProfileInfo {
    username: string;
    email: string;
    name: string,
    city: string;
    about_me: string;
}

export type TaskListInfo = {
    id: number;
    title: string;
    description: string;
    purpose: string;
    due_date: Date;
    completed: boolean;
}

export type CreateTaskInfo = {
    title: string;
    description: string;
    purpose: string;
    due_date: Date | null;
}
export type TaskEditInfo = CreateTaskInfo

export interface TaskStatusUpdatetInfo {
    completed: boolean;
}

// export interface GetCategoryResponse {
//     categories: CategoryInfo[];
//     total: number;
//     skip: number;
//     limit: number;
// }