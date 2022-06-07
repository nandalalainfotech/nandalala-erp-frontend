import { BaseEntity } from "./BaseEntity";

export class Dailytimesheet001mb extends BaseEntity {
    id?: number;
    timesheet?: string;
    employee?: string;
    employeename?: string;
    fromdatetime?: Date;
    todatetime?: Date;
    hours?: string;
    activitytype?: string;
    task?: string;
    project?: string;
    status?: string;
}
