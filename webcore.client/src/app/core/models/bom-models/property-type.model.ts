import { BaseModel } from "./base.model";

export interface PropertyTypeModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
}
