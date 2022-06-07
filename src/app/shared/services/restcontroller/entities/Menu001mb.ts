import { BaseEntity } from "./BaseEntity";

export class Menu001mb extends BaseEntity {
    menuid?: number;
    menuname?: string;
    menulink?: string | null;
    parentid?: number | null;
    parentname?: string | null;
    domain?: string;
}