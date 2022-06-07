import { BaseEntity } from "./BaseEntity";

export class Employee001mb extends BaseEntity {
    sNo?: number;
    branch?: string | null;
    deptName?: string | null;
    empCompany?: string | null;
    empDesign?: string | null;
    empDob?: Date | null;
    empDoj?: Date | null;
    empGender?: string | null;
    empName?: string | null;
    empNumber?: string | null;
    empStatus?: string | null;
    // deptId?: number | null;

}
