import { BaseEntity } from "./BaseEntity";

export class Accbalancesheet001mb extends BaseEntity {
    absId?: number;


    company?: string;


    startYear?: number;

    endYear?: number;


    periodicity?: string;


    account?: string;

    jan?: string | null;


    feb?: string | null;


    mar?: string | null;


    apr?: string | null;


    may?: string | null;


    jun?: string | null;


    jul?: string | null;


    aug?: string | null;

    sep?: string | null;

    oct?: string | null;

    nov?: string | null;

    dece?: string | null;
}