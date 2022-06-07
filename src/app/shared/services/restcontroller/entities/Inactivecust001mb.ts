import { BaseEntity } from "./BaseEntity";

export class Inactivecust001mb extends BaseEntity {
    inactcustId?: number;
    custType?: string;
    customername?: string;
    terName?: string;
    customergroup?: string;
    numoforder?: string;
    totalordval?: string | null;
    totalordcons?: string | null;
    lastordamt?: string | null;
    lastorddate?: Date | null;
    daysinlstord?: Date | null;
}
