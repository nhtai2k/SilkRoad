import { BaseModel } from "./base.model";

export interface BOMConfigurationModel extends BaseModel {
    id: number;
    parentId?: number;
    code: string;
    name: string;
    priority: number;
    note?: string;
    tag?: string;
    parent?: BOMConfigurationModel;
    children?: BOMConfigurationModel[];
    expanded?: boolean;
}
