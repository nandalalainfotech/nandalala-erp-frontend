import { BaseEntity } from "./BaseEntity";

export class Recruitoffer001mb extends BaseEntity {
    offerId?: number;
    applicantNamePrefix?: string;
    applicantName?: string;
    companyName?: string;
    offer?: string;
    refer?: string;
    position?: string;
    grade?: string;
    ctc?: string;
    dateOfJoin?: Date;
    line1?: string;
    line2?: string;
    cityOrVillage?: string;
    stateOrTerritory?: string;
    country?: string;
    postalCode?: number;
    phoneNo?: number;
    alternativePhoneNo?: number;
    offerLetter?: string;
    status?: string | null;
}