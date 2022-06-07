import { BaseEntity } from "./BaseEntity";

export class Landcostvouch001mb extends BaseEntity {
    vouchId?: number;
    series?: string;
    company?: string;
    recptdocType?: string;
    recptdoc?: string;
    supName?: string;
    grandTotal?: number;
}