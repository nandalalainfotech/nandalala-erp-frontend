import { BaseEntity } from "./BaseEntity";

export class Periodclosingvoucher001mb extends BaseEntity  {
    id?: number;
    transactiondate?: Date;
    closingaccounthead?: string;
    postingdate?: Date;
    closingfiscalyear?: number;
    company?: string;
    remarks?: string;
}
