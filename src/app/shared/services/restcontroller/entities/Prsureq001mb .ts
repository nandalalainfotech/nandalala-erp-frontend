import { BaseEntity } from "./BaseEntity";

export class Prsureq001mb extends BaseEntity  {
    prsrId?: number;
    suSeries?: string;
    date?: Date;
    supplier?: string;
    itemCode?: string;
    quantity?: number;
    stockUom?: string;
    rate?: string;
    taxandChg?: string | null;
    accountHead?: string;
    squotrate?: string | null;
    sutype?: string;

}