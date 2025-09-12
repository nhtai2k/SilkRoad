import { BaseModel } from "@models/base.model";

export interface UnitModel extends BaseModel{
    id: number;
    nameVN: string;
    nameEN: string;
    nameCN: string;
    note?: string;
    priority: number;
}