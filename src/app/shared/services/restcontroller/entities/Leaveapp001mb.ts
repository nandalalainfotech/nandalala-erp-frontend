import { BaseEntity } from "./BaseEntity";

export class Leaveapp001mb extends BaseEntity {
    lvappId?: number;
    series?: string;
    leaveType?: string;
    reason?: string;
    fromDate?: Date;
    toDate?: Date;
    leaveApprover?: string;
    postingDate?: Date;
    company?: string;
    empNumber?: string | null;
    deptName?: string | null;
}
