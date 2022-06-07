import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BudgetManager } from 'src/app/shared/services/restcontroller/bizservice/budget.service';
import { CostCenterManager } from 'src/app/shared/services/restcontroller/bizservice/costcenter.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Budget001mb } from 'src/app/shared/services/restcontroller/entities/Budget001mb';
import { Costcenter001mb } from 'src/app/shared/services/restcontroller/entities/Costcenter001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-budget',
	templateUrl: './budget.component.html',
	styleUrls: ['./budget.component.css']
})

export class BudgetComponent implements OnInit {

	frameworkComponents: any;
	submitted = false;
	budgetForm: FormGroup | any;
	bgId:number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	budgetName: string = "";
	docStatus: string = "";
	centerName: string = "";
	actifannualbgexceed: string = "";
	actifmonthbgexceed: string = "";
	fiscalYear: string = "";
	company: string = "";
	bgaccountType: string = "";
	bgAmount?: string | null;
	dummyname = "Dummy.status";
	dummytype = "dummy";
	fiscalname: string = "year.status";
	fiscaltype: string = "year";
	aname = "exceed.type";
	atype = "type";
	public gridOptions: GridOptions | any;
	dummysystemproperties: Systemproperties001mb[] = [];
	asystemproperties:Systemproperties001mb[] = [];
	costcenter:Costcenter001mb[]=[];
	budgets: Budget001mb[] = [];
	fiscalsystemproperties: Systemproperties001mb[] = [];

	constructor(private budgetManager: BudgetManager,
		private systemPropertiesService: SystemPropertiesService,
		private costCenterManager: CostCenterManager,
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.budgetForm = this.formBuilder.group({
			budgetName: ['', Validators.required],
			docStatus: ['', Validators.required],
			centerName: ['', Validators.required],
			actifannualbgexceed: ['', Validators.required],
			actifmonthbgexceed: ['', Validators.required],
			fiscalYear: ['', Validators.required],
			company: ['', Validators.required],
			bgaccountType: ['', Validators.required],
			bgAmount: ['', Validators.required]
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		}),
			this.systemPropertiesService.system(this.fiscalname, this.fiscaltype).subscribe(response => {
				this.fiscalsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
			}),
		this.systemPropertiesService.system(this.aname, this.atype).subscribe(response => {
			this.asystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.createDataGrid001();
        this.costCenterManager.allcostcenter().subscribe((response) => {
            this.costcenter = deserialize<Costcenter001mb[]>(Costcenter001mb, response);
        })
		this.budgetManager.allbudget().subscribe((response) => {
			this.budgets = deserialize<Budget001mb[]>(Budget001mb, response);
			if (this.budgets.length > 0) {
				this.gridOptions?.api?.setRowData(this.budgets);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.budgetForm.controls; }
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
				field: 'bgId',
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
				headerName: 'Name',
				field: 'budgetName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Document Status',
				field: 'docStatus',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Cost Center',
				field: 'centerName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Act if Annual Budget Exceed',
				field: 'actifannualbgexceed',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Act if Monthly Budget Exceed',
				field: 'actifmonthbgexceed',
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
				headerName: 'Budget Account',
				field: 'bgaccountType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Amount',
				field: 'bgAmount',
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
		this.bgId = params.data.bgId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.budgetForm.patchValue({
			'actifannualbgexceed': params.data.actifannualbgexceed,
			'actifmonthbgexceed': params.data.actifmonthbgexceed,
			'selectorder': params.data.status,
			'bgAmount': params.data.bgAmount,
			'bgaccountType': params.data.bgaccountType,
			'budgetName': params.data.budgetName,
			'centerName': params.data.centerName,
			'company': params.data.company,
			'docStatus': params.data.docStatus,
			'fiscalYear': params.data.fiscalYear
		});
	}

	onDeleteButtonClick(params: any) {
		this.budgetManager.budgeetdelete(params.data.bgId).subscribe((response) => {
			for (let i = 0; i < this.budgets.length; i++) {
				if (this.budgets[i].bgId == params.data.bgId) {
					this.budgets?.splice(i, 1);
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
        modalRef.componentInstance.title = "Budget";
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
	onOrderClick(event: any, budgetForm: any) {
		this.markFormGroupTouched(this.budgetForm);
		this.submitted = true;
		if (this.budgetForm.invalid) {
			return;
		}
		let budget001mb = new Budget001mb();
		budget001mb.actifannualbgexceed = this.f.actifannualbgexceed.value ? this.f.actifannualbgexceed.value : "";
		budget001mb.actifmonthbgexceed = this.f.actifmonthbgexceed.value ? this.f.actifmonthbgexceed.value : "";
		budget001mb.bgAmount = this.f.bgAmount.value ? this.f.bgAmount.value : "";
		budget001mb.bgaccountType = this.f.bgaccountType.value ? this.f.bgaccountType.value : "";
		budget001mb.budgetName = this.f.budgetName.value ? this.f.budgetName.value : "";
		budget001mb.centerName = this.f.centerName.value ? this.f.centerName.value : "";
		budget001mb.company = this.f.company.value ? this.f.company.value : "";
		budget001mb.docStatus = this.f.docStatus.value ? this.f.docStatus.value : "";
		budget001mb.fiscalYear = this.f.fiscalYear.value ? this.f.fiscalYear.value : "";
		if (this.bgId) {
			budget001mb.bgId = this.bgId;
			budget001mb.insertUser = this.insertUser;
			budget001mb.insertDatetime = this.insertDatetime;
			budget001mb.updatedUser = this.authManager.getcurrentUser.username;
			budget001mb.updatedDatetime = new Date();
			this.budgetManager.budgetupdate(budget001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let bud = deserialize<Budget001mb>(Budget001mb, response);
				for (let bdget of this.budgets) {
					if (bdget.bgId == bud.bgId) {
						bdget.budgetName = bud.budgetName;
						bdget.docStatus = bud.docStatus;
						bdget.centerName = bud.centerName;
						bdget.actifannualbgexceed = bud.actifannualbgexceed;
						bdget.actifmonthbgexceed = bud.actifmonthbgexceed;
						bdget.fiscalYear = bud.fiscalYear;
						bdget.company = bud.company;
						bdget.bgaccountType = bud.bgaccountType;
						bdget.bgAmount = bud.bgAmount;
						bdget.insertUser = this.insertUser;
						bdget.insertDatetime = this.insertDatetime;
						bdget.updatedUser = this.authManager.getcurrentUser.username;
						bdget.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.budgets);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				budgetForm.reset();
				this.bgId = null;
				this.submitted = false;
			})
		}
		else {
			budget001mb.insertUser = this.authManager.getcurrentUser.username;
			budget001mb.insertDatetime = new Date();
			this.budgetManager.budgetsave(budget001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let bud = deserialize<Budget001mb>(Budget001mb, response);
				this.budgets?.push(bud);
				const newItems = [JSON.parse(JSON.stringify(bud))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				budgetForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.submitted = false;
		this.budgetForm.reset();
	}

	onGeneratePdfReport(){
		this.budgetManager.budgetPdf().subscribe((response) =>{
            saveAs(response,"BudgetList");

		});
	}

	onGenerateExcelReport(){
		this.budgetManager.budgetExcel().subscribe((response) => {
			saveAs(response,"BudgetList");
        })
	}

}