import { BaseEntity } from "./BaseEntity";

export class Pricingrule001mb extends BaseEntity  {
    priceruleid?: number;
    itemCode?: string;
    priceTitle?: string;
    buying?: boolean;
    selling?: boolean;
    minQty?: string;
    maxQty?: string;
    validFrom?: Date;
    company?: string;
    validUpto?: Date;
    prordisc?: string;
    discprlist?: string | null;
    forprlist?: string | null;
}