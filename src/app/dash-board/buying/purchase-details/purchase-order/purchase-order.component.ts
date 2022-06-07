import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseOrdersManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-orders.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Prpurchaseord001mb } from 'src/app/shared/services/restcontroller/entities/Prpurchaseord001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-purchase-order',
	templateUrl: './purchase-order.component.html',
	styleUrls: ['./purchase-order.component.css']
})

export class PurchaseOrderComponent implements OnInit {
	prOrderForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	proId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	poSeries: string = "";
	date: Date | null = null;
	supplier: string = "";
	supplyrawmat: string = "";
	itemCode: string = "";
	quantity: number | any;
	rate: string = "";
	amount: string = "";
	prtype: string = "";
	accountHead: number | any;
	quotrate: string = "";
	taxandChg: number | any;
	dummyname = "Dummy.status";
	dummytype = "dummy";
	matname = "PRRawmat.List";
	mattype = "List";
	supname="PRSupp.Type";
	suptupe="Type";
	public gridOptions: GridOptions | any;
	dummysystemproperties: Systemproperties001mb[] = [];
	matsystemproperties: Systemproperties001mb[] = [];
	supsystemproperties:Systemproperties001mb[] = [];
	itemlist: Itemdt001mb[]=[];
	purchaseOrder: Prpurchaseord001mb[] = [];

