import { BaseEntity } from "./BaseEntity";

export class Customerdetails001mb extends BaseEntity {
    id?: number;
    customerid?: string;
    customername?: string;
    customergroup?: string;
    addressline1?: string;
    addressline2?: string;
    city?: string;
    state?: string;
    postalcode?: string;
    country?: string;
    isprimaryaddress?: boolean;
    firstname?: string;
    lastname?: string;
    phone?: number;
    mobilenumber?: number;
    emailid?: string;
    isprimarycontact?: number;
}
