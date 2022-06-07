import { BaseEntity } from "./BaseEntity";

export class Jounalentry001mb extends BaseEntity {
    jeId?: number;
    title?: string;
    status?: string;
    referenceNumber?: string;
    jeSeries?: string;
    postingDate?: Date;
    referenceDate?: Date;
    accountName?: string;
    partyName?: string;
    credit?: number;
    debit?: number;
    docStatus?: string;
}
