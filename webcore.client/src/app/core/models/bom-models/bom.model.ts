import { BaseModel } from "./base.model";

export interface BOMModel extends BaseModel {
  id: number;
  dishGroupId: number;
  dishId: number;
  code: string;
  name: string;
  note?: string;
  bomCategories?: BOMCategoryModel[];
}

export interface BOMCategoryModel {
  id: string;
  bomId: number;
  ParentId?: string;
  code: string;
  name: string;
  tag?: string;
  children?: BOMCategoryModel[];
  bomPropertyLinks?: BOMPropertyLinkModel[];
  bomMaterialLinks?: BOMMaterialLinkModel[];
}

export interface BOMPropertyLinkModel {
  id: string;
  propertyId: number;
  propertyCode?: string;
  propertyName?: string;
  propertyTypeName?: string;
  unitName?: string;
  quantity: number;
  price?: number;
  amount?: number;
}

export interface BOMMaterialLinkModel {
  id: string;
  materialId: number;
  materialCode?: string;
  materialName?: string;
  materialGroupName?: string;
  unitName?: string;
  quantity: number;
  price?: number;
  amount?: number;
}



// You will need to define BOMDTO, BOMCategoryLinkDTO, BOMPropertyLinkDTO, BOMMaterialLinkDTO, BOMProcedureLinkDTO, BOMEmployeeLinkDTO interfaces as well.