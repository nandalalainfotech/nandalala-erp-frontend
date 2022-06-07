import { BaseEntity } from "./BaseEntity";

export class Empleavebalance001mb extends BaseEntity {
    elbId?: number;
    fromDate?: Date | null;
    toDate?: Date | null;
    empNumber?: string | null;
    empName?: string | null;
    deptName?: string | null;
    branch?: string | null;
    company?: string | null;
    clTaken?: string | null;
    clBalance?: number | null;
    compoffTaken?: string | null;
    compoffBalance?: number | null;
    lvwoutpayTaken?: string | null;
    lvwoutpayBalance?: number | null;
    plTaken?: string | null;
    plBalance?: number | null;
    slTaken?: string | null;
    slBalance?: number | null;
}

