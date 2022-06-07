import { BaseEntity } from "./BaseEntity";

export class Stockprojected001mb extends BaseEntity {
    id?: number;
    actualqty?: number | null;
    brand?: string | null;
    description?: string | null;
    itemcode?: string | null;
    itemgroup?: string | null;
    itemname?: string | null;
    orderedqty?: number | null;
    plannedqty?: number | null;
    projectedqty?: number | null;
    reorderlevel?: number | null;
    reorderqty?: number | null;
    requestedqty?: number | null;
    reservedqty?: number | null;
    shortageqty?: number | null;
    stockuom?: string | null;
    warehouse?: string | null;

}