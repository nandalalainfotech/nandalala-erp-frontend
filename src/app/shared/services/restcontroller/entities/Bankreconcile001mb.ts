import { BaseEntity } from "./BaseEntity";

export class Bankreconcile001mb extends BaseEntity {
    bankrecId?: number;
    bankAccount?: string;
    postingDate?: Date;
    entrySeries?: string;
    debit?: number;
    credit?: number;
    againstAccount?: string;
    referenceName?: string;
    referenceDate?: Date;
    clearanceDate?: Date;
    currency?: string;
}