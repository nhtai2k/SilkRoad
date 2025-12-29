import { BaseModel } from "./base.model";
import { MaterialUnitModel } from "./material-unit.model";

export interface MaterialModel extends BaseModel {
    id: number;
    materialGroupId: number;
    materialCategoryId: number;
    baseUnitId: number;
    conversionUnitId?: number;
    conversionQuantity?: number;
    code: string;
    name: string;
    price: number;
    note?: string;
    imagePath?: string;
    materialUnits?: MaterialUnitModel[];
}
