export interface OptionModel {
  id: any;
  name: string;
  parentId?: any;
  children?: OptionModel[];
}
