import { BaseEntity } from "./BaseEntity";

export class Prmatreq001mb extends BaseEntity {
    pmrId?: number;
    mrType?: string;
    mrSeries?: string;
    itemCode?: string;
    quantity?: string;
    forWarehouse?: string;
    requiredDate?: Date;
}