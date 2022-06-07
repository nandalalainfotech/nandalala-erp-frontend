import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { TrailBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/trail-balance.service';
import { Trialbalance001mb } from 'src/app/shared/services/restcontroller/entities/Trialbalance001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-trial-balance',
	templateUrl: './trial-balance.component.html',
	styleUrls: ['./trial-balance.component.css']
})

export class TrialBalanceComponent implements OnInit {
	trialBalanceForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	id: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	account: string = "";
	openingcr?: number | any;
	openingdr?: number | any;
	closingcr?:number | any;
	closingdr?: number | any;
	credit?: number | any;
	debit?: number | any;
	trials: Trialbalance001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private trailBalanceManager: TrailBalanceManager, 
		private formBuilder: FormBuilder, 
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent,
		}
	}

	ngOnInit() {
		this.trialBalanceForm = this.formBuilder.group({
			account: ['', Validators.required],
			openingcr: ['', Validators.required],
			openingdr: ['', Validators.required],
			closingcr: ['', Validators.required],
			closingdr: ['', Validators.required],
			credit: ['', Validators.required],
			debit: ['', Validators.required]
		});

		this.createDataGrid001();
		this.trailBalanceManager.alltrial().subscribe((response) => {
			this.trials = deserialize<Trialbalance001mb[]>(Trialbalance001mb, response);
			if (this.trials.length > 0) {
				this.gridOptions?.api?.setRowData(this.trials);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.trialBalanceForm.controls; }

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
				headerName: 'Account',
				field: 'account',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Opening(Dr)',
				field: 'openingdr',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Opening(Cr)',
				field: 'openingcr',
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
				headerName: 'Closing(Dr)',
				field: 'closingdr',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Closing(Cr)',
				field: 'closingcr',
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
				width: 155,
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
                width: 150,
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
		this.trialBalanceForm.patchValue({
			'account': params.data.account,
			'openingcr': params.data.openingcr,
			'openingdr': params.data.openingdr,
			'closingcr': params.data.closingcr,
			'closingdr': params.data.closingdr,
			'credit': params.data.credit,
			'debit': params.data.debit
		});
	}

	onDeleteButtonClick(params: any) {
		this.trailBalanceManager.trialdelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.trials.length; i++) {
				if (this.trials[i].id == params.data.id) {
					this.trials?.splice(i, 1);
					break;
				}
			}
			const selectedRows = params.api.getSelectedRows();
			params.api.applyTransaction({ remove: selectedRows });
			this.calloutService.showSuccess("Order Removed Successfully");
		});
	}

	onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Trial Balance";
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

	onOrderClick(event: any, trialBalanceForm: any) {
		this.markFormGroupTouched(this.trialBalanceForm);
		this.submitted = true;
		if (this.trialBalanceForm.invalid) {
			return;
		}

		let trialbalance001mb = new Trialbalance001mb();
		trialbalance001mb.account = this.f.account.value ? this.f.account.value : "";
		trialbalance001mb.closingcr = this.f.closingcr.value ? this.f.closingcr.value : null;
		trialbalance001mb.closingdr = this.f.closingdr.value ? this.f.closingdr.value : null;
		trialbalance001mb.credit = this.f.credit.value ? this.f.credit.value : null;
		trialbalance001mb.debit = this.f.debit.value ? this.f.debit.value : null;
		trialbalance001mb.openingcr = this.f.openingcr.value ? this.f.openingcr.value : null;
		trialbalance001mb.openingdr = this.f.openingdr.value ? this.f.openingdr.value : null;
		if (this.id) {
			trialbalance001mb.id = this.id;
			trialbalance001mb.insertUser = this.insertUser;
			trialbalance001mb.insertDatetime = this.insertDatetime;
			trialbalance001mb.updatedUser = this.authManager.getcurrentUser.username;
			trialbalance001mb.updatedDatetime = new Date();
			this.trailBalanceManager.trialupdate(trialbalance001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let trailbalanceres = deserialize<Trialbalance001mb>(Trialbalance001mb, response);
				for (let trailblnce of this.trials) {
					if (trailblnce.id == trailbalanceres.id) {
						trailblnce.account = trailbalanceres.account;
						trailblnce.closingcr = trailbalanceres.closingcr;
						trailblnce.closingdr = trailbalanceres.closingdr;
						trailblnce.credit = trailbalanceres.credit;
						trailblnce.debit = trailbalanceres.debit;
						trailblnce.openingcr = trailbalanceres.openingcr;
						trailblnce.openingdr = trailbalanceres.openingdr;
						trailblnce.insertUser = this.insertUser;
						trailblnce.insertDatetime = this.insertDatetime;
						trailblnce.updatedUser = this.authManager.getcurrentUser.username;
						trailblnce.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.trials);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.trialBalanceForm.reset();
				this.id = null;
				this.submitted = false;
			})
		}
		else {
			trialbalance001mb.insertUser = this.authManager.getcurrentUser.username;
			trialbalance001mb.insertDatetime = new Date();
			this.trailBalanceManager.trialsave(trialbalance001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let trialbal = deserialize<Trialbalance001mb>(Trialbalance001mb, response);
				this.trials?.push(trialbal);
				const newItems = [JSON.parse(JSON.stringify(trialbal))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.trialBalanceForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.trialBalanceForm.reset();
	}

	onGeneratePdfReport(){
		this.trailBalanceManager.trailBalancePdf().subscribe((response) =>{
            saveAs(response,"TrialBalanceList");

		});
	}

	onGenerateExcelReport(){
		this.trailBalanceManager.trailBalanceExcel().subscribe((response) => {
			saveAs(response,"TrialBalanceList");
        })
	}


}
