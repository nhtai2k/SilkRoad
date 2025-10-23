export interface AccountModel {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    createdBy?: string;
    modifiedBy?: string;
}

export interface AccountErrorModel {
    //fullName: string[];
    userName: string[];
    email: string[];
    phoneNumber: string[];
    password: string[];
    roleId: string[];
}