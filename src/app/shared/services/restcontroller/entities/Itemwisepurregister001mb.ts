import { BaseEntity } from "./BaseEntity";

export class Itemwisepurregister001mb extends BaseEntity  {
    iwprId?: number;
    itemCode?: string;
    itemGroup?: string;
    inVoice?: string;
    postingDate?: Date;
    supName?: string;
    payAccount?: number;
    paymentMode?: string;
    projectname?: string;
    company?: string;
    poSeries?: string;
    purtName?: string;
    expenseAccount?: number | null;
    quantity?: number;
    rate?: string | null;
    amount?: string | null;
    totalTax?: string | null;
    total?: string | null;
    currency?: string;
}
