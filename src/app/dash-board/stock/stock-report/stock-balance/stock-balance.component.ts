import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { StockBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/stock-balance.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Stkrepbalance001mb } from 'src/app/shared/services/restcontroller/entities/Stkrepbalance001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-stock-balance',
	templateUrl: './stock-balance.component.html',
	styleUrls: ['./stock-balance.component.css']
})
export class StockBalanceComponent implements OnInit {
	@ViewChild('balance') balance: NgForm | any;

	frameworkComponents: any;
	stbalId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	submitted = false;
	balanceForm: FormGroup | any;
	groupname: string = "Item.Group";
	grouptype: string = "Group";
	balanceQty: number | any;
	balanceValue: number | any;
	brand: string | null = "";
	company: string | null = "";
	description: string | null = "";
	inQty: number | any;
	itemCode: string | null = "";
	itemGroup: string | null = "";
	openingQty: number | any;
	openingValue: number | any;
	outQty: number | any;
	outValue: number | any;
	stkUom: string | null = "";
	valuationRate: number | any;
	wareHouse: string | null = "";
	stkRepBalance: Stkrepbalance001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	itemgrpproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	stkitems: Itemdt001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private stockBalanceManager: StockBalanceManager, 
		private salesItemManager: SalesItemManager, 
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder, 
		private datePipe: DatePipe,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.createDataGrid001mb();
		this.balanceForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			itemGroup: ['', Validators.required],
			balanceQty: ['', Validators.required],
			balanceValue: ['', Validators.required],
			brand: ['', Validators.required],
			company: ['', Validators.required],
			description: ['', Validators.required],
			inQty: ['', Validators.required],
			openingQty: ['', Validators.required],
			openingValue: ['', Validators.required],
			outQty: ['', Validators.required],
			outValue: ['', Validators.required],
			stkUom: ['', Validators.required],
			valuationRate: ['', Validators.required],
			wareHouse: ['', Validators.required],
		})
		this.systemPropertiesService.system(this.groupname, this.grouptype).subscribe(response => {
			this.itemgrpproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.salesItemManager.allsalesitem().subscribe((response) => {
			this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		})

		this.stockBalanceManager.allstkbalance().subscribe((response) => {
			this.stkRepBalance = deserialize<Stkrepbalance001mb[]>(Stkrepbalance001mb, response);
			if (this.stkRepBalance.length > 0) {
				this.gridOptions?.api?.setRowData(this.stkRepBalance);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.balanceForm.controls; }

	createDataGrid001mb(): void {
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
				field: 'stbalId',
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
				headerName: 'Item',
				field: 'itemCode',
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
				headerName: 'Brand',
				field: 'brand',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'WareHouse',
				field: 'wareHouse',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'UOM',
				field: 'stkUom',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Opening Qty',
				field: 'openingQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Opening Value',
				field: 'openingValue',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'In Qty',
				field: 'inQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Out Qty',
				field: 'outQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Out Value',
				field: 'outValue',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Balance Qty',
				field: 'balanceQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Balance Value',
				field: 'balanceValue',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Valuation Rate',
				field: 'valuationRate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'company',
				field: 'company',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'description',
				field: 'description',
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
				width: 250,
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
				width: 300,
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
                width: 250,
                flex: 1,
				suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
		]
	}
	onEditButtonClick(params: any) {
		this.stbalId = params.data.stbalId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.balanceForm.patchValue({
			'balanceQty': params.data.balanceQty,
			'balanceValue': params.data.balanceValue,
			'brand': params.data.brand,
			'company': params.data.company,
			'description': params.data.description,
			'inQty': params.data.inQty,
			'itemCode': params.data.itemCode,
			'itemGroup': params.data.itemGroup,
			'openingQty': params.data.openingQty,
			'openingValue': params.data.openingValue,
			'outQty': params.data.outQty,
			'outValue': params.data.outValue,
			'stkUom': params.data.stkUom,
			'valuationRate': params.data.valuationRate,
			'wareHouse': params.data.wareHouse,
		})
	}

	onDeleteButtonClick(params: any) {
		this.stockBalanceManager.deletestkbalance(params.data.stbalId).subscribe((response) => {
			for (let i = 0; i < this.stkRepBalance.length; i++) {
				if (this.stkRepBalance[i].stbalId == params.data.stbalId) {
					this.stkRepBalance?.splice(i, 1);
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
        modalRef.componentInstance.title = "Stock Balance";
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

	onOrderClick(event: any, balance: any) {
		this.markFormGroupTouched(this.balanceForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.balanceForm.invalid) {
			return;
		}
		let stkrepbalance001mb = new Stkrepbalance001mb();
		stkrepbalance001mb.balanceQty = this.f.balanceQty.value ? this.f.balanceQty.value : null;
		stkrepbalance001mb.balanceValue = this.f.balanceValue.value ? this.f.balanceValue.value : null;
		stkrepbalance001mb.brand = this.f.brand.value ? this.f.brand.value : "";
		stkrepbalance001mb.company = this.f.company.value ? this.f.company.value : "";
		stkrepbalance001mb.description = this.f.description.value ? this.f.description.value : "";
		stkrepbalance001mb.inQty = this.f.inQty ? this.f.inQty.value : null;
		stkrepbalance001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		stkrepbalance001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		stkrepbalance001mb.openingQty = this.f.openingQty.value ? this.f.openingQty.value : null;
		stkrepbalance001mb.openingValue = this.f.openingValue.value ? this.f.openingValue.value : null;
		stkrepbalance001mb.outQty = this.f.outQty.value ? this.f.outQty.value : null;
		stkrepbalance001mb.outValue = this.f.outValue.value ? this.f.outValue.value : null;
		stkrepbalance001mb.stkUom = this.f.stkUom.value ? this.f.stkUom.value : "";
		stkrepbalance001mb.valuationRate = this.f.valuationRate.value ? this.f.valuationRate.value : null;
		stkrepbalance001mb.wareHouse = this.f.wareHouse.value ? this.f.wareHouse.value : "";
		stkrepbalance001mb.description = this.f.description.value ? this.f.description.value : "";
		if (this.stbalId) {
			stkrepbalance001mb.stbalId = this.stbalId;
			stkrepbalance001mb.insertUser = this.insertUser;
            stkrepbalance001mb.insertDatetime = this.insertDatetime;
            stkrepbalance001mb.updatedUser = this.authManager.getcurrentUser.username;
            stkrepbalance001mb.updatedDatetime = new Date();
			this.stockBalanceManager.updatestkbalance(stkrepbalance001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let balances = deserialize<Stkrepbalance001mb>(Stkrepbalance001mb, response);
				for (let stockBalance of this.stkRepBalance) {
					if (stockBalance.stbalId == balances.stbalId) {
						stockBalance.balanceQty = balances.balanceQty;
						stockBalance.balanceValue = balances.balanceValue;
						stockBalance.brand = balances.brand;
						stockBalance.company = balances.company;
						stockBalance.description = balances.description;
						stockBalance.inQty = balances.inQty;
						stockBalance.itemCode = balances.itemCode;
						stockBalance.itemGroup = balances.itemGroup;
						stockBalance.openingQty = balances.openingQty;
						stockBalance.openingValue = balances.openingValue;
						stockBalance.outQty = balances.outQty;
						stockBalance.outValue = balances.outValue;
						stockBalance.stkUom = balances.stkUom;
						stockBalance.valuationRate = balances.valuationRate;
						stockBalance.wareHouse = balances.wareHouse;
						stockBalance.description = balances.description;
						stockBalance.insertUser = this.insertUser;
						stockBalance.insertDatetime = this.insertDatetime;
						stockBalance.updatedUser = this.authManager.getcurrentUser.username;
						stockBalance.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.stkRepBalance);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.balanceForm.reset();
				this.submitted = false;
				this.stbalId = null;
			});
		} else {
			stkrepbalance001mb.insertUser = this.authManager.getcurrentUser.username;
            stkrepbalance001mb.insertDatetime = new Date();
			this.stockBalanceManager.savestkbalance(stkrepbalance001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let balances = deserialize<Stkrepbalance001mb>(Stkrepbalance001mb, response);
				this.stkRepBalance?.push(balances);
				const newItems = [JSON.parse(JSON.stringify(balances))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.balanceForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.balanceForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport() {
		this.stockBalanceManager.stockBalancePdf().subscribe((response) => {
			saveAs(response, "BalanceDetailsList");

		});
	}

	onGenerateExcelReport() {
		this.stockBalanceManager.stockBalanceExcel().subscribe((response) => {
			saveAs(response, "BalanceDetailsList");
		});
	}

}


