import { BaseEntity } from "./BaseEntity";

export class Accgenledge001mb extends BaseEntity {
	accglId?: number;
	company?: string;
	fromDate?: Date;
	toDate?: Date;
	partyType?: string;
	partyName?: string;
	grpbyVoucher?: boolean;
	grobyAccount?: boolean;
	letterHead?: string;
	postingDate?: Date;
	accountName?: string;
	debit?: number | null;
	credit?: number | null;
	voucherCode?: string;
	voucherType?: string;
	againstAmt?: number | null;
	projectname?: string;
	costCenter?: string;
	againvcType?: string;
	againvcName?: string;
}