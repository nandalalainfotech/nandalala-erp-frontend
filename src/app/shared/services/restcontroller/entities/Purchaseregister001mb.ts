import { BaseEntity } from "./BaseEntity";

export class Purchaseregister001mb extends BaseEntity  {
    regId?: number;
    invoice?: string;
    postingDate?: Date;
    supName?: string;
    supType?: string;
    accountType?: string;
    paymentMode?: string;
    projectname?: string;
    billNo?: string;
    billDate?: Date;
    remarks?: string;
    poSeries?: string;
    purecpt?: string;
    currency?: string;
    furnituresCount?: string | null;
    softwaresCount?: string | null;
    stkrecBalance?: string | null;
    netTotal?: string | null;
    totalTax?: string | null;
    grandTotal?: string | null;
    roundTotal?: string | null;
    outstandAmt?: number | null;
}
