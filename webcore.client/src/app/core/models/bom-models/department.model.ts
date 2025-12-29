import { BaseModel } from "./base.model";

export interface DepartmentModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
}
