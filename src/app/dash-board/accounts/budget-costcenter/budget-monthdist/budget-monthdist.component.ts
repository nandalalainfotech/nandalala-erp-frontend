import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BudgetMonthDistManager } from 'src/app/shared/services/restcontroller/bizservice/budget-monthdist.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Budgetaccounttype001mb } from 'src/app/shared/services/restcontroller/entities/Budgetaccounttype001mb';
import { Budgetmonthdist001mb } from 'src/app/shared/services/restcontroller/entities/Budgetmonthdist001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';


@Component({
	selector: 'app-budget-monthdist',
	templateUrl: './budget-monthdist.component.html',
	styleUrls: ['./budget-monthdist.component.css']
})

export class BudgetMonthdistComponent implements OnInit {

	frameworkComponents: any;
	budgetMonthForm: FormGroup | any;
	submitted = false;
	bmdId: number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	distName: string = "";
	fiscalYear: string = "";
	respMonth: string = "";
	percentAllocate: string | null = "";
	fiscalname: string = "year.status";
	fiscaltype: string = "year";
	moname: string = "month.name";
	motype: string = "name";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	dummysystemproperties: Systemproperties001mb[] = [];
	mosystemproperties?: Systemproperties001mb[] = [];
	budgetMonths: Budgetmonthdist001mb[] = [];
	public gridOptions: GridOptions | any;
	fiscalsystemproperties: Systemproperties001mb[] = [];

	constructor(private budgetMonthDistManager: BudgetMonthDistManager,
		private systemPropertiesService: SystemPropertiesService,
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.budgetMonthForm = this.formBuilder.group({
			distName: ['', Validators.required],
			fiscalYear: ['', Validators.required],
			respMonth: ['', Validators.required],
			percentAllocate: ['', Validators.required]
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.fiscalname, this.fiscaltype).subscribe(response => {
			this.fiscalsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		}),
		this.systemPropertiesService.system(this.moname, this.motype).subscribe(response => {
			this.mosystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);

		})
		this.budgetMonthDistManager.allbudmon().subscribe((response) => {
			this.budgetMonths = deserialize<Budgetmonthdist001mb[]>(Budgetmonthdist001mb, response);
			if (this.budgetMonths.length > 0) {
				this.gridOptions?.api?.setRowData(this.budgetMonths);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRendered: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: '#ID',
				field: 'bmdId',
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
				headerName: 'Distribution Name',
				field: 'distName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Year',
				field: 'fiscalYear',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Month',
				field: 'respMonth',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Percentage Allocated',
				field: 'percentAllocate',
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
		this.bmdId = params.data.bmdId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.budgetMonthForm.patchValue({
			'distName': params.data.distName,
			'fiscalYear': params.data.fiscalYear,
			'percentAllocate': params.data.percentAllocate,
			'respMonth': params.data.respMonth,
		});
	}
	get f() { return this.budgetMonthForm.controls; }
	onDeleteButtonClick(params: any) {
		this.budgetMonthDistManager.budmondelete(params.data.bmdId).subscribe((response) => {
			for (let i = 0; i < this.budgetMonths.length; i++) {
				if (this.budgetMonths[i].bmdId == params.data.bmdId) {
					this.budgetMonths?.splice(i, 1);
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
		modalRef.componentInstance.title = "Budget Monthly Distribution";
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

	onOrderClick(event: any, budgetMonthForm: any) {
		this.markFormGroupTouched(this.budgetMonthForm);
		this.submitted = true;
		if (this.budgetMonthForm.invalid) {
			return;
		}
		let budgetmonthdist001mb = new Budgetmonthdist001mb();
		budgetmonthdist001mb.distName = this.f.distName.value ? this.f.distName.value : "";
		budgetmonthdist001mb.fiscalYear = this.f.fiscalYear.value ? this.f.fiscalYear.value : "";
		budgetmonthdist001mb.percentAllocate = this.f.percentAllocate.value ? this.f.percentAllocate.value : "";
		budgetmonthdist001mb.respMonth = this.f.respMonth.value ? this.f.respMonth.value : "";
		if (this.bmdId) {
			budgetmonthdist001mb.bmdId = this.bmdId;
			budgetmonthdist001mb.insertUser = this.insertUser;
			budgetmonthdist001mb.insertDatetime = this.insertDatetime;
			budgetmonthdist001mb.updatedUser = this.authManager.getcurrentUser.username;
			budgetmonthdist001mb.updatedDatetime = new Date();
			this.budgetMonthDistManager.budmonupdate(budgetmonthdist001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let budget = deserialize<Budgetmonthdist001mb>(Budgetaccounttype001mb, response);
				for (let monthdist of this.budgetMonths) {
					if (monthdist.bmdId == budget.bmdId) {
						monthdist.distName = budget.distName;
						monthdist.fiscalYear = budget.fiscalYear;
						monthdist.percentAllocate = budget.percentAllocate;
						monthdist.respMonth = budget.respMonth;
						monthdist.insertUser = this.insertUser;
						monthdist.insertDatetime = this.insertDatetime;
						monthdist.updatedUser = this.authManager.getcurrentUser.username;
						monthdist.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.budgetMonths);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				budgetMonthForm.reset();
				this.bmdId = null;
				this.submitted = false;
			})
		}
		else {
			budgetmonthdist001mb.insertUser = this.authManager.getcurrentUser.username;
			budgetmonthdist001mb.insertDatetime = new Date();
			this.budgetMonthDistManager.budmonsave(budgetmonthdist001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let budget = deserialize<Budgetmonthdist001mb>(Budgetaccounttype001mb, response);
				this.budgetMonths?.push(budget);
				const newItems = [JSON.parse(JSON.stringify(budget))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				budgetMonthForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.submitted = false;
		this.budgetMonthForm.reset();
	}

	onGeneratePdfReport(){
		this.budgetMonthDistManager.budgetMonthDistPdf().subscribe((response) =>{
            saveAs(response,"BudgetMonthlyDistribution");

		});
	}

	onGenerateExcelReport(){
		this.budgetMonthDistManager.budgetMonthDistExcel().subscribe((response) => {
			saveAs(response,"BudgetMonthlyDistribution");
        })
	}

}