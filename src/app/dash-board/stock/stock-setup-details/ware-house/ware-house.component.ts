import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Warehouse001mb } from 'src/app/shared/services/restcontroller/entities/Warehouse001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-ware-house',
	templateUrl: './ware-house.component.html',
	styleUrls: ['./ware-house.component.css']
})

export class WareHouseComponent implements OnInit {
	houseForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	whId: number | any;
	insertUser: string = "";
	insertDatetime: Date | any;
	statusname: string = "Itembom.status";
	statustype: string = "status";
	housename: string = "Salary.Mode";
	housetype: string = "Mode";
	warehouseName: string = "";
	status: string = "";
	isActive: string = "";
	warehouseCode: string = "";
	public gridOptions: GridOptions | any;
	wrHouse: Warehouse001mb[] = [];
	statussystemproperties?: Systemproperties001mb[] = [];
	housesystemproperties?: Systemproperties001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private formBuilder: FormBuilder,
		private wareHouseManager: WareHouseManager,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent,
		}
	}

	ngOnInit() {
		this.houseForm = this.formBuilder.group({
			warehouseName: ['', Validators.required],
			status: ['', Validators.required],
			isActive: ['', Validators.required],
			warehouseCode: ['', Validators.required]
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.statusname, this.statustype).subscribe(response => {
			this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		}),
			this.systemPropertiesService.system(this.housename, this.housetype).subscribe(response => {
				this.housesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
			}),
			this.wareHouseManager.allwrhouse().subscribe(response => {
				this.wrHouse = deserialize<Warehouse001mb[]>(Warehouse001mb, response);
				if (this.wrHouse.length > 0) {
					this.gridOptions?.api?.setRowData(this.wrHouse);
				} else {
					this.gridOptions?.api?.setRowData([]);
				}
			})
	}

	get f() { return this.houseForm.controls; }

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
				headerName: '#ID',
				field: 'whId',
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
				field: 'warehouseName',
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
				headerName: 'Mode',
				field: 'isActive',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Warehouse Code',
				field: 'warehouseCode',
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
				width: 100,
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
		this.whId = params.data.whId;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.houseForm.patchValue({
			'warehouseName': params.data.warehouseName,
			'status': params.data.status,
			'isActive': params.data.isActive,
			'warehouseCode': params.data.warehouseCode
		});
	}

	onDeleteButtonClick(params: any) {
		this.wareHouseManager.deletewrhouse(params.data.whId).subscribe((response) => {
			for (let i = 0; i < this.wrHouse.length; i++) {
				if (this.wrHouse[i].whId == params.data.whId) {
					this.wrHouse?.splice(i, 1);
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
		modalRef.componentInstance.title = "Ware House";
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

	onOrderClick(event: any, houseForm: any) {
		this.markFormGroupTouched(this.houseForm);
		this.submitted = true;
		if (this.houseForm.invalid) {
			return;
		}

		let warehouse001mb = new Warehouse001mb();
		warehouse001mb.warehouseName = this.f.warehouseName.value ? this.f.warehouseName.value : "";
		warehouse001mb.status = this.f.status.value ? this.f.status.value : "";
		warehouse001mb.isActive = this.f.isActive.value ? this.f.isActive.value : "";
		warehouse001mb.warehouseCode = this.f.warehouseCode.value ? this.f.warehouseCode.value : "";

		if (this.whId) {
			warehouse001mb.whId = this.whId;
			warehouse001mb.insertUser = this.insertUser;
			warehouse001mb.insertDatetime = this.insertDatetime;
			warehouse001mb.updatedUser = this.authManager.getcurrentUser.username;
			warehouse001mb.updatedDatetime = new Date();
			this.wareHouseManager.updatewrhouse(warehouse001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let warehouse001mb = deserialize<Warehouse001mb>(Warehouse001mb, response);
				for (let warehouses of this.wrHouse) {
					if (warehouses.whId == warehouse001mb.whId) {
						warehouses.warehouseName = warehouse001mb.warehouseName;
						warehouses.status = warehouse001mb.status;
						warehouses.isActive = warehouse001mb.isActive;
						warehouses.warehouseCode = warehouse001mb.warehouseCode;
						warehouses.insertUser = this.insertUser;
						warehouses.insertDatetime = this.insertDatetime;
						warehouses.updatedUser = this.authManager.getcurrentUser.username;
						warehouses.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.wrHouse);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.houseForm.reset();
				this.whId = null;
				this.submitted = false;
			});
		} else {
			warehouse001mb.insertUser = this.authManager.getcurrentUser.username;
			warehouse001mb.insertDatetime = new Date();
			this.wareHouseManager.savewrhouse(warehouse001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let warehouse001mb = deserialize<Warehouse001mb>(Warehouse001mb, response);
				this.wrHouse?.push(warehouse001mb);
				const newItems = [JSON.parse(JSON.stringify(warehouse001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.houseForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.houseForm.reset();
	}

	onGeneratePdfReport() {
		this.wareHouseManager.wareHousePdf().subscribe((response) => {
			saveAs(response, "wareHouseList");

		});
	}

	onGenerateExcelReport() {
		this.wareHouseManager.wareHouseExcel().subscribe((response) => {
			saveAs(response, "wareHouseList");
		});
	}
}