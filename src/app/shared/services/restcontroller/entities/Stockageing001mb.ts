import { BaseEntity } from "./BaseEntity";

export class Stockageing001mb extends BaseEntity {
    id?: number;
    itemcode?: string;
    itemname?: string;
    description?: string;
    itemgroup?: string;
    brand?: string;
    averageage?: number;
    earliest?: boolean;
    latest?: boolean;
    uom?: string;
    actual?: number | null;
    item?: string | null;
    ordered?: number | null;
    projected?: number | null;
    requested?: number | null;
    reserved?: number | null;
    warehouse?: string | null;
}