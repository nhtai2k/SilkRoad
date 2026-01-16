import { BaseModel } from "@models/base.model";

export interface AssetTypeModel extends BaseModel  {
    id: number;
    priority: number;
    name: string;
}