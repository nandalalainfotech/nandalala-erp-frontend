import { BaseEntity } from "./BaseEntity";

export class Stksettings001mb extends BaseEntity {
  
    setId?: number;
    itemnameBy?: string;
    defaultValue?: string;
    itemGroup?: string;
    allowancePercent?: string | null;
    defaultUom?: string;
    warehouseName?: string;
    showbarcodeField?: boolean;
    autoinsertPricelist?: boolean;
    autosetSerialno?: boolean;
    allownegativeStock?: boolean;
}