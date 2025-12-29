import { BaseModel } from "./base.model";

export interface DishModel extends BaseModel {
    id: number;
    dishGroupId: number;
    code: string;
    name: string;
    note?: string;
    imagePath?: string;
}