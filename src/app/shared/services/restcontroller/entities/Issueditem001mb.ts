import { BaseEntity } from "./BaseEntity";

export class Issueditem001mb extends BaseEntity {
    issueId?: number;
    porderCode?: string;
    issueDate?: Date;
    itemcode?: string;
    description?: string;
    quantity?: number;
    uom?: string;
    amount?: string;
    serialNo?: string;
    sourceWh?: string;
    targetWh?: string;
    stockEntry?: string;
    company?: string;
}
