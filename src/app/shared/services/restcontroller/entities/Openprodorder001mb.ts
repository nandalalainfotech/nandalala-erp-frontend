import { BaseEntity } from "./BaseEntity";

export class Openprodorder001mb extends BaseEntity {
    prodId?: number;
    prorderCode?: string;
    date?: Date;
    itemtoManufacture?: string;
    toProduce?: string | null;
    produced?: string;
    empCompany?: string;

}