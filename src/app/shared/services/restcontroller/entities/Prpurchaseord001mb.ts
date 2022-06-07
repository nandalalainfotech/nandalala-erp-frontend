import { BaseEntity } from "./BaseEntity";

export class Prpurchaseord001mb extends BaseEntity {
    proId?: number;
    poSeries?: string;
    date?: Date;
    supplier?: string;
    supplyrawmat?: string;
    itemCode?: string;
    quantity?: number;
    rate?: string;
    amount?: string;
    prtype?: string;
    accountHead?: number | null;
    quotrate?: string;
    taxandChg?: number;

}