import { BaseEntity } from "./BaseEntity";

export class Bankclearance001mb extends BaseEntity {
    bankclrId?: number;

 
    fromDate?: Date;

 
    toDate?: Date;

 
    bankAccount?: string;

 
    payDocument?: string;

 
    entrySeries?: string;

 
    chequeref?: string;

 
    clearanceDate?: Date;

 
    againstAccount?: string;

 
    amount?: string | null;
}