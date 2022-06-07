import { BaseEntity } from "./BaseEntity";

export class Expensesclm001mb extends BaseEntity {
    expclmId?: number;
    expCode?: string | null;
    expType?: string | null;
    status?: string | null;
    totalclmAmt?: number | null;
}
