import { BaseModel } from "./base.model";

export interface RankModel extends BaseModel {
    id: number;
    timeUnitId: number;
    code: string;
    salary: number;
    name: string;
    note?: string;
}