	constructor(private purchaseOrdersManager: PurchaseOrdersManager, 
		private datePipe: DatePipe, 
		private formBuilder: FormBuilder, 
		private systemPropertiesService: SystemPropertiesService, 
		private salesitemManager:SalesItemManager,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent,
		}
	}

	ngOnInit() {
		this.prOrderForm = this.formBuilder.group({
			poSeries: ['', Validators.required],
			date: ['', Validators.required],
			supplier: ['', Validators.required],
			supplyrawmat: ['', Validators.required],
			itemCode: ['', Validators.required],
			quantity: ['', Validators.required],
			rate: ['', Validators.required],
			amount: ['', Validators.required],
			prtype: ['', Validators.required],
			accountHead: ['', Validators.required],
			quotrate: ['', Validators.required],
			taxandChg: ['', Validators.required]
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.supname, this.suptupe).subscribe(response => {
			this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.matname, this.mattype).subscribe(response => {
			this.matsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
		this.purchaseOrdersManager.allpurchaseorder().subscribe((response) => {
			this.purchaseOrder = deserialize<Prpurchaseord001mb[]>(Prpurchaseord001mb, response);
			if (this.purchaseOrder.length > 0) {
				this.gridOptions?.api?.setRowData(this.purchaseOrder);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.prOrderForm.controls; }

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
				field: 'proId',
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
				headerName: 'Series',
				field: 'poSeries',
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
				headerName: 'Supplier',
				field: 'supplier',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Supply RawMaterial',
				field: 'supplyrawmat',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
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
				headerName: 'Rate',
				field: 'rate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Amount',
				field: 'amount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Type',
				field: 'prtype',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Account Head',
				field: 'accountHead',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Quoted Rate',
				field: 'quotrate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Taxes and Charges',
				field: 'taxandChg',
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
                width: 185,
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
		this.proId = params.data.proId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.prOrderForm.patchValue({
			'poSeries': params.data.poSeries,
			'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
			'supplier': params.data.supplier,
			'supplyrawmat': params.data.supplyrawmat,
			'itemCode': params.data.itemCode,
			'quantity': params.data.quantity,
			'rate': params.data.rate,
			'amount': params.data.amount,
			'prtype': params.data.prtype,
			'accountHead': params.data.accountHead,
			'quotrate': params.data.quotrate,
			'taxandChg': params.data.taxandChg
		});
	}

	onDeleteButtonClick(params: any) {
		this.purchaseOrdersManager.purchaseorderdelete(params.data.proId).subscribe((response) => {
			for (let i = 0; i < this.purchaseOrder.length; i++) {
				if (this.purchaseOrder[i].proId == params.data.proId) {
					this.purchaseOrder?.splice(i, 1);
					break;
				}
			}
			const selectedRows = params.api.getSelectedRows();
			params.api.applyTransaction({ remove: selectedRows });
			this.gridOptions.api.deselectAll();
			this.calloutService.showSuccess("Order Removed Successfully");
		});
	}

	onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Purchase Order";
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

	onOrderClick(event: any, prOrderForm: any) {
		this.markFormGroupTouched(this.prOrderForm);
		this.submitted = true;
		if (this.prOrderForm.invalid) {
			return;
		}

		let prpurchaseord001mb = new Prpurchaseord001mb();
		prpurchaseord001mb.poSeries = this.f.poSeries.value ? this.f.poSeries.value : "";
		prpurchaseord001mb.date = new Date(this.f.date.value);
		prpurchaseord001mb.supplier = this.f.supplier.value ? this.f.supplier.value : "";
		prpurchaseord001mb.supplyrawmat = this.f.supplyrawmat.value ? this.f.supplyrawmat.value : "";
		prpurchaseord001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		prpurchaseord001mb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
		prpurchaseord001mb.rate = this.f.rate.value ? this.f.rate.value : "";
		prpurchaseord001mb.amount = this.f.amount.value ? this.f.amount.value : "";
		prpurchaseord001mb.prtype = this.f.prtype.value ? this.f.prtype.value : "";
		prpurchaseord001mb.accountHead = this.f.accountHead.value ? this.f.accountHead.value : "";
		prpurchaseord001mb.quotrate = this.f.quotrate.value ? this.f.quotrate.value : "";
		prpurchaseord001mb.taxandChg = this.f.taxandChg.value ? this.f.taxandChg.value : "";
		if (this.proId) {
			prpurchaseord001mb.proId = this.proId;
			prpurchaseord001mb.insertUser = this.insertUser;
			prpurchaseord001mb.insertDatetime = this.insertDatetime;
			prpurchaseord001mb.updatedUser = this.authManager.getcurrentUser.username;
			prpurchaseord001mb.updatedDatetime = new Date();
			this.purchaseOrdersManager.purchaseorderupdate(prpurchaseord001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let proder = deserialize<Prpurchaseord001mb>(Prpurchaseord001mb, response);
				for (let purchaseorder of this.purchaseOrder) {
					if (purchaseorder.proId == proder.proId) {
						purchaseorder.poSeries = proder.poSeries;
						purchaseorder.date = proder.date;
						purchaseorder.supplier = proder.supplier;
						purchaseorder.supplyrawmat = proder.supplyrawmat;
						purchaseorder.itemCode = proder.itemCode;
						purchaseorder.quantity = proder.quantity;
						purchaseorder.rate = proder.rate;
						purchaseorder.amount = proder.amount;
						purchaseorder.prtype = proder.prtype;
						purchaseorder.accountHead = proder.accountHead;
						purchaseorder.quotrate = proder.quotrate;
						purchaseorder.taxandChg = proder.taxandChg;
						purchaseorder.insertUser = this.insertUser;
						purchaseorder.insertDatetime = this.insertDatetime;
						purchaseorder.updatedUser = this.authManager.getcurrentUser.username;
						purchaseorder.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.purchaseOrder);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prOrderForm.reset();
				this.proId = null;
				this.submitted = false;
			});
		} else {
			prpurchaseord001mb.insertUser = this.authManager.getcurrentUser.username;
			prpurchaseord001mb.insertDatetime = new Date();
			this.purchaseOrdersManager.purchaseordersave(prpurchaseord001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let proder = deserialize<Prpurchaseord001mb>(Prpurchaseord001mb, response);
				this.purchaseOrder?.push(proder);
				const newItems = [JSON.parse(JSON.stringify(proder))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.prOrderForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.prOrderForm.reset();
	}

	onGeneratePdfReport(){
		this.purchaseOrdersManager.purchaseOrdersPdf().subscribe((response) =>{
			saveAs(response," PurchaseorderDetails");

		});
	}

	onGenerateExcelReport(){
		this.purchaseOrdersManager.purchaseOrdersExcel().subscribe((response) => {
			saveAs(response," PurchaseorderDetails");
        })
	}
}
