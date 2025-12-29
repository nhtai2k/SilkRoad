import { BaseModel } from "./base.model";
import { LocationModel } from "./location.model";

export interface MallModel extends BaseModel {
    id: number;
    code: string;
    name: string;
    note?: string;
    locations?: LocationModel[];
    imagePath?: string;
}
