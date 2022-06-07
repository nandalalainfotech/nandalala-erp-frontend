import { BaseEntity } from "./BaseEntity";

export class Itemwiselevel001mb extends BaseEntity {
    iwlId?: number;
    itemCode?: string;
    safetyStk?: string;
    leadtimeDays?: string | null;
    consumed?: string | null;
    delivered?: string | null;
    totalOutgoing?: string | null;
    avgdailyOutgoing?: string | null;
    reorderLevel?: string;
    description?: string;
}
