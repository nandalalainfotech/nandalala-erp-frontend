import { BaseEntity } from "./BaseEntity";

export class Itemdt001mb extends BaseEntity  {
    itemid?: number;
    itemcode?: string | null;
    quantity?: number;
    rate?: string | null;
    amount?: string | null;
}