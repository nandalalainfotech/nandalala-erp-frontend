import { BaseEntity } from "./BaseEntity";

export class Prodplan001mb extends BaseEntity  {
    prplanId?: number;
    getItems?: string;
    itemCode?: string;
    bomNo?: string;
    plannedQty?: string;
    pendingQty?: string;
    description?: string;

}