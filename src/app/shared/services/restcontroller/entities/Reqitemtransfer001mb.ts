import { BaseEntity } from "./BaseEntity";

export class Reqitemtransfer001mb extends BaseEntity  {
    ittransId?: number;
    mrSeries?: string;
    date?: Date;
    quantity?: number;
    transferQty?: string | null;
    qtytoTransfer?: string | null;
    itemCode?: string;
    company?: string;
    description?: string;
}