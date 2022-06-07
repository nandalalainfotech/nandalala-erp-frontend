import { BaseEntity } from "./BaseEntity";

export class Recruitapplicant001mb extends BaseEntity {
    appId?: number;
    applicantName?: string;
    status?: string;
    jobId?: number | null;
    jobName?: string | null;
}