export interface User {
    id: number;
    name?: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export type UserParamsId = {
    id: string;
};
