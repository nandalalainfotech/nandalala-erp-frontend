import { BaseEntity } from "./BaseEntity";

export class Crmspoppo001mb extends BaseEntity {
  oppId?: number;
  oppSeries?: string;
  oppType?: string | null;
  oppFrom?: string | null;
  status?: string | null;
  withitems?: boolean;
}