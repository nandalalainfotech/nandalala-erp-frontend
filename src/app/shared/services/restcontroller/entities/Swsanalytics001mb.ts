import { BaseEntity } from "./BaseEntity";

export class Swsanalytics001mb extends BaseEntity  {
    swsId?: number;
    itemCode?: string;
    description?: string | null;
    swsUom?: string;
    consQty?: number;
    consAmt?: string | null;
    delQty?: number;
    delAmt?: string | null;
    totalQty?: number;
    totalAmt?: string | null;
}