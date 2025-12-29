import { BaseModel } from "./base.model";
import { UnitModel } from "./unit.model";

export interface UnitGroupModel extends BaseModel {
    id: number;
    priority: number;
    name: string;
    note?: string;
    children?: UnitModel[];
    expanded?: boolean;
}
