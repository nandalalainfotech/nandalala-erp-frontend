import { BaseEntity } from "./BaseEntity";

export class PosprofileDTO extends BaseEntity  {
    profileId?: number;
    appforUser?: string;
    series?: string;
    company?: string;
}