import { BaseEntity } from "./BaseEntity";

export class Employbirthday001mb extends BaseEntity  {
    empbirthId?: number;
    ebmonth?: string | null;
    empDob?: Date| null;
    empNumber?: string | null;
    empName?: string | null;
    deptName?: string | null;
    branch?: string | null;
    empCompany?: string | null;
    empDesign?: string | null;
    empGender?: string | null;
}

