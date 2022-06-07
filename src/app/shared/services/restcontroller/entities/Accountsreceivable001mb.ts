import { BaseEntity } from "./BaseEntity";

export class Accountsreceivable001mb extends BaseEntity {
    id?: number;

 
	postingdate?: Date;

 
	customer?: string;

 
	vouchertype?: string;

 
	voucherno?: string;

 
	duedate?: Date;

 
	invoicedamount?: number;

 
	paidamount?: number;

	 
	outstandingamount?: number;

 
	age?: number;

 
	uptothirty?: number;

 
	uptosixty?: number;

 
	uptoninety?: number;

 
	ninetyabove?: number;


	currency?: number;

 
	territory?: string;

 
	remarks?: string;
}