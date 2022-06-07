import { BaseEntity } from "./BaseEntity";

export class Accountspayable001mb extends BaseEntity {
    id?: number;

	 
	postingdate?: Date;

	 
	supplier?: string;

	  
	suppliertype?: string;

	 
	vouchertype?: string;

	 
	vouchernumber?: string;

 
	duedate?: Date;

	 
	billno?: number;

	 
	billdate?: Date;

	 
	invoicedamount?: number;

	  
	paidamount?: number;

	  
	outstandingamount?: number;

	  
	age?: number;

	 
	uptothirty?: number;

	 
	uptosixty?: number;

	uptoninety?: number;

	 
	ninetyabove?: number;

	 
	currency?: number;

	 
	remarks?: string;
}