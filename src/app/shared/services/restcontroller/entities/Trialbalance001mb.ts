import { BaseEntity } from "./BaseEntity";

export class Trialbalance001mb extends BaseEntity {
    id?: number;
    account?: string;
    openingcr?: number;
    openingdr?: number;
    closingcr?: number;
    closingdr?: number;
    credit?: number;
    debit?: number;
}