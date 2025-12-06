export interface UserLoginInfoModel {
    userId: number;
    username: string;
    email: string;
    roles: string[];
    avatarUrl?: string;
}