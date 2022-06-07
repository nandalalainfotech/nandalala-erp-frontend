import { DatePipe } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { matchPaymentsManager } from 'src/app/shared/services/restcontroller/bizservice/matchpayments.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Matchpayment001mb } from 'src/app/shared/services/restcontroller/entities/Matchpayment001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-match-payments',
	templateUrl: './match-payments.component.html',
	styleUrls: ['./match-payments.component.css']
})
export class MatchPaymentsComponent implements OnInit {
	frameworkComponents: any;
	id: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	company: string = "";
	partytype: string = "";
	party: string = "";
	receivableorpayableaccount: string = "";
	fromdate: Date | null = null;
	todate: Date | null = null;
	bankorcashaccount: string = "";
	minimuminvoiceamount: number | any;
	maximuminvoiceamount: number | any;
	refName: string = "";
	invoiceNumber: number| any;
	amount?: string | null;
	allocatedamount?: string | null;
	matchPayment: Matchpayment001mb[] = [];
	accname: string = "type.account";
	accstatus: string = "account";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	ptname = "party.type";
	pttype = "type";
	bcname = "bc.type";
	bctype = "type";
	dummysystemproperties: Systemproperties001mb[] = [];
	partytypesystemproperties: Systemproperties001mb[] = [];
	bcsystemproperties: Systemproperties001mb[] = [];
	matchForm: FormGroup | any;
	submitted = false;
	public gridOptions: GridOptions | any;
	accsystemproperties?: Systemproperties001mb[] = [];

