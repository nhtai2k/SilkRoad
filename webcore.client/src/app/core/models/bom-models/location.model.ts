import { AreaModel } from "./area.model";
import { BaseModel } from "./base.model";
import { MallModel } from "./mall.model";

export interface LocationModel extends BaseModel {
    id: number;
    mallId: number;
    code: string;
    name: string;
    note?: string;
    mall?: MallModel;
    areas?: AreaModel[];
    imagePath?: string;
}
