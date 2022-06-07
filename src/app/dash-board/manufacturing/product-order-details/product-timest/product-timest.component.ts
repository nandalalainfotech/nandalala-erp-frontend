import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdTimeManager } from 'src/app/shared/services/restcontroller/bizservice/prod-time.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Prodtimesheet001mb } from 'src/app/shared/services/restcontroller/entities/Prodtimesheet001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-product-timest',
	templateUrl: './product-timest.component.html',
	styleUrls: ['./product-timest.component.css']
})

export class ProductTimestComponent implements OnInit {

	prodTimestForm: FormGroup | any;
	submitted = false;
	prtId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	frameworkComponents: any;
	empName: string = "";
	tsName: string = "";
	status: string = "";
	empCompany: string = "";
	twhrs: string = "";
	name: string = "ProdOrder.status";
	type: string = "status";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	dummysystemproperties: Systemproperties001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	ProdTimeSheet: Prodtimesheet001mb[] = [];
	public gridOptions: GridOptions | any;


	constructor(private prodTimeManager: ProdTimeManager,
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
		this.prodTimestForm = this.formBuilder.group({
			empCompany: ['', Validators.required],
			empName: ['', Validators.required],
			status: ['', Validators.required],
			tsName: ['', Validators.required],
			twhrs: ['', Validators.required]
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.prodTimeManager.alltimesheet().subscribe(response => {
			this.ProdTimeSheet = deserialize<Prodtimesheet001mb[]>(Prodtimesheet001mb, response)
			if (this.ProdTimeSheet.length > 0) {
				this.gridOptions?.api?.setRowData(this.ProdTimeSheet);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.prodTimestForm.controls; }

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
				field: 'prtId',
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
				headerName: 'Employee Name',
				field: 'empName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,

			},
			{
				headerName: 'Company',
				field: 'empCompany',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'TimeSheet Name',
				field: 'tsName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
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
				headerName: 'Total Working Hours',
				field: 'twhrs',
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
				width: 100,
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
				width: 105,
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
				width: 100,
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
		this.prtId = params.data.prtId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.prodTimestForm.patchValue({
			'empCompany': params.data.empCompany,
			'empName': params.data.empName,
			'status': params.data.status,
			'tsName': params.data.tsName,
			'twhrs': params.data.twhrs,
		});
	}

	onDeleteButtonClick(params: any) {
		this.prodTimeManager.timestdelete(params.data.prtId).subscribe((response) => {
			for (let i = 0; i < this.ProdTimeSheet.length; i++) {
				if (this.ProdTimeSheet[i].prtId == params.data.prtId) {
					this.ProdTimeSheet?.splice(i, 1);
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
        modalRef.componentInstance.title = "Product TimeSheet";
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
	onOrderClick(event: any, prodTimestForm: any) {
		this.markFormGroupTouched(this.prodTimestForm);
		this.submitted = true;
		if (this.prodTimestForm.invalid) {
			return;
		}
		let prodtimest = new Prodtimesheet001mb();
		prodtimest.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
		prodtimest.empName = this.f.empName.value ? this.f.empName.value : "";
		prodtimest.status = this.f.status.value ? this.f.status.value : "";
		prodtimest.tsName = this.f.tsName.value ? this.f.tsName.value : "";
		prodtimest.twhrs = this.f.twhrs.value ? this.f.twhrs.value : "";
		if (this.prtId) {
			prodtimest.prtId = this.prtId;
			prodtimest.insertUser = this.insertUser;
			prodtimest.insertDatetime = this.insertDatetime;
			prodtimest.updatedUser = this.authManager.getcurrentUser.username;
			prodtimest.updatedDatetime = new Date();
			this.prodTimeManager.timestupdate(prodtimest).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let prodtimes = deserialize<Prodtimesheet001mb>(Prodtimesheet001mb, response);
				for (let prodtime of this.ProdTimeSheet) {
					if (prodtime.prtId == prodtimes.prtId) {
						prodtime.empCompany = prodtimes.empCompany;
						prodtime.empName = prodtimes.empName;
						prodtime.status = prodtimes.status;
						prodtime.tsName = prodtimes.tsName;
						prodtime.twhrs = prodtimes.twhrs;
						prodtime.insertUser = this.insertUser;
						prodtime.insertDatetime = this.insertDatetime;
						prodtime.updatedUser = this.authManager.getcurrentUser.username;
						prodtime.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.ProdTimeSheet);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prodTimestForm.reset();
				this.prtId = null;
				this.submitted = false;
			})
		}
		else {
			prodtimest.insertUser = this.authManager.getcurrentUser.username;
			prodtimest.insertDatetime = new Date();
			this.prodTimeManager.timestsave(prodtimest).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let prodtimest = deserialize<Prodtimesheet001mb>(Prodtimesheet001mb, response);
				this.ProdTimeSheet?.push(prodtimest);
				const newItems = [JSON.parse(JSON.stringify(prodtimest))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.prodTimestForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.submitted = false;
		this.prodTimestForm.reset();
	}

	onGeneratePdfReport(){
		this.prodTimeManager.prodTimestPdf().subscribe((response) =>{
			saveAs(response,'ProducTimeSheetList');

		});
	}

	onGenerateExcelReport(){
		this.prodTimeManager.prodTimestExcel().subscribe((response) => {
			saveAs(response,'ProducTimeSheetList');
        })
	}
}
