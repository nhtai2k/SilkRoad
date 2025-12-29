import { BaseModel } from "./base.model";

export interface MaterialGroupModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
    imagePath?: string;
}
