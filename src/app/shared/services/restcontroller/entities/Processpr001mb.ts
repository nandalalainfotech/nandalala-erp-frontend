import { BaseEntity } from "./BaseEntity";

export class Processpr001mb extends BaseEntity {
    processId?: number;
    sNo?: number | null;
    year?: number;
    month?: number;
    postingDate?: Date;
    deptName?: string | null;
    empCompany?: string | null;
}