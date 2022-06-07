import { BaseEntity } from "./BaseEntity";

export class Manufactureset001mb extends BaseEntity {
    mansetId?: number;
    disableCPandTt?: boolean;
    allowOt?: boolean;
    allowProdinholy?: boolean;
    prodPercent?: string;
    backflushRm?: string;
    capacityPlan?: string;
    timebwOpern?: string;
    defworkinProgWh?: string;
    defFingoodsWh?: string;
}