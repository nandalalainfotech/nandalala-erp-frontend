import { BaseEntity } from "./BaseEntity";

export class Stkrepbalance001mb extends BaseEntity {
   
    stbalId?: number;
    balanceQty?: number | null;
    balanceValue?: number | null;
    brand?: string | null;
    company?: string | null;
    description?: string | null;
    inQty?: number | null;
    itemCode?: string | null;
    itemGroup?: string | null;
    openingQty?: number | null;
    openingValue?: number | null;
    outQty?: number | null;
    outValue?: number | null;
    stkUom?: string | null;
    valuationRate?: number | null;
    wareHouse?: string | null;
}