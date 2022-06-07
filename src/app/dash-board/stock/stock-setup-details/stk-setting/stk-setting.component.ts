import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StockSettingManager } from 'src/app/shared/services/restcontroller/bizservice/stk-setting.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { Stkrepledger001mb } from 'src/app/shared/services/restcontroller/entities/Stkrepledger001mb';
import { Stksettings001mb } from 'src/app/shared/services/restcontroller/entities/Stksettings001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Warehouse001mb } from 'src/app/shared/services/restcontroller/entities/Warehouse001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-stk-setting',
	templateUrl: './stk-setting.component.html',
	styleUrls: ['./stk-setting.component.css']
})

export class StkSettingComponent implements OnInit {
	settingForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	setId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itmname: string = "itemnaming.select";
	itmtype: string = "select";
	defname: string = "defvalue.method";
	deftype: string = "method";
	grpname: string = "supplier.Type";
	grptype: string = "Type";
	itemnameBy: string = "";
	defaultValue: string="";
	itemGroup: string = "";
	allowancePercent: string | null = "";
	defaultUom: string = "";
	warehouseName: string = "";
	showbarcodeField: boolean = false;
	autoinsertPricelist: boolean = false;
	autosetSerialno: boolean = false;
	allownegativeStock: boolean = false;
	stkSetting: Stksettings001mb[] = [];
	public gridOptions: GridOptions | any;
	itmsystemproperties?: Systemproperties001mb[] = [];
	defsystemproperties?: Systemproperties001mb[] = [];
	grpsystemproperties?: Systemproperties001mb[] = [];
	housesystemproperties?: Systemproperties001mb[] = [];
	stkLedgers: Stkrepledger001mb[] = [];
	wrHouses: Warehouse001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private stockSettingManager: StockSettingManager, 
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
		this.settingForm = this.formBuilder.group({
			itemnameBy: ['', Validators.required],
			defaultValue: ['', Validators.required],
			itemGroup: ['', Validators.required],
			allowancePercent: ['', Validators.required],
			defaultUom: ['', Validators.required],
			warehouseName: ['', Validators.required],
			showbarcodeField: [''],
			autoinsertPricelist: [''],
			autosetSerialno: [''],
			allownegativeStock: ['']
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.itmname, this.itmtype).subscribe(response => {
			this.itmsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		}),
			this.systemPropertiesService.system(this.defname, this.deftype).subscribe(response => {
				this.defsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
			}),
			this.systemPropertiesService.system(this.grpname, this.grptype).subscribe(response => {
				this.grpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
			}),
			this.wareHouseManager.allwrhouse().subscribe(response => {
				this.wrHouses = deserialize<Warehouse001mb[]>(Warehouse001mb, response);
			}),
			this.stockSettingManager.allstksetting().subscribe(response => {
				this.stkSetting = deserialize<Stksettings001mb[]>(Stksettings001mb, response);
				if (this.stkSetting.length > 0) {
					this.gridOptions?.api?.setRowData(this.stkSetting);
				} else {
					this.gridOptions?.api?.setRowData([]);
				}
			})
	}

	get f() { return this.settingForm.controls; }


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
				headerName: '#Id',
				field: 'setId',
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
				headerName: 'ItemNaming By',
				field: 'itemnameBy',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Default Value Method',
				field: 'defaultValue',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Item Group',
				field: 'itemGroup',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Allowance Percent',
				field: 'allowancePercent',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'DefaultUOM',
				field: 'defaultUom',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'WarehouseName',
				field: 'warehouseName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Show BarCode Field',
				field: 'showbarcodeField',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.showbarcodeField == 1 ? true : false;
                }
			},
			{
				headerName: 'Auto Insert Price List',
				field: 'autoinsertPricelist',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.autoinsertPricelist == 1 ? true : false;
                }
			},
			{
				headerName: 'Auto Set SerialNo',
				field: 'autosetSerialno',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.autosetSerialno == 1 ? true : false;
                }
			},
			{
				headerName: 'Allow Negative Stock',
				field: 'allownegativeStock',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.allownegativeStock == 1 ? true : false;
                }
			},
			,
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
		this.setId = params.data.setId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.settingForm.patchValue({
			'itemnameBy': params.data.itemnameBy,
			'defaultValue': params.data.defaultValue,
			'itemGroup': params.data.itemGroup,
			'allowancePercent': params.data.allowancePercent,
			'defaultUom': params.data.defaultUom,
			'warehouseName': params.data.warehouseName,
			'showbarcodeField': params.data.showbarcodeField,
			'autoinsertPricelist': params.data.autoinsertPricelist,
			'autosetSerialno': params.data.autosetSerialno,
			'allownegativeStock': params.data.allownegativeStock
		});
	}

	onDeleteButtonClick(params: any) {
		this.stockSettingManager.deletestksetting(params.data.setId).subscribe((response) => {
			for (let i = 0; i < this.stkSetting.length; i++) {
				if (this.stkSetting[i].setId == params.data.setId) {
					this.stkSetting?.splice(i, 1);
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
        modalRef.componentInstance.title = "Stock Setting";
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

	onOrderClick(event: any, settingForm: any) {
		this.markFormGroupTouched(this.settingForm);
		this.submitted = true;
		if (this.settingForm.invalid) {
			return;
		}

		let stksettings001mb = new Stksettings001mb();
		stksettings001mb.itemnameBy = this.f.itemnameBy.value ? this.f.itemnameBy.value : "";
		stksettings001mb.defaultValue = this.f.defaultValue.value ? this.f.defaultValue.value : null;
		stksettings001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		stksettings001mb.allowancePercent = this.f.allowancePercent.value ? this.f.allowancePercent.value : "";
		stksettings001mb.defaultUom = this.f.defaultUom.value ? this.f.defaultUom.value : "";
		stksettings001mb.warehouseName = this.f.warehouseName.value ? this.f.warehouseName.value : "";
		stksettings001mb.showbarcodeField = this.f.showbarcodeField.value ? this.f.showbarcodeField.value : false;
		stksettings001mb.autoinsertPricelist = this.f.autoinsertPricelist.value ? this.f.autoinsertPricelist.value : false;
		stksettings001mb.autosetSerialno = this.f.autosetSerialno.value ? this.f.autosetSerialno.value : false;
		stksettings001mb.allownegativeStock = this.f.allownegativeStock.value ? this.f.allownegativeStock.value : false;

		if (this.setId) {
			stksettings001mb.setId = this.setId;
			stksettings001mb.insertUser = this.insertUser;
            stksettings001mb.insertDatetime = this.insertDatetime;
            stksettings001mb.updatedUser = this.authManager.getcurrentUser.username;
            stksettings001mb.updatedDatetime = new Date();
			this.stockSettingManager.updatestksetting(stksettings001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let stksettings001mb = deserialize<Stksettings001mb>(Stksettings001mb, response);
				for (let stocksettings of this.stkSetting) {
					if (stocksettings.setId == stksettings001mb.setId) {
						stocksettings.itemnameBy = stksettings001mb.itemnameBy;
						stocksettings.defaultValue = stksettings001mb.defaultValue;
						stocksettings.itemGroup = stksettings001mb.itemGroup;
						stocksettings.allowancePercent = stksettings001mb.allowancePercent;
						stocksettings.defaultUom = stksettings001mb.defaultUom;
						stocksettings.warehouseName = stksettings001mb.warehouseName;
						stocksettings.showbarcodeField = stksettings001mb.showbarcodeField;
						stocksettings.autoinsertPricelist = stksettings001mb.autoinsertPricelist;
						stocksettings.autosetSerialno = stksettings001mb.autosetSerialno;
						stocksettings.allownegativeStock = stksettings001mb.allownegativeStock;
						stocksettings.insertUser = this.insertUser;
						stocksettings.insertDatetime = this.insertDatetime;
						stocksettings.updatedUser = this.authManager.getcurrentUser.username;
						stocksettings.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.stkSetting);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.settingForm.reset();
				this.setId = null;
				this.submitted = false;
			});
		} else {
			stksettings001mb.insertUser = this.authManager.getcurrentUser.username;
            stksettings001mb.insertDatetime = new Date();
			this.stockSettingManager.savestksetting(stksettings001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let stksettings001mb = deserialize<Stksettings001mb>(Stksettings001mb, response);
				this.stkSetting?.push(stksettings001mb);
				const newItems = [JSON.parse(JSON.stringify(stksettings001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.settingForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.settingForm.reset();
	}

	onGeneratePdfReport() {
		this.stockSettingManager.stockSettingPdf().subscribe((response) => {
			saveAs(response, "StockSettingsList");

		});
	}

	onGenerateExcelReport() {
		this.stockSettingManager.stockSettingExcel().subscribe((response) => {
			saveAs(response, "StockSettingsList");
		});
	}
}