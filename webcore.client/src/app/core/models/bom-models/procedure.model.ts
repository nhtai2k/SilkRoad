import { BaseModel } from "./base.model";

export interface ProcedureModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
}
