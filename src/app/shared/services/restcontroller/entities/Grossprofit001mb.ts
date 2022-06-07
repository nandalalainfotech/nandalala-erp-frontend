import { BaseEntity } from "./BaseEntity";

export class Grossprofit001mb extends BaseEntity {
    id?: number;
    salesinvoice?: string;
    customer?: string;
    postingdate?: Date;
    itemname?: string;
    description?: string;
    warehouse?: string;
    project?: string;
    currency?: number;
    quantity?: number;
    averagesellingrate?: number;
    averagebuyingrate?: number;
    sellingamount?: number;
    buyingamount?: number;
    grossprofit?: number;
    grosspercentage?: number;
}
