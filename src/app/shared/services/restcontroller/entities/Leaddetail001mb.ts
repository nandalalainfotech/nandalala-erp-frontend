import { BaseEntity } from "./BaseEntity";

export class Leaddetail001mb extends BaseEntity {
    leadId?: number;
    leadName?: string;
    companyName?: string;
    status?: string;
    address?: string;
    state?: string;
    pinCode?: number;
    country?: string;
    phone?: number | null;
    mobileNo?: number;
    email?: string;
    leadOwner?: string;
    terName?: string;
}