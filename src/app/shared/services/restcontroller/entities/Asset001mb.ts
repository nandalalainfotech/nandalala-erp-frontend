import { BaseEntity } from "./BaseEntity";

export class Asset001mb extends BaseEntity {
    id?: number;
    asset?: string;
    depreciationdate?: Date;
    purchaseamount?: number;
    depreciationamount?: number;
    accumulateddepreciationamount?: number;
    amountafterdepreciation?: number;
    depreciationentry?: string;
    assetcategory?: string;
    currentstatus?: string;
    depreciationmethod?: string;
    purchasedate?: Date;
}