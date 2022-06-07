import { BaseEntity } from "./BaseEntity";

export class Puranalytics001mb extends BaseEntity {
    puansId?: number;
    treeType?: string;
    basedOn?: string;
    valueorqty?: string;
    company?: string;
    fromDate?: Date;
    toDate?: Date;
    anRange?: string | null;
}