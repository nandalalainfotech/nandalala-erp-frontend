import { Component, OnInit } from '@angular/core';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Expensesclm001mb } from 'src/app/shared/services/restcontroller/entities/Expensesclm001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { deserialize } from 'serializer.ts/Serializer';
import { GridOptions } from 'ag-grid-community';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { ExpensesclmManager } from 'src/app/shared/services/restcontroller/bizservice/expenses.claims.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-expenses-claims',
	templateUrl: './expenses-claims.component.html',
	styleUrls: ['./expenses-claims.component.css']
})

export class ExpensesClaimsComponent implements OnInit {


	frameworkComponents: any;
	expensesForm: FormGroup | any;
	expclmId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	stname: string = "Recruit.OfferLetter";
	sttype: string = "OfferLetter";
	expname: string = "Expense.Type";
	exptype: string = "type";
	expCode: string | null = "";
	expType: string | null = "";
	status: string | null = "";
	totalclmAmt: number | any;
	submitted = false;
	expensesClm: Expensesclm001mb[] = [];
	statusproperties?: Systemproperties001mb[] = [];
	esystemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;


	constructor(private systemPropertiesService: SystemPropertiesService,
		private expensesclmManager: ExpensesclmManager,
		private calloutService: CalloutService,
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}


	ngOnInit() {
		this.createDataGrid001mb();
		this.expensesForm = this.formBuilder.group({
			status: ['', Validators.required],
			totalclmAmt: ['', Validators.required],
			expCode: ['', Validators.required],
			expType: ['', Validators.required]
		})
		this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
			this.statusproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.expname, this.exptype).subscribe(response => {
			this.esystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.expensesclmManager.allexpenses().subscribe((response) => {
			this.expensesClm = deserialize<Expensesclm001mb[]>(Expensesclm001mb, response);
			if (this.expensesClm.length > 0) {
				this.gridOptions?.api?.setRowData(this.expensesClm);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.expensesForm.controls }


	createDataGrid001mb(): void {
		this.gridOptions = {
			pagintionPageSize: 10,
			rowSelection: 'single',
			onFirstDataRendered: this.onFirstDataRendered.bind(this),
		}
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: '#ID',
				field: 'expclmId',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilterOnly: true,
				checkboxSelection: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Status',
				field: 'status',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Claim Amount',
				field: 'totalclmAmt',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Expense Code',
				field: 'expCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Expense Type',
				field: 'expType',
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
				width: 60,
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
				width: 85,
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
                width: 80,
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
		this.expclmId = params.data.expclmId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.expensesForm.patchValue({
			'status': params.data.status,
			'totalclmAmt': params.data.totalclmAmt,
			'expCode': params.data.expCode,
			'expType': params.data.expType
		});
	}


	onDeleteButtonClick(params: any) {
		this.expensesclmManager.deleteexpenses(params.data.expclmId).subscribe((response) => {
			for (let i = 0; i < this.expensesClm.length; i++) {
				if (this.expensesClm[i].expclmId == params.data.expclmId) {
					this.expensesClm?.splice(i, 1);
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
        modalRef.componentInstance.title = "Expenses Claims";
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

	onOrderClick(event: any, expensesForm: any) {
		this.markFormGroupTouched(this.expensesForm);
		this.submitted = true;
		if (this.expensesForm.invalid) {
			return;
		}
		let expensesclm001mb = new Expensesclm001mb();
		expensesclm001mb.status = this.f.status.value ? this.f.status.value : "";
		expensesclm001mb.totalclmAmt = this.f.totalclmAmt.value ? this.f.totalclmAmt.value : null;
		expensesclm001mb.expCode = this.f.expCode.value ? this.f.expCode.value : "";
		expensesclm001mb.expType = this.f.expType.value ? this.f.expType.value : "";
		if (this.expclmId) {
			expensesclm001mb.expclmId = this.expclmId;
			expensesclm001mb.insertUser = this.insertUser;
            expensesclm001mb.insertDatetime = this.insertDatetime;
            expensesclm001mb.updatedUser = this.authManager.getcurrentUser.username;
            expensesclm001mb.updatedDatetime = new Date();
			this.expensesclmManager.updateexpenses(expensesclm001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let claim = deserialize<Expensesclm001mb>(Expensesclm001mb, response);
				for (let expensesClaim of this.expensesClm) {
					if (expensesClaim.expclmId == claim.expclmId) {
						expensesClaim.status = claim.status;
						expensesClaim.totalclmAmt = claim.totalclmAmt;
						expensesClaim.expCode = claim.expCode;
						expensesClaim.expType = claim.expType;
						expensesClaim.insertUser = this.insertUser;
						expensesClaim.insertDatetime = this.insertDatetime;
						expensesClaim.updatedUser = this.authManager.getcurrentUser.username;
						expensesClaim.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.expensesClm);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.expensesForm.reset();
				this.submitted = false;
				this.expclmId = null;
			});
		}
		else {
			expensesclm001mb.insertUser = this.authManager.getcurrentUser.username;
            expensesclm001mb.insertDatetime = new Date();
			this.expensesclmManager.saveexpenses(expensesclm001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let claim = deserialize<Expensesclm001mb>(Expensesclm001mb, response);
				this.expensesClm.push(claim);
				const newItems = [JSON.parse(JSON.stringify(claim))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.expensesForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.expensesForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.expensesclmManager.expensesclmPdf().subscribe((response) =>{
            saveAs(response,"ExpenseClaimList");

		});
	}

	onGenerateExcelReport(){
		this.expensesclmManager.expensesclmExcel().subscribe((response) => {
			saveAs(response,"ExpenseClaimList");
        })
	}
}