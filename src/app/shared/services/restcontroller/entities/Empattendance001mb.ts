import { BaseEntity } from "./BaseEntity";

export class Empattendance001mb extends BaseEntity {
    id?: number;
    clBalance?: number | null;
    clTaken?: string | null;
    compoffBalance?: number | null;
    compoffTaken?: string | null;
    deptName?: string | null;
    empName?: string | null;
    empNumber?: string | null;
    lwtoutpBalance?: number | null;
    lwtoutpTaken?: string | null;
    mtlvBalance?: number | null;
    mtlvTaken?: string | null;
    ptyBalance?: number | null;
    ptyTaken?: string | null;
    pvglvBalance?: number | null;
    pvglvTaken?: string | null;
    sklvBalance?: number | null;
    sklvTaken?: string | null;
    vcBalance?: number | null;
    vcTaken?: string | null;
}
