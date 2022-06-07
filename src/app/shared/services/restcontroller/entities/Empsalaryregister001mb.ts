import { BaseEntity } from "./BaseEntity";

export class Empsalaryregister001mb extends BaseEntity  {
    esregId?: number;
    salslipCode?: string | null;
    empNumber?: string | null;
    empName?: string | null;
    deptName?: string | null;
    branch?: string | null;
    empCompany?: string | null;
    empDesign?: string | null;
    salarymonth?: string | null;
    salYear?: string | null;
    lvwoutPay?: number | null;
    paymentDays?: string | null;
    incomeTax?: number | null;
    basic?: string | null;
    arrearAmt?: number | null;
    lvencashAmt?: number | null;
    grossPay?: number | null;
    totalDeduct?: string | null;
    netPay?: number | null;
}
