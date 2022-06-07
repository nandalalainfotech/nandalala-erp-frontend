import { BaseEntity } from "./BaseEntity";

export class Requestitembuy001mb extends BaseEntity {
    riId?: number;
    itemCode?: string;
    warehouse?: string;
    actual?: number;
    requested?: number | null;
    reserved?: number | null;
    ordered?: number | null;
    projected?: number | null;
}