import { BaseModel } from "./base.model";
import { LocationModel } from "./location.model";
export interface AreaModel extends BaseModel {
    id: number;
    locationId: number;
    code: string;
    name: string;
    note?: string;
    areaSize: number;
    location?: LocationModel;
    imagePath?: string;
}
