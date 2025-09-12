import { BaseModel } from '@models/base.model';
import { CategoryModel } from './category.model';

export interface DishModel extends BaseModel {
  id: number;
  categoryId: number;
  typeId: number; // 1: Single Dish, 2: Combo Dish
  unitId: number;
  nameEN: string;
  nameVN: string;
  nameCN: string;
  descriptionEN?: string;
  descriptionVN?: string;
  descriptionCN?: string;
  priority: number; // Used for sorting
  imageUrl?: string;
  note?: string;
  price: number;
  category?: CategoryModel;
}
