import { BaseModel } from "@models/base.model";

export interface TableModel extends BaseModel{
  id: number;
  nameVN: string;
  nameEN: string;
  nameCN: string;
  capacity: number;
  isFree: boolean;
  priority: number;
  note?: string;
}
