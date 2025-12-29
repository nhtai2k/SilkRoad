import { BaseModel } from "./base.model";

export interface KitchenModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
    imagePath?: string;
}
