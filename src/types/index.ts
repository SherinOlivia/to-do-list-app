export interface RegisterInfo {
    username: string;
    email: string;
    password: string;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export interface ProfileInfo {
    username: string;
    email: string;
    name: string,
    city: string;
    about_me: string;
}

export interface TaskListInfo {
    title: string;
    description: string;
    purpose: string;
    due_date: Date;
    completed: boolean;
}

export type TaskCreateInfo = Omit<TaskListInfo, 'completed'>

export type TaskEditInfo = TaskCreateInfo

export interface TaskStatusUpdatetInfo {
    completed: boolean;
}

// export interface GetCategoryResponse {
//     categories: CategoryInfo[];
//     total: number;
//     skip: number;
//     limit: number;
// }