import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BankClearenceManager } from 'src/app/shared/services/restcontroller/bizservice/bankclearence.service';
import { PayementEntryManager } from 'src/app/shared/services/restcontroller/bizservice/payement-entry.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Bankclearance001mb } from 'src/app/shared/services/restcontroller/entities/Bankclearance001mb';
import { Paymententry001mb } from 'src/app/shared/services/restcontroller/entities/Paymententry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-bank-clearance',
	templateUrl: './bank-clearance.component.html',
	styleUrls: ['./bank-clearance.component.css']
})

export class BankClearanceComponent implements OnInit {

	frameworkComponents: any;
	bankclrId: number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	fromDate: Date | null = null; 
	toDate: Date | null = null;
	bankAccount: string = "";
	payDocument: string = "";
	entrySeries: string = "";
	chequeref: string = "";
	clearanceDate: Date | null = null;
	againstAccount: string = "";
	amount?: string | null;
	dummyname = "Dummy.status";
	dummytype = "dummy";
	baname="account.type";
	batype="type";
	dummysystemproperties: Systemproperties001mb[] = [];
	basystemproperties:Systemproperties001mb[] = [];
	payments: Paymententry001mb[] = [];
	bankForm: FormGroup | any;
	submitted = false;
	public gridOptions: GridOptions | any;
	clearance: Bankclearance001mb[] = [];

	constructor(private bankClearenceManager: BankClearenceManager, 
		private datePipe: DatePipe,
		private formBuilder: FormBuilder, 
		private systemPropertiesService: SystemPropertiesService, 
		private calloutService: CalloutService,
		private paymentrymanager:PayementEntryManager,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer:IconRendererComponent
		}
	}

	ngOnInit() {

		this.bankForm = this.formBuilder.group({
			fromDate: ['', Validators.required],
			toDate: ['', Validators.required],
			bankAccount: ['', Validators.required],
			payDocument: ['', Validators.required],
			entrySeries: ['', Validators.required],
			chequeref: ['', Validators.required],
			clearanceDate: ['', Validators.required],
			againstAccount: ['', Validators.required],
			amount: ['', Validators.required]
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.baname, this.batype).subscribe(response => {
			this.basystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.paymentrymanager.allpayentry().subscribe(response => {
            this.payments = deserialize<[Paymententry001mb]>(Paymententry001mb, response);
        });
		this.bankClearenceManager.allclearance().subscribe((response) => {
			this.clearance = deserialize<Bankclearance001mb[]>(Bankclearance001mb, response);
			if (this.clearance.length > 0) {
				this.gridOptions?.api?.setRowData(this.clearance);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.bankForm.controls; }
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
				field: 'bankclrId',
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
				headerName: 'From Date',
				field: 'fromDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.fromDate ? this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'To Date',
				field: 'toDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.toDate ? this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Bank Account',
				field: 'bankAccount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Payment Document',
				field: 'payDocument',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Payment Entry',
				field: 'entrySeries',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Cheque Reference',
				field: 'chequeref',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Clearance Date',
				field: 'clearanceDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				suppressSizeToFit: true,
				resizable: true,
				valueGetter: (params: any) => {
                    return params.data.clearanceDate ? this.datePipe.transform(params.data.clearanceDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Against Account',
				field: 'againstAccount',
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
				width: 200,
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
                width: 155,
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
		this.bankclrId = params.data.bankclrId
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.bankForm.patchValue({
			'fromDate': this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
			'toDate': this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy'),
			'bankAccount': params.data.bankAccount,
			'payDocument': params.data.payDocument,
			'entrySeries': params.data.entrySeries,
			'chequeref': params.data.chequeref,
			'clearanceDate': this.datePipe.transform(params.data.clearanceDate, 'MM/dd/yyyy'),
			'againstAccount': params.data.againstAccount,
			'amount': params.data.amount,
		});
	}
	onDeleteButtonClick(params: any) {
		this.bankClearenceManager.clearancedelete(params.data.bankclrId).subscribe((response) => {
			for (let i = 0; i < this.clearance.length; i++) {
				if (this.clearance[i].bankclrId == params.data.bankclrId) {
					this.clearance?.splice(i, 1);
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
		modalRef.componentInstance.title = "Bank Clearance Summary";
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

	onOrderClick(event: any, bankForm: any) {

		this.markFormGroupTouched(this.bankForm);
		this.submitted = true;
		if (this.bankForm.invalid) {
			return;
		}

		let bankclearance001mb = new Bankclearance001mb();

		bankclearance001mb.clearanceDate = new Date(this.f.clearanceDate.value);
		bankclearance001mb.toDate = new Date(this.f.toDate.value);
		bankclearance001mb.fromDate = new Date(this.f.fromDate.value);
		bankclearance001mb.againstAccount = this.f.againstAccount.value ? this.f.againstAccount.value : "";
		bankclearance001mb.amount = this.f.amount.value ? this.f.amount.value : "";
		bankclearance001mb.bankAccount = this.f.bankAccount.value ? this.f.bankAccount.value : "";
		bankclearance001mb.chequeref = this.f.chequeref.value ? this.f.chequeref.value : "";
		bankclearance001mb.entrySeries = this.f.entrySeries.value ? this.f.entrySeries.value : "";
		bankclearance001mb.payDocument = this.f.payDocument.value ? this.f.payDocument.value : "";
		if (this.bankclrId) {
			bankclearance001mb.bankclrId = this.bankclrId;
			bankclearance001mb.insertUser = this.insertUser;
			bankclearance001mb.insertDatetime = this.insertDatetime;
			bankclearance001mb.updatedUser = this.authManager.getcurrentUser.username;
			bankclearance001mb.updatedDatetime = new Date();
			this.bankClearenceManager.clearanceupdate(bankclearance001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let bankclearence = deserialize<Bankclearance001mb>(Bankclearance001mb, response);
				for (let bnkclearenns of this.clearance) {
					if (bnkclearenns.bankclrId == bankclearence.bankclrId) {
						bnkclearenns.againstAccount = bankclearence.againstAccount;
						bnkclearenns.amount = bankclearence.amount;
						bnkclearenns.bankAccount = bankclearence.bankAccount;
						bnkclearenns.chequeref = bankclearence.chequeref;
						bnkclearenns.clearanceDate = bankclearence.clearanceDate;
						bnkclearenns.entrySeries = bankclearence.entrySeries;
						bnkclearenns.fromDate = bankclearence.fromDate;
						bnkclearenns.payDocument = bankclearence.payDocument;
						bnkclearenns.toDate = bankclearence.toDate;
						bnkclearenns.insertUser = this.insertUser;
						bnkclearenns.insertDatetime = this.insertDatetime;
						bnkclearenns.updatedUser = this.authManager.getcurrentUser.username;
						bnkclearenns.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.clearance);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.bankForm.reset();
				this.submitted = false;
				this.bankclrId = null;
			})
		}
		else {
			bankclearance001mb.insertUser = this.authManager.getcurrentUser.username;
			bankclearance001mb.insertDatetime = new Date();
			this.bankClearenceManager.clearancesave(bankclearance001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let clear = deserialize<Bankclearance001mb>(Bankclearance001mb, response);
				this.clearance?.push(clear);
				const newItems = [JSON.parse(JSON.stringify(clear))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.bankForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.bankForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.bankClearenceManager.bankClearencePdf().subscribe((response) =>{
            saveAs(response,"BankClearanceStatement");

		});
	}

	onGenerateExcelReport(){
		this.bankClearenceManager.bankClearenceExcel().subscribe((response) => {
			saveAs(response,"BankClearanceStatement");
        })
	}

}
