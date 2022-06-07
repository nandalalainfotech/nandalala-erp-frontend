import { BaseEntity } from "./BaseEntity";

export class Matchpayment001mb extends BaseEntity {
    id?: number;
    company?: string;
    partytype?: string;
    party?: string;
    receivableorpayableaccount?: string;
    fromdate?: Date;
    todate?: Date;
    bankorcashaccount?: string;
    minimuminvoiceamount?: number;
    maximuminvoiceamount?: number;
    refName?: string;
    invoiceNumber?: string;
    amount?: string | null;
    allocatedamount?: string | null;
}