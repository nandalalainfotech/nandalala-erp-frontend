import { BaseEntity } from "./BaseEntity";

export class Updatebank001mb extends BaseEntity  {
    id?: number;
    bankaccount?: string;
    fromdate?: Date;
    todate?: Date;
    customername?: string;
    amount?: string | null;
    chqNumber?: string | null;
    clearanceDate?: Date;
}