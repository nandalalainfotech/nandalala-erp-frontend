import { BaseEntity } from "./BaseEntity";
import { Person001mb } from "./Person001mb";

export class User001mb extends Person001mb  {
    personId?: number;
    domain?: string;
    username?: string;
    password?: string;
    status?: string;
    email?: string;
    securityquestion?: string;
    securityanswer?: string;
    theme?: string | null;
}