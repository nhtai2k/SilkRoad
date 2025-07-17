import { BaseModel } from "@models/base.model";

export interface CompanyModel extends BaseModel {
    id: number;
    industryId: number;
    name: string;
    symbol: string;
    ipoDate: Date;
}