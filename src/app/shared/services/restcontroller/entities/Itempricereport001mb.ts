import { BaseEntity } from "./BaseEntity";

export class Itempricereport001mb extends BaseEntity {
    itpricesId?: number;
    itemCode?: string;
    itemGroup?: string;
    uom?: string;
    lstPurchase?: string;
    valuationRate?: string | null;
    spList?: string;
    ppList?: string;
    bomRate?: string | null;
    description?: string;
}
