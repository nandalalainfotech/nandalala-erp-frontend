import { BaseEntity } from "./BaseEntity";

export class Currency001mb extends BaseEntity {
    currId?: number;
    currencyName?: string;
    currencyAbbr?: string | null;
    fractionName?: string | null;
}