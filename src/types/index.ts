export interface RegisterInfo {
    username: string;
    email: string;
    password: string;
    name: string,
    city: string;
    about_me: string;
}

export interface LoginInfo {
    username: string;
    password: string;
}

export interface DashboardInfo {
    name: string;
    handleLogOut: () => Promise<void>
}
export interface ProfileInfo {
    username: string;
    email: string;
    name: string,
    city: string;
    about_me: string;
}

export enum TaskStatus {
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED"
}
export type TaskListInfo = {
    id: number;
    title: string;
    description: string;
    purpose: string;
    priority: string;
    due_date: Date;
    status: TaskStatus;
}

export type CreateTaskInfo = {
    title: string;
    description: string;
    purpose: string;
    priority: string;
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