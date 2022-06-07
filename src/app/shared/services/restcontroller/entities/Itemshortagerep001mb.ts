import { BaseEntity } from "./BaseEntity";

export class Itemshortagerep001mb extends BaseEntity {
    shrepId?: number;
    warehouseName?: string;
    itemCode?: string;
    actualQty?: string | null;
    orderedQty?: string | null;
    plannedQty?: string | null;
    reservedQty?: string | null;
    projectedQty?: string | null;
}