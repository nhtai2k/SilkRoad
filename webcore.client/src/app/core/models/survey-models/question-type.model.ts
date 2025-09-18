import { BaseModel } from "@models/base.model";

export interface QuestionTypeModel extends BaseModel {
    id: number;
    name: string;
    note: string;
}