	constructor(private matchpaymentsManager: matchPaymentsManager, 
		private datePipe: DatePipe,
		private systemPropertiesService: SystemPropertiesService, 
		private formBuilder: FormBuilder, 
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer:IconRendererComponent
		}
	}

	ngOnInit() {

		this.matchForm = this.formBuilder.group({
			company: ['', Validators.required],
			partytype: ['', Validators.required],
			party: ['', Validators.required],
			receivableorpayableaccount: ['', Validators.required],
			fromdate: ['', Validators.required],
			todate: ['', Validators.required],
			bankorcashaccount: ['', Validators.required],
			minimuminvoiceamount: ['', Validators.required],
			maximuminvoiceamount: ['', Validators.required],
			refName: ['', Validators.required],
			invoiceNumber: ['', Validators.required],
			amount: ['', Validators.required],
			allocatedamount: ['', Validators.required]
		});
		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.accname, this.accstatus).subscribe(response => {
			this.accsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.accname, this.accstatus).subscribe(response => {
			this.bcsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.ptname, this.pttype).subscribe(response => {
			this.partytypesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.matchpaymentsManager.allmatchpay().subscribe((response) => {
			this.matchPayment = deserialize<Matchpayment001mb[]>(Matchpayment001mb, response);
			if (this.matchPayment.length > 0) {
				this.gridOptions?.api?.setRowData(this.matchPayment);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})

	}
	get f() { return this.matchForm.controls; }
	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRendered: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		// this.gridOptions.domLayout = 'autoHeight';
		this.gridOptions.animateRows = true;

		this.gridOptions.columnDefs = [
			{
				headerName: 'S No',
				field: 'id',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Company',
				field: 'company',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Party Type',
				field: 'partytype',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Party',
				field: 'party',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Receivable / Payable Account',
				field: 'receivableorpayableaccount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Bank / Cash Account',
				field: 'bankorcashaccount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'From Invoice Date',
				field: 'fromdate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.fromdate ? this.datePipe.transform(params.data.fromdate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'To Invoice Date',
				field: 'todate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.todate ? this.datePipe.transform(params.data.todate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Minimum Invoice Amount',
				field: 'minimuminvoiceamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Maximum Invoice Amount',
				field: 'maximuminvoiceamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Reference Name',
				field: 'refName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Invoice Number',
				field: 'invoiceNumber',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Amount',
				field: 'amount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Allocated Amount ',
				field: 'allocatedamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 200,
				flex: 1,
				suppressSizeToFit: true,
				cellStyle: { textAlign: 'center' },
				cellRendererParams: {
					onClick: this.onEditButtonClick.bind(this),
					label: 'Edit'
				},
			},
			{
				headerName: 'Delete',
				cellRenderer: 'iconRenderer',
				width: 250,
				flex: 1,
				suppressSizeToFit: true,
				cellStyle: { textAlign: 'center' },
				cellRendererParams: {
					onClick: this.onDeleteButtonClick.bind(this),
					label: 'Delete'
				},
			},
			{
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 200,
                flex: 1,
				suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
		];
	}
	onEditButtonClick(params: any) {
		this.id = params.data.id;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.matchForm.patchValue({
			'company': params.data.company,
			'partytype': params.data.partytype,
			'party': params.data.party,
			'receivableorpayableaccount': params.data.receivableorpayableaccount,
			'fromdate': this.datePipe.transform(params.data.fromdate, 'MM/dd/yyyy'),
			'todate': this.datePipe.transform(params.data.todate, 'MM/dd/yyyy'),
			'bankorcashaccount': params.data.bankorcashaccount,
			'minimuminvoiceamount': params.data.minimuminvoiceamount,
			'maximuminvoiceamount': params.data.maximuminvoiceamount,
			'refName': params.data.refName,
			'invoiceNumber': params.data.invoiceNumber,
			'amount': params.data.amount,
			'allocatedamount': params.data.allocatedamount,
		});
	}
	onDeleteButtonClick(params: any) {
		this.matchpaymentsManager.matchpaydelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.matchPayment.length; i++) {
				if (this.matchPayment[i].id == params.data.id) {
					this.matchPayment?.splice(i, 1);
					break;
				}
			}
			const selectedRows = params.api.getSelectedRows();
			params.api.applyTransaction({ remove: selectedRows });
			this.calloutService.showSuccess("Order Removed Successfully");
		})
	}

	onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Match Payments With Invoices";
		modalRef.componentInstance.details = params.data;
    }
	
	onFirstDataRendered(params: any) {
		params.api.sizeColumnsToFit();
	}

	private markFormGroupTouched(formGroup: FormGroup) {
		(<any>Object).values(formGroup.controls).forEach((control: any) => {
			control.markAsTouched();
			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}

	onOrderClick(event: any, matchForm: any) {

		this.markFormGroupTouched(this.matchForm);
		this.submitted = true;
		if (this.matchForm.invalid) {
			return;
		}
		let matchpayment001mb = new Matchpayment001mb();
		matchpayment001mb.fromdate = new Date(this.f.fromdate.value);
		matchpayment001mb.todate = new Date(this.f.todate.value);
		matchpayment001mb.allocatedamount = this.f.allocatedamount.value ? this.f.allocatedamount.value : "";
		matchpayment001mb.amount = this.f.amount.value ? this.f.amount.value : "";
		matchpayment001mb.bankorcashaccount = this.f.bankorcashaccount.value ? this.f.bankorcashaccount.value : "";
		matchpayment001mb.company = this.f.company.value ? this.f.company.value : "";
		matchpayment001mb.invoiceNumber = this.f.invoiceNumber.value ? this.f.invoiceNumber.value : 0;
		matchpayment001mb.maximuminvoiceamount = this.f.maximuminvoiceamount.value ? this.f.maximuminvoiceamount.value : 0;
		matchpayment001mb.minimuminvoiceamount = this.f.minimuminvoiceamount.value ? this.f.minimuminvoiceamount.value : 0;
		matchpayment001mb.party = this.f.party.value ? this.f.party.value : "";
		matchpayment001mb.partytype = this.f.partytype.value ? this.f.partytype.value : "";
		matchpayment001mb.receivableorpayableaccount = this.f.receivableorpayableaccount.value ? this.f.receivableorpayableaccount.value : "";
		matchpayment001mb.refName = this.f.refName.value ? this.f.refName.value : "";
		if (this.id) {
			matchpayment001mb.id = this.id;
			matchpayment001mb.insertUser = this.insertUser;
			matchpayment001mb.insertDatetime = this.insertDatetime;
			matchpayment001mb.updatedUser = this.authManager.getcurrentUser.username;
			matchpayment001mb.updatedDatetime = new Date();
			this.matchpaymentsManager.matchpayupdate(matchpayment001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let matchpaymentsres = deserialize<Matchpayment001mb>(Matchpayment001mb, response);
				for (let bankpayment of this.matchPayment) {
					if (bankpayment.id == matchpaymentsres.id) {
						bankpayment.allocatedamount = matchpaymentsres.allocatedamount;
						bankpayment.amount = matchpaymentsres.amount;
						bankpayment.bankorcashaccount = matchpaymentsres.bankorcashaccount;
						bankpayment.fromdate = matchpaymentsres.fromdate;
						bankpayment.company = matchpaymentsres.company;
						bankpayment.invoiceNumber = matchpaymentsres.invoiceNumber;
						bankpayment.maximuminvoiceamount = matchpaymentsres.maximuminvoiceamount;
						bankpayment.minimuminvoiceamount = matchpaymentsres.minimuminvoiceamount;
						bankpayment.party = matchpaymentsres.party;
						bankpayment.partytype = matchpaymentsres.partytype;
						bankpayment.receivableorpayableaccount = matchpaymentsres.receivableorpayableaccount;
						bankpayment.refName = matchpaymentsres.refName;
						bankpayment.todate = matchpaymentsres.todate;
						bankpayment.insertUser = this.insertUser;
						bankpayment.insertDatetime = this.insertDatetime;
						bankpayment.updatedUser = this.authManager.getcurrentUser.username;
						bankpayment.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.matchPayment);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.id = null;
				this.matchForm.reset();
				this.submitted = false;
			})
		}
		else {
			matchpayment001mb.insertUser = this.authManager.getcurrentUser.username;
			matchpayment001mb.insertDatetime = new Date();
			this.matchpaymentsManager.matchpaysave(matchpayment001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let matchpay = deserialize<Matchpayment001mb>(Matchpayment001mb, response);
				this.matchPayment?.push(matchpay);
				const newItems = [JSON.parse(JSON.stringify(matchpay))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.matchForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.matchForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.matchpaymentsManager.matchpaymentsPdf().subscribe((response) =>{
            saveAs(response,"ReconciledPaymentDetails");

		});
	}

	onGenerateExcelReport(){
		this.matchpaymentsManager.matchpaymentsExcel().subscribe((response) => {
			saveAs(response,"ReconciledPaymentDetails");
        })
	}

}
