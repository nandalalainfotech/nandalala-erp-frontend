import { BaseEntity } from "./BaseEntity";

export class Purchase001mb extends BaseEntity {
    id?: number;
    date?: Date | null;
    grandtotal?: number | null;
    status?: string | null;
    supplier?: string | null;
    supplieraddress?: string | null;
}