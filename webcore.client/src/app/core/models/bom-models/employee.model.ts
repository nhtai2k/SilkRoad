import { BaseModel } from "./base.model";

export interface EmployeeModel extends BaseModel {
    id: number;
    departmentId: number;
    rankId: number;
    code: string;
    name: string;
    note?: string;
}
