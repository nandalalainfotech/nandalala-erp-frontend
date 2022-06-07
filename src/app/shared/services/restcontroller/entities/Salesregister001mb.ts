import { BaseEntity } from "./BaseEntity";

export class Salesregister001mb extends BaseEntity {
    regId?: number;
    postingDate?: Date;
    customername?: string;
    customergroup?: string;
    terName?: string;
    accountType?: string;
    paymentMode?: string;
    projectname?: string;
    remarks?: string;
    salesCode?: string;
    delNote?: string;
    currency?: string;
    gainloss?: string | null;
    saleswpl?: string | null;
    netTotal?: string | null;
    totalTax?: string | null;
    grandTotal?: string | null;
    roundedTotal?: string | null;
    outstandAmt?: string | null;
}