import { BaseEntity } from "./BaseEntity";

export class Project001mb extends BaseEntity {
    id?: number;
    projectname?: string;
    estimatedcost?: number;
    enddate?: Date;
    startdate?: Date;
    status?: string;
}