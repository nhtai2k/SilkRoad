import { BaseModel } from "./base.model";

export interface UnitModel extends BaseModel {
    id: number;
    unitGroupId: number;
    index?: number;
    coefficient?: number;
    name: string;
    symbol: string;
    note?: string;
}
