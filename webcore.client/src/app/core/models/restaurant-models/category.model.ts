import { BaseModel } from "@models/base.model";

export interface CategoryModel extends BaseModel {
  id: number;
  parentId?: number;
  nameEN: string;
  nameVN: string;
  nameCN: string; // Optional, as not all categories may have a Chinese name
  note?: string;
  priority?: number;
  parent?: CategoryModel;
  children?: CategoryModel[];
  dishes?: any[]; // DishModel[] - avoiding circular reference for now
  expanded?: boolean; // For UI purposes, to track if the category is expanded in a tree view
}
