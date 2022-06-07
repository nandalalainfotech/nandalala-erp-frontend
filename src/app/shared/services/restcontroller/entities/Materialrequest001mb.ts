import { BaseEntity } from "./BaseEntity";

export class Materialrequest001mb extends BaseEntity {
    id?: number;   
    item?: string;
    warehouse?: string;
    actual?: number;
    requested?: number;
    reserved?: number;
    ordered?: number;
    projected?: number;
}