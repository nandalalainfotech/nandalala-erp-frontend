import { BaseEntity } from "./BaseEntity";

export class Task001mb extends BaseEntity {
    taskid?: number;
    projectname?: string | null;
    taskdescription?: string;
    assignTo?: string;
    assignBy?: string;
    status?: string;
    starton?: Date;
    endon?: Date;
    allday?: boolean;
    duration?: string | null;
    sendanemail?: boolean;
    repeatthisevent?: boolean;
    projectid?:number;
}
