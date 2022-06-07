import { DatePipe } from '@angular/common';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseInvoiceManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-invoice.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Grossprofit001mb } from 'src/app/shared/services/restcontroller/entities/Grossprofit001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-purchase-invoice',
	templateUrl: './purchase-invoice.component.html',
	styleUrls: ['./purchase-invoice.component.css']
})

export class PurchaseInvoiceComponent implements OnInit {

	frameworkComponents: any;
	purchasesForm: FormGroup | any;
	id: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	salesinvoice: string = "";
	customer: string = "";
	postingdate: Date | null = null;
	itemname: string = "";
	description: string = "";
	warehouse: string = "";
	project: string = "";
	currency: number | any;
	quantity?: number;
	averagesellingrate?: number;
	averagebuyingrate?: number;
	sellingamount?: number;
	buyingamount?: number;
	grossprofit?: number;
	grosspercentage?: number;
	dummyname = "Dummy.status";
	dummytype = "dummy";
	submitted = false;
	public gridOptions: GridOptions | any;
	dummysystemproperties: Systemproperties001mb[] = [];
	purchaseInvoice: Grossprofit001mb[] = [];

	constructor(private purchaseInvoiceManager: PurchaseInvoiceManager,
		private systemPropertiesService: SystemPropertiesService,
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
		this.createDataGrid001();
		this.purchasesForm = this.formBuilder.group({
			salesinvoice: ['', Validators.required],
			postingdate: ['', Validators.required],
			customer: ['', Validators.required],
			itemname: ['', Validators.required],
			description: ['', Validators.required],
			warehouse: ['', Validators.required],
			project: ['', Validators.required],
			currency: ['', Validators.required],
			quantity: ['', Validators.required],
			averagesellingrate: ['', Validators.required],
			averagebuyingrate: ['', Validators.required],
			sellingamount: ['', Validators.required],
			buyingamount: ['', Validators.required],
			grossprofit: ['', Validators.required],
			grosspercentage: ['', Validators.required]
		})
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.purchaseInvoiceManager.allpurchseinvoice().subscribe((response) => {
			this.purchaseInvoice = deserialize<Grossprofit001mb[]>(Grossprofit001mb, response);
			if (this.purchaseInvoice.length > 0) {
				this.gridOptions?.api?.setRowData(this.purchaseInvoice);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.purchasesForm.controls }

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
				headerName: 'ID',
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
				headerName: 'Sales Invoice',
				field: 'salesinvoice',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Customer',
				field: 'customer',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Posting Date',
				field: 'postingdate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.postingdate ? this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Item Name',
				field: 'itemname',
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
				headerName: 'Warehouse',
				field: 'warehouse',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Project',
				field: 'project',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Currency',
				field: 'currency',
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
				headerName: 'Average Selling Rate',
				field: 'averagesellingrate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Average Buying Rate',
				field: 'averagebuyingrate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Selling Amount',
				field: 'sellingamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Buying Amount',
				field: 'buyingamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Gross Profit',
				field: 'grossprofit',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Gross Profit %',
				field: 'grosspercentage',
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
				width: 250,
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
		];
	}

	onEditButtonClick(params: any) {
		this.id = params.data.id;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.purchasesForm.patchValue({
			'salesinvoice': params.data.salesinvoice,
			'customer': params.data.customer,
			'postingdate': this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy'),
			'itemname': params.data.itemname,
			'description': params.data.description,
			'warehouse': params.data.warehouse,
			'project': params.data.project,
			'currency': params.data.currency,
			'quantity': params.data.quantity,
			'averagesellingrate': params.data.averagesellingrate,
			'averagebuyingrate': params.data.averagebuyingrate,
			'sellingamount': params.data.sellingamount,
			'buyingamount': params.data.buyingamount,
			'grossprofit': params.data.grossprofit,
			'grosspercentage': params.data.grosspercentage
		});
	}

	onDeleteButtonClick(params: any) {
		this.purchaseInvoiceManager.purchaseinvoicedelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.purchaseInvoice.length; i++) {
				if (this.purchaseInvoice[i].id == params.data.id) {
					this.purchaseInvoice?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Invoice Trends";
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

	onOrderClick(event: any, purchasesForm: any) {
		this.markFormGroupTouched(this.purchasesForm);
		this.submitted = true;
		if (this.purchasesForm.invalid) {
			return;
		}
		let purchaseinvoice = new Grossprofit001mb();
		purchaseinvoice.averagebuyingrate = this.f.averagebuyingrate.value ? this.f.averagebuyingrate.value : null;
		purchaseinvoice.averagesellingrate = this.f.averagesellingrate.value ? this.f.averagesellingrate.value : null;
		purchaseinvoice.buyingamount = this.f.buyingamount.value ? this.f.buyingamount.value : null;
		purchaseinvoice.currency = this.f.currency.value ? this.f.currency.value : null;
		purchaseinvoice.customer = this.f.customer.value ? this.f.customer.value : "";
		purchaseinvoice.description = this.f.description.value ? this.f.description.value : "";
		purchaseinvoice.grosspercentage = this.f.grosspercentage.value ? this.f.grosspercentage.value : null;
		purchaseinvoice.grossprofit = this.f.grossprofit.value ? this.f.grossprofit.value : null;
		purchaseinvoice.itemname = this.f.itemname.value ? this.f.itemname.value : "";
		purchaseinvoice.postingdate = new Date(this.f.postingdate.value);
		purchaseinvoice.project = this.f.project.value ? this.f.project.value : "";
		purchaseinvoice.quantity = this.f.quantity.value ? this.f.quantity.value : null;
		purchaseinvoice.salesinvoice = this.f.salesinvoice.value ? this.f.salesinvoice.value : "";
		purchaseinvoice.sellingamount = this.f.sellingamount.value ? this.f.sellingamount.value : null;
		purchaseinvoice.warehouse = this.f.warehouse.value ? this.f.warehouse.value : "";
		if (this.id) {
			purchaseinvoice.id = this.id;
			purchaseinvoice.insertUser = this.insertUser;
			purchaseinvoice.insertDatetime = this.insertDatetime;
			purchaseinvoice.updatedUser = this.authManager.getcurrentUser.username;
			purchaseinvoice.updatedDatetime = new Date();
			this.purchaseInvoiceManager.purchaseinvoiceupdate(purchaseinvoice).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let grossprofit001mb = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
				for (let purchaseinvoices of this.purchaseInvoice) {
					if (purchaseinvoices.id == grossprofit001mb.id) {
						purchaseinvoices.averagebuyingrate = grossprofit001mb.averagebuyingrate;
						purchaseinvoices.averagesellingrate = grossprofit001mb.averagesellingrate;
						purchaseinvoices.buyingamount = grossprofit001mb.buyingamount;
						purchaseinvoices.currency = grossprofit001mb.currency;
						purchaseinvoices.customer = grossprofit001mb.customer;
						purchaseinvoices.description = grossprofit001mb.description;
						purchaseinvoices.grosspercentage = grossprofit001mb.grosspercentage;
						purchaseinvoices.grossprofit = grossprofit001mb.grossprofit;
						purchaseinvoices.itemname = grossprofit001mb.itemname;
						purchaseinvoices.postingdate = grossprofit001mb.postingdate;
						purchaseinvoices.project = grossprofit001mb.project;
						purchaseinvoices.quantity = grossprofit001mb.quantity;
						purchaseinvoices.salesinvoice = grossprofit001mb.salesinvoice;
						purchaseinvoices.sellingamount = grossprofit001mb.sellingamount;
						purchaseinvoices.warehouse = grossprofit001mb.warehouse;
						purchaseinvoices.insertUser = this.insertUser;
						purchaseinvoices.insertDatetime = this.insertDatetime;
						purchaseinvoices.updatedUser = this.authManager.getcurrentUser.username;
						purchaseinvoices.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.purchaseInvoice);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.purchasesForm.reset();
				this.submitted = false;
				this.id = null;
			});
		}
		else {
			purchaseinvoice.insertUser = this.authManager.getcurrentUser.username;
			purchaseinvoice.insertDatetime = new Date();
			this.purchaseInvoiceManager.purchaseinvoicesave(purchaseinvoice).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let grossprofit001mb = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
				this.purchaseInvoice?.push(grossprofit001mb);
				const newItems = [JSON.parse(JSON.stringify(grossprofit001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.purchasesForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.purchasesForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.purchaseInvoiceManager.purchaseInvoicePdf().subscribe((response) =>{
            saveAs(response,"PurchaseInvoiseList");

		});
	}

	onGenerateExcelReport(){
		this.purchaseInvoiceManager.purchaseInvoiceExcel().subscribe((response) => {
			saveAs(response,"PurchaseInvoiseList");
        })
	}

}