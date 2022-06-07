import { BaseEntity } from "./BaseEntity";

export class Favourites001mb extends BaseEntity {

    favId?: number;
    property?: string | null;
    link?: string | null;
    loginUser?: string | null;
    status?: string | null;
}