import { BaseEntity } from "./BaseEntity";

export class Stkrepproject001mb extends BaseEntity {
    stprojId?: number;
    uom?: string | null;
    actualQty?: number | null;
    brand?: string | null;
    description?: string | null;
    itemCode?: string | null;
    itemGroup?: string | null;
    orderedQty?: number | null;
    plannedQty?: number | null;
    reorderQty?: number | null;
    reorderValue?: number | null;
    requestedQty?: number | null;
    reservedQty?: number | null;
    shortageQty?: number | null;
    wareHouse?: string | null;
}
