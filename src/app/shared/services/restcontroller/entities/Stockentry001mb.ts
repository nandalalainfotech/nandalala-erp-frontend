import { BaseEntity } from "./BaseEntity";

export class Stockentry001mb extends BaseEntity {
    stockid?: number;
    materialrequest?: string;
    date?: Date;
    quantity?: number | null;
    transferedQty?: string;
    qtytotransfer?: string;
    description?: string;
    company?: string;
    itemid?: number;
}