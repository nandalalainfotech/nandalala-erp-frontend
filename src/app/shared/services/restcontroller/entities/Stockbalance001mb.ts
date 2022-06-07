import { BaseEntity } from "./BaseEntity";

export class Stockbalance001mb extends BaseEntity {
    id?: number;
    item?: string;
    itemname?: string;
    itemgroup?: string;
    brand?: string;
    description?: string;
    warehouse?: string;
    stockuom?: string;
    openingqty?: string;
    openingvalue?: string;
    inqty?: string;
    invalue?: string;
    outqty?: string;
    outvalue?: string;
    balqty?: string;
    balvalue?: string;
    validationrate?: string;
    company?: string;
}