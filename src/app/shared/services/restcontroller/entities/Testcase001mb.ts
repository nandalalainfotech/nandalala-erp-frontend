import { BaseEntity } from "./BaseEntity";

export class Testcase001mb extends BaseEntity {
    id?: string;
    assignto?: string;
    automated?: string;
    dateupdated?: Date;
    exectype?: string;
    foldername?: string;
    lstrnby?: string;
    lstrndate?: Date;
    lstrnrelease?: string;
    lstrnstatus?: string;
    lstrntestset?: string;
    originalid?: string;
    owner?: string;
    priority?: string | null;
    reviewed?: string;
    rnbyhost?: string;
    runtime?: string;
    status?: string;
    testtype?: string;
    title?: string;
    version?: string;
}