import { BaseEntity } from "./BaseEntity";

export class Empworkonholiday001mb extends BaseEntity {
    empwhId?: number;
    fromDate?: Date | null;
    toDate?: Date | null;
    empNumber?: string | null;
    empName?: string | null;
    holidayList?: string | null;
    empStatus?: string | null;
    whDate?: Date | null;
    holiday?: string | null;
}
