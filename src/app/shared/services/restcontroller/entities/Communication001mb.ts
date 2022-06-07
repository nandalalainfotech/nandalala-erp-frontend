import { BaseEntity } from "./BaseEntity";

export class Communication001mb extends BaseEntity  {
    commId?: number;
    subject?: string;
    status?: string | null;
    sentrec?: string | null;
}
