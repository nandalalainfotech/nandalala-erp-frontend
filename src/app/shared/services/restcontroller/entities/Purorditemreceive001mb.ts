import { BaseEntity } from "./BaseEntity";

export class Purorditemreceive001mb extends BaseEntity  {
    poitrecId?: number;
    puOrder?: string;
    date?: Date;
    reqbyDate?: string;
    supName?: string;
    projectName?: string | null;
    quantity?: number;
    receivedQty?: string | null;
    qtytoReceive?: string | null;
    warehouseName?: string;
    itemCode?: string;
    description?: string;
    brandName?: string;
    company?: string;

}