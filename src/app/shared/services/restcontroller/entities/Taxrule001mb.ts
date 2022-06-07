import { BaseEntity } from "./BaseEntity";

export class Taxrule001mb extends BaseEntity {
    id?: number;
    billingcity?: string | null;
    billingcountry?: string | null;
    billingstate?: string | null;
    customer?: string | null;
    fromdate?: Date | null;
    shippingcity?: string | null;
    shippingcountry?: string | null;
    shippingstate?: string | null;
    taxtemplate?: string | null;
    taxtype?: string | null;
    todate?: Date | null;
}