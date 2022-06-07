import { BaseEntity } from "./BaseEntity";

export class Salesorder001mb extends BaseEntity {
    sorder?: number;
    customername?: string;
    cpurchaseorder?: string | null;
    statusname?: string | null;
    itemid?: number | null;
    orderid?: number | null;
    itemcode?: string | null;
    ordername?: string | null;
    statusid?: number | null;
    sdeliverydate?: Date | null;
    sorderdate?:  Date | null;

}