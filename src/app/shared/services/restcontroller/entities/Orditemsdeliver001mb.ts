import { BaseEntity } from "./BaseEntity";

export class Orditemsdeliver001mb extends BaseEntity {
    orditemsId?: number;
    sorderName?: string;
    customername?: string;
    date?: Date;
    projectName?: string | null;
    quantity?: number;
    deliverQty?: number;
    qtytoDeliver?: number;
    rate?: string | null;
    amount?: string | null;
    amttoDeliver?: string | null;
    availableQty?: string;
    expectedQty?: string | null;
    projectedQty?: string | null;
    itemCode?: string;
    warehouseName?: string;
    itemGroup?: string;
    description?: string;
}