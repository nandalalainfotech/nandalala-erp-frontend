import { BaseEntity } from "./BaseEntity";

export class Progprodorder001mb extends BaseEntity {
    prodId?: number;
    prorderCode?: string;
    date?: Date;
    itemtoManufacture?: string;
    toProduce?: string | null;
    produced?: string;
    empCompany?: string;
}