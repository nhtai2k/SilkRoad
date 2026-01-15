import { BaseModel } from "@models/base.model";

export interface HandbookModel extends BaseModel {
    id: any;
    title: string;
    content: string;
}