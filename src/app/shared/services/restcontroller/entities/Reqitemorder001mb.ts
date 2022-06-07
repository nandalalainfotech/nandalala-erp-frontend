import { BaseEntity } from "./BaseEntity";

export class Reqitemorder001mb extends BaseEntity {
    mrsId?: number;
    mrSeries?: string="";
    date?: Date;
    itemCode?: string="";
    quantity?: number;
    orderedqty?: string | null="";
    qtyrtoorder?: string | null="";
    description?: string | null="";
    company?: string="";
    qtytoorder?: number ;
}