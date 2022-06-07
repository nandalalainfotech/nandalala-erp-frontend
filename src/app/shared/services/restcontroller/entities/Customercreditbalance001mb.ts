import { BaseEntity } from "./BaseEntity";

export class Customercreditbalance001mb extends BaseEntity {
    ccid?:number;
    creditlimit?:string;
    customer?: string;
    outstandingamount?:string;
    creditbalance?:string;
    //  id?:number;
    customername?:string | null;
}