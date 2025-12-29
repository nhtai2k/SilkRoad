import { BaseModel } from "./base.model";

export interface PropertyModel extends BaseModel {
    id: number;
    propertyGroupId: number;
    unitId: number;
    departmentId: number;
    code: string;
    name: string;
    depreciation?: number;
    price?: number;
    note?: string;
    imagePath?: string; // Added for image preview support
}
