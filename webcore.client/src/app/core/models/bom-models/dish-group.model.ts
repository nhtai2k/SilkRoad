import { BaseModel } from "./base.model";
import { DishModel } from "./dish.model";

export interface DishGroupModel extends BaseModel {
    id: number;
    parentId: number;
    code: string;
    name: string;
    note?: string;
    dishes?:DishModel[];
    parent?: DishGroupModel;
    children?: DishGroupModel[];
    imagePath?: string;
    expanded?: boolean;
}