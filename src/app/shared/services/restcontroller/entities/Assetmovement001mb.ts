import { BaseEntity } from "./BaseEntity";

export class Assetmovement001mb extends BaseEntity {
    id?: number;
    asset?: string | null;
    company?: string | null;
    targetwarehouse?: string | null;
    transactiondate?: Date | null;
}