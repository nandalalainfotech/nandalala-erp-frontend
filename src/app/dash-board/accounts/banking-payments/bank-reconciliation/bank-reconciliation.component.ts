import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BankreconcillationManager } from 'src/app/shared/services/restcontroller/bizservice/bankreconcillation.servicesa';
import { PayementEntryManager } from 'src/app/shared/services/restcontroller/bizservice/payement-entry.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Bankreconcile001mb } from 'src/app/shared/services/restcontroller/entities/Bankreconcile001mb';
import { Paymententry001mb } from 'src/app/shared/services/restcontroller/entities/Paymententry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-bank-reconciliation',
	templateUrl: './bank-reconciliation.component.html',
	styleUrls: ['./bank-reconciliation.component.css']
})

export class BankReconciliationComponent implements OnInit {

	frameworkComponents: any;
	bankrecId:number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	bankAccount: string = "";
	postingDate: Date | null = null;
	entrySeries: string = "";
	debit: string = "";
	credit: string = "";
	againstAccount: string = "";
	referenceName: string = "";
	referenceDate: Date | null = null;
	clearanceDate: Date | null = null;
	currency: string = "";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	baname="account.type";
	batype="type";
	dummysystemproperties: Systemproperties001mb[] = [];
	basystemproperties:Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	bankReconForm: FormGroup | any;
	submitted = false;
	reConciliation: Bankreconcile001mb[] = [];
	payments: Paymententry001mb[] = [];
	cuname: string = "currency.type";
	cutype: string = "type";
	cusystemproperties?: Systemproperties001mb[] = [];

	constructor(private bankreconcillationManager: BankreconcillationManager,
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

		this.bankReconForm = this.formBuilder.group({
			bankAccount: ['', Validators.required],
			postingDate: ['', Validators.required],
			entrySeries: ['', Validators.required],
			debit: ['', Validators.required],
			credit: ['', Validators.required],
			clearanceDate: ['', Validators.required],
			againstAccount: ['', Validators.required],
			referenceName: ['', Validators.required],
			referenceDate: ['', Validators.required],
			currency: ['', Validators.required]
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.baname, this.batype).subscribe(response => {
			this.basystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.cuname, this.cutype).subscribe(response => {
			this.cusystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.paymentrymanager.allpayentry().subscribe(response => {
            this.payments = deserialize<[Paymententry001mb]>(Paymententry001mb, response);

        });
		this.bankreconcillationManager.allreconciliation().subscribe((response) => {
			this.reConciliation = deserialize<Bankreconcile001mb[]>(Bankreconcile001mb, response);
			if (this.reConciliation.length > 0) {
				this.gridOptions?.api?.setRowData(this.reConciliation);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.bankReconForm.controls; }
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
				field: 'bankrecId',
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
				headerName: 'Bank',
				field: 'bankAccount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Posting Date',
				field: 'postingDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.postingDate ? this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy') : '';
                }
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
				headerName: 'Debit',
				field: 'debit',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Credit',
				field: 'credit',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
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
				headerName: 'Reference',
				field: 'referenceName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Reference Date',
				field: 'referenceDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.referenceDate ? this.datePipe.transform(params.data.referenceDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Clearance Date',
				field: 'clearanceDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.clearanceDate ? this.datePipe.transform(params.data.clearanceDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Currency',
				field: 'currency',
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
				width: 150,
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
				width: 180,
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
		this.bankrecId = params.data.bankrecId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.bankReconForm.patchValue({
			'bankAccount': params.data.bankAccount,
			'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
			'entrySeries': params.data.entrySeries,
			'debit': params.data.debit,
			'credit': params.data.credit,
			'againstAccount': params.data.againstAccount,
			'referenceName': params.data.referenceName,
			'referenceDate': this.datePipe.transform(params.data.referenceDate, 'MM/dd/yyyy'),
			'clearanceDate': this.datePipe.transform(params.data.clearanceDate, 'MM/dd/yyyy'),
			'currency': params.data.currency,
		});
	}
	onDeleteButtonClick(params: any) {
		this.bankreconcillationManager.reconciliationdelete(params.data.bankrecId).subscribe((response) => {
			for (let i = 0; i < this.reConciliation.length; i++) {
				if (this.reConciliation[i].bankrecId == params.data.bankrecId) {
					this.reConciliation?.splice(i, 1);
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
        modalRef.componentInstance.title = "Bank Reconciliation Statement";
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

	onOrderClick(event: any, bankReconForm: any) {
		this.markFormGroupTouched(this.bankReconForm);
		this.submitted = true;
		if (this.bankReconForm.invalid) {
			return;
		}

		let bankreconcile001mb = new Bankreconcile001mb();

		bankreconcile001mb.clearanceDate = new Date(this.f.clearanceDate.value);
		bankreconcile001mb.postingDate = new Date(this.f.postingDate.value);
		bankreconcile001mb.referenceDate = new Date(this.f.referenceDate.value);
		bankreconcile001mb.againstAccount = this.f.againstAccount.value ? this.f.againstAccount.value : "";
		bankreconcile001mb.bankAccount = this.f.bankAccount.value ? this.f.bankAccount.value : "";
		bankreconcile001mb.credit = this.f.credit.value ? this.f.credit.value : "";
		bankreconcile001mb.currency = this.f.currency.value ? this.f.currency.value : "";
		bankreconcile001mb.debit = this.f.debit.value ? this.f.debit.value : "";
		bankreconcile001mb.entrySeries = this.f.entrySeries.value ? this.f.entrySeries.value : "";
		bankreconcile001mb.referenceName = this.f.referenceName.value ? this.f.referenceName.value : "";
		if (this.bankrecId) {
			bankreconcile001mb.bankrecId =this.bankrecId;
			bankreconcile001mb.insertUser = this.insertUser;
			bankreconcile001mb.insertDatetime = this.insertDatetime;
			bankreconcile001mb.updatedUser = this.authManager.getcurrentUser.username;
			bankreconcile001mb.updatedDatetime = new Date();
			this.bankreconcillationManager.reconciliationupdate(bankreconcile001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let bankreconcillationres = deserialize<Bankreconcile001mb>(Bankreconcile001mb, response);
				for (let bnkrecon of this.reConciliation) {
					if (bnkrecon.bankrecId == bankreconcillationres.bankrecId) {
						bnkrecon.againstAccount = bankreconcillationres.againstAccount;
						bnkrecon.bankAccount = bankreconcillationres.bankAccount;
						bnkrecon.clearanceDate = bankreconcillationres.clearanceDate;
						bnkrecon.credit = bankreconcillationres.credit;
						bnkrecon.currency = bankreconcillationres.currency;
						bnkrecon.debit = bankreconcillationres.debit;
						bnkrecon.entrySeries = bankreconcillationres.entrySeries;
						bnkrecon.postingDate = bankreconcillationres.postingDate;
						bnkrecon.referenceDate = bankreconcillationres.referenceDate;
						bnkrecon.referenceName = bankreconcillationres.referenceName;
						bnkrecon.insertUser = this.insertUser;
						bnkrecon.insertDatetime = this.insertDatetime;
						bnkrecon.updatedUser = this.authManager.getcurrentUser.username;
						bnkrecon.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.reConciliation);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.bankReconForm.reset();
				this.submitted = false;
				this.bankrecId = null;
			})
		}
		else {
			bankreconcile001mb.insertUser = this.authManager.getcurrentUser.username;
			bankreconcile001mb.insertDatetime = new Date();
			this.bankreconcillationManager.reconciliationsave(bankreconcile001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let recon = deserialize<Bankreconcile001mb>(Bankreconcile001mb, response);
				this.reConciliation.push?.(recon);
				const newItems = [JSON.parse(JSON.stringify(recon))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.bankReconForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.bankReconForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.bankreconcillationManager.bankreconcillationPdf().subscribe((response) =>{
            saveAs(response,"BankReconciliationStatement");

		});
	}

	onGenerateExcelReport(){
		this.bankreconcillationManager.bankreconcillationExcel().subscribe((response) => {
			saveAs(response,"BankReconciliationStatement");
        })
	}

}