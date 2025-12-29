import { BaseModel } from "./base.model";

export interface MaterialCategoryModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
    imagePath?: string;
}
