import { BaseEntity } from "./BaseEntity";

export class Purtaxcharges001mb extends BaseEntity {
    putaxId?: number;
    status?: string;
    company?: string;
    taxchgType?: string;
    accountHead?: string;
    rate?: string | null;
    amount?: string | null;
    total?: string | null;
}