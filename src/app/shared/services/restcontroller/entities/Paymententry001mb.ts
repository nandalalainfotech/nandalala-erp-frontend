import { BaseEntity } from "./BaseEntity";

export class Paymententry001mb extends BaseEntity {
    payentId?: number;
    entrySeries?: string;
    postingDate?: Date;
    paymentType?: string;
    paymentMode?: string;
    partyType?: string;
    partyName?: string;
    accpaidTo?: string;
}