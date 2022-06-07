import { BaseEntity } from "./BaseEntity";

export class Uploadtemplate001mb extends BaseEntity {
    id?: number;
    content?: Buffer;
    filename?: string;
}