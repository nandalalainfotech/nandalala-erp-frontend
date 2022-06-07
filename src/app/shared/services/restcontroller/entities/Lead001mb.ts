import { BaseEntity } from "./BaseEntity";

export class Lead001mb extends BaseEntity {
    id?: number;
    personname?: string;
    organisationname?: string;
    status?: string;
    source?: string;
    leadowner?: string;
    nextcontactby?: string | null;
    leadtype?: string | null;
    marketsegment?: string | null;
}