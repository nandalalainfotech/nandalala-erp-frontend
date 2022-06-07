import { BaseEntity } from "./BaseEntity";

export class Stockledger001mb extends BaseEntity {
    id?: number;
    date?: Date;
    item?: string;
    itemname?: string;
    itemgroup?: string;
    brand?: string;
    description?: string;
    warehouse?: string;
    stockuom?: string;
    qty?: number;
    balanceqty?: number;
    incomingrate?: number;
    valuationrate?: number;
    balancevalue?: number;
    vouchertype?: string;
    voucherno?: number;
    batch?: number;
    serialno?: number;
    company?: string;
  
}