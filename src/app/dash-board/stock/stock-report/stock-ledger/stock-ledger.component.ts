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
import { StockLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ledger.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Stkrepledger001mb } from 'src/app/shared/services/restcontroller/entities/Stkrepledger001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-stock-ledger',
	templateUrl: './stock-ledger.component.html',
	styleUrls: ['./stock-ledger.component.css']
})
export class StockLedgerComponent implements OnInit {


	frameworkComponents: any;
	stledId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	submitted = false;
	stockForm: FormGroup | any;
	name: string = "stkvoucher.type";
	type: string = "type";
	vname: string = "item.group";
	vtype: string = "group";
	balanceQty: number | any;
	balanceValue: number | any;
	batch: string | null = "";
	brand: string | null = "";
	company: string | null = "";
	date!: Date | null;
	description: string | null = "";
	incomingRate: number | any;
	itemCode: string | null = "";
	itemGroup: string | null = "";
	quantity: number | any;
	serialNo: string | null = "";
	stkUom: string | null = "";
	valuationRate: number | any;
	voucherCode: string | null = "";
	voucherType: string | null = "";
	wareHouse: string | null = "";
	stkLedger: Stkrepledger001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	ssystemproperties?: Systemproperties001mb[] = [];
	vsystemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	stkitems: Itemdt001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private stockLedgerManager: StockLedgerManager, 
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
		this.stockForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			itemGroup: ['', Validators.required],
			balanceQty: ['', Validators.required],
			balanceValue: ['', Validators.required],
			brand: ['', Validators.required],
			company: ['', Validators.required],
			description: ['', Validators.required],
			valuationRate: ['', Validators.required],
			wareHouse: ['', Validators.required],
			batch: ['', Validators.required],
			date: ['', Validators.required],
			incomingRate: ['', Validators.required],
			voucherType: ['', Validators.required],
			voucherCode: ['', Validators.required],
			serialNo: ['', Validators.required],
			quantity: ['', Validators.required],
			stkUom: ['', Validators.required],
		})
		this.createDataGrid001mb();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.vname, this.vtype).subscribe(response => {
			this.vsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.salesItemManager.allsalesitem().subscribe((response) => {
			this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		})

		this.stockLedgerManager.allstkledger().subscribe((response) => {
			this.stkLedger = deserialize<Stkrepledger001mb[]>(Stkrepledger001mb, response);
			if (this.stkLedger.length > 0) {
				this.gridOptions?.api?.setRowData(this.stkLedger);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.stockForm.controls; }

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
				field: 'stledId',
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
				headerName: 'Item ',
				field: 'itemCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Item Group ',
				field: 'itemGroup',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Date',
				field: 'date',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.date ? this.datePipe.transform(params.data.date, 'MM/dd/yyyy') : '';
				}
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
				headerName: 'Quantity',
				field: 'quantity',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Balance Quantity',
				field: 'balanceQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Incoming Rate',
				field: 'incomingRate',
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
				headerName: 'Voucher Type',
				field: 'voucherType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Voucher',
				field: 'voucherCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Batch',
				field: 'batch',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Serial',
				field: 'serialNo',
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
				headerName: 'Description',
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
				width: 280,
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
                width: 255,
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
		this.stledId = params.data.stledId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.stockForm.patchValue({
			'balanceQty': params.data.balanceQty,
			'balanceValue': params.data.balanceValue,
			'batch': params.data.batch,
			'brand': params.data.brand,
			'company': params.data.company,
			'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
			'description': params.data.description,
			'incomingRate': params.data.incomingRate,
			'itemCode': params.data.itemCode,
			'itemGroup': params.data.itemGroup,
			'quantity': params.data.quantity,
			'serialNo': params.data.serialNo,
			'stkUom': params.data.stkUom,
			'valuationRate': params.data.valuationRate,
			'voucherCode': params.data.voucherCode,
			'voucherType': params.data.voucherType,
			'wareHouse': params.data.wareHouse,
		})
	}

	onDeleteButtonClick(params: any) {
		this.stockLedgerManager.deletestkledger(params.data.stledId).subscribe((response) => {
			for (let i = 0; i < this.stkLedger.length; i++) {
				if (this.stkLedger[i].stledId == params.data.stledId) {
					this.stkLedger?.splice(i, 1);
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
        modalRef.componentInstance.title = "Stock Ledger";
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

	onOrderClick(event: any, stockForm: any) {
		this.markFormGroupTouched(this.stockForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.stockForm.invalid) {
			return;
		}
		let stkrepledger001mb = new Stkrepledger001mb();
		stkrepledger001mb.balanceQty = this.f.balanceQty.value ? this.f.balanceQty.value : null;
		stkrepledger001mb.balanceValue = this.f.balanceValue.value ? this.f.balanceValue.value : null;
		stkrepledger001mb.batch = this.f.batch.value ? this.f.batch.value : "";
		stkrepledger001mb.brand = this.f.brand.value ? this.f.brand.value : "";
		stkrepledger001mb.company = this.f.company.value ? this.f.company.value : "";
		stkrepledger001mb.date = new Date(this.f.date.value);
		stkrepledger001mb.description = this.f.description.value ? this.f.description.value : "";
		stkrepledger001mb.incomingRate = this.f.incomingRate.value ? this.f.incomingRate.value : null;
		stkrepledger001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		stkrepledger001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		stkrepledger001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
		stkrepledger001mb.serialNo = this.f.serialNo.value ? this.f.serialNo.value : "";
		stkrepledger001mb.stkUom = this.f.stkUom.value ? this.f.stkUom.value : "";
		stkrepledger001mb.valuationRate = this.f.valuationRate.value ? this.f.valuationRate.value : null;
		stkrepledger001mb.voucherCode = this.f.voucherCode.value ? this.f.voucherCode.value : "";
		stkrepledger001mb.voucherType = this.f.voucherType.value ? this.f.voucherType.value : "";
		stkrepledger001mb.wareHouse = this.f.wareHouse.value ? this.f.wareHouse.value : "";
		if (this.stledId) {
			stkrepledger001mb.stledId = this.stledId;
			stkrepledger001mb.insertUser = this.insertUser;
            stkrepledger001mb.insertDatetime = this.insertDatetime;
            stkrepledger001mb.updatedUser = this.authManager.getcurrentUser.username;
            stkrepledger001mb.updatedDatetime = new Date();
			this.stockLedgerManager.updatestkledger(stkrepledger001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let stocks = deserialize<Stkrepledger001mb>(Stkrepledger001mb, response);
				for (let stockLedger of this.stkLedger) {
					if (stockLedger.stledId == stocks.stledId) {
						stockLedger.balanceQty = stocks.balanceQty;
						stockLedger.balanceValue = stocks.balanceValue;
						stockLedger.batch = stocks.batch;
						stockLedger.brand = stocks.brand;
						stockLedger.company = stocks.company;
						stockLedger.date = stocks.date;
						stockLedger.description = stocks.description;
						stockLedger.incomingRate = stocks.incomingRate;
						stockLedger.itemCode = stocks.itemCode;
						stockLedger.itemGroup = stocks.itemGroup;
						stockLedger.quantity = stocks.quantity;
						stockLedger.serialNo = stocks.serialNo;
						stockLedger.stkUom = stocks.stkUom;
						stockLedger.valuationRate = stocks.valuationRate;
						stockLedger.voucherCode = stocks.voucherCode;
						stockLedger.voucherType = stocks.voucherType;
						stockLedger.wareHouse = stocks.wareHouse;
						stockLedger.insertUser = this.insertUser;
						stockLedger.insertDatetime = this.insertDatetime;
						stockLedger.updatedUser = this.authManager.getcurrentUser.username;
						stockLedger.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.stkLedger);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.stockForm.reset();
				this.submitted = false;
				this.stledId = null;
			});
		} else {
			stkrepledger001mb.insertUser = this.authManager.getcurrentUser.username;
            stkrepledger001mb.insertDatetime = new Date();
			this.stockLedgerManager.savestkledger(stkrepledger001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let stocks = deserialize<Stkrepledger001mb>(Stkrepledger001mb, response);
				this.stkLedger?.push(stocks);
				const newItems = [JSON.parse(JSON.stringify(stocks))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.stockForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.stockForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport() {
		this.stockLedgerManager.stockLedgerPdf().subscribe((response) => {
			saveAs(response, "LedgerDetailsList");

		});
	}

	onGenerateExcelReport() {
		this.stockLedgerManager.stockLedgerExcel().subscribe((response) => {
			saveAs(response, "LedgerDetailsList");
		});
	}

}