import { BaseEntity } from "./BaseEntity";

export class Stkrepledger001mb extends BaseEntity  {
    stledId?: number;
    balanceQty?: number | null;
    balanceValue?: number | null;
    batch?: string | null;
    brand?: string | null;
    company?: string | null;
    date?: Date | null;
    description?: string | null;
    incomingRate?: number | null;
    itemCode?: string | null;
    itemGroup?: string | null;
    quantity?: number | null;
    serialNo?: string | null;
    stkUom?: string | null;
    valuationRate?: number | null;
    voucherCode?: string | null;
    voucherType?: string | null;
    wareHouse?: string | null;
}