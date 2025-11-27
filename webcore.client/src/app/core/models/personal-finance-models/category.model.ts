import { BaseModel } from "@models/base.model";

export interface CategoryModel extends BaseModel {
    id: number;
    nameEN: string;
    nameVN: string;
    note?: string;
    expanded?: boolean;
    priority: number;
    subCategories?: SubCategoryModel[];
}

export interface SubCategoryModel extends BaseModel {
    id: number;
    categoryId: number;
    nameVN: string;
    nameEN: string;
    note?: string;
    priority: number;
}