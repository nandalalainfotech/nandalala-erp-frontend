import { BaseEntity } from "./BaseEntity";

export class Recruitrelieving001mb extends BaseEntity {
    relievingId?: number;
    applicantNamePrefix?: string;
    applicantName?: string;
    companyName?: string;
    position?: string;
    grade?: string;
    dateOfJoin?: Date;
    dateOfRelieve?: Date;
    line1?: string;
    line2?: string;
    cityOrVillage?: string;
    stateOrTerritory?: string;
    country?: string;
    postalCode?: number;
    phoneNo?: number;
    alternativePhoneNo?: number;
    relievingLetter?: string;

}