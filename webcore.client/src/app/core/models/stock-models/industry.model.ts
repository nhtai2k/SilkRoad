import { BaseModel } from "@models/base.model";

export interface IndustryModel extends BaseModel {
    id: number;
    priority: number;
    name: string;
}