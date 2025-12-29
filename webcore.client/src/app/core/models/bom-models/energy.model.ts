import { BaseModel } from "./base.model";

export interface EnergyModel extends BaseModel {
    id: number;
    unitId: number;
    code: string;
    name: string;
    price?: number;
    note?: string;
    imagePath?: string;
}
