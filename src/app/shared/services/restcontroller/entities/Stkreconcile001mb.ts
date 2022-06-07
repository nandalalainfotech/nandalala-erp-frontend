import { BaseEntity } from "./BaseEntity";

export class Stkreconcile001mb extends BaseEntity {
    stkrecId?: number;
    series?: string;
    company?: string;
    postingDate?: Date;
    postingTime?: string;
    diffAcc?: string | null;
    costCenter?: string | null;
}