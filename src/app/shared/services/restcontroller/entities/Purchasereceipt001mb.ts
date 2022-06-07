import { BaseEntity } from "./BaseEntity";

export class Purchasereceipt001mb extends BaseEntity {
    id?: number;
    supplier?: string;
    date?: Date;
    supplieraddress?: string;
    grandtotal?: number;
    status?: string;
}