import { BaseEntity } from "./BaseEntity";

export class Itempuhist001mb extends BaseEntity {
    histId?: number;
    itemCode?: string;
    itemGroup?: string;
    description?: string;
    quantity?: number;
    uom?: string;
    date?: Date | null;
    amount?: number;
    poSeries?: string | null;
    transDate?:Date | null;
    supplier?: string | null;
    receivedqty?: number;
    company?: string;
}