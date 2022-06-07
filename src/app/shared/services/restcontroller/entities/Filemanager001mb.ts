import { BaseEntity } from "./BaseEntity";

export class Filemanager001mb extends BaseEntity {
    id?: number;
    category?: string | null;
    filename?: string | null;
    loginuser?: string | null;
    originalfilename?: string | null;
}