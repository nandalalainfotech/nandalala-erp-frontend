import { BaseEntity } from "./BaseEntity";

export class Payroll001mb extends BaseEntity {
    prId?: number;
    sNo?: number | null;
    status?: string;
    fiscalYear?: number;
    salarySlip?: string;
    empName?: string | null;
}