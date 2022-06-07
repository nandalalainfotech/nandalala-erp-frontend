import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesInvoiceManager } from 'src/app/shared/services/restcontroller/bizservice/sales-invoice.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Grossprofit001mb } from 'src/app/shared/services/restcontroller/entities/Grossprofit001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-sales-invoice',
	templateUrl: './sales-invoice.component.html',
	styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {

	frameworkComponents: any;
	saleForm: FormGroup | any;
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
	salesInvoices: Grossprofit001mb[] = [];

	constructor(private salesinvoiceManager: SalesInvoiceManager,
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

	ngOnInit(): void {
		this.createDataGrid001();
		this.saleForm = this.formBuilder.group({
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
		this.salesinvoiceManager.allsalesinvoice().subscribe((response) => {
			this.salesInvoices = deserialize<Grossprofit001mb[]>(Grossprofit001mb, response);
			if (this.salesInvoices.length > 0) {
				this.gridOptions?.api?.setRowData(this.salesInvoices);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.saleForm.controls }

	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRendered: this.onFirstDataRendered.bind(this)
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
		this.saleForm.patchValue({
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
		this.salesinvoiceManager.salesinvoicedelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.salesInvoices.length; i++) {
				if (this.salesInvoices[i].id == params.data.id) {
					this.salesInvoices?.splice(i, 1);
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
        modalRef.componentInstance.title = "Sales Invoice Trends";
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

	onOrderClick(event: any, saleForm: any) {
		this.markFormGroupTouched(this.saleForm);
		this.submitted = true;
		if (this.saleForm.invalid) {
			return;
		}
		let salesinvoice = new Grossprofit001mb();
		salesinvoice.averagebuyingrate = this.f.averagebuyingrate.value ? this.f.averagebuyingrate.value : null;
		salesinvoice.averagesellingrate = this.f.averagesellingrate.value ? this.f.averagesellingrate.value : null;
		salesinvoice.buyingamount = this.f.buyingamount.value ? this.f.buyingamount.value : null;
		salesinvoice.currency = this.f.currency.value ? this.f.currency.value : null;
		salesinvoice.customer = this.f.customer.value ? this.f.customer.value : "";
		salesinvoice.description = this.f.description.value ? this.f.description.value : "";
		salesinvoice.grosspercentage = this.f.grosspercentage.value ? this.f.grosspercentage.value : null;
		salesinvoice.grossprofit = this.f.grossprofit.value ? this.f.grossprofit.value : null;
		salesinvoice.itemname = this.f.itemname.value ? this.f.itemname.value : "";
		salesinvoice.postingdate = new Date(this.f.postingdate.value);
		salesinvoice.project = this.f.project.value ? this.f.project.value : "";
		salesinvoice.quantity = this.f.quantity.value ? this.f.quantity.value : null;
		salesinvoice.salesinvoice = this.f.salesinvoice.value ? this.f.salesinvoice.value : "";
		salesinvoice.sellingamount = this.f.sellingamount.value ? this.f.sellingamount.value : null;
		salesinvoice.warehouse = this.f.warehouse.value ? this.f.warehouse.value : "";
		if (this.id) {
			salesinvoice.id = this.id;
			salesinvoice.insertUser = this.insertUser;
			salesinvoice.insertDatetime = this.insertDatetime;
			salesinvoice.updatedUser = this.authManager.getcurrentUser.username;
			salesinvoice.updatedDatetime = new Date();
			this.salesinvoiceManager.salesinvoiceupdate(salesinvoice).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let grossprofit001mb = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
				for (let salesinvoices of this.salesInvoices) {
					if (salesinvoices.id == grossprofit001mb.id) {
						salesinvoices.averagebuyingrate = grossprofit001mb.averagebuyingrate;
						salesinvoices.averagesellingrate = grossprofit001mb.averagesellingrate;
						salesinvoices.buyingamount = grossprofit001mb.buyingamount;
						salesinvoices.currency = grossprofit001mb.currency;
						salesinvoices.customer = grossprofit001mb.customer;
						salesinvoices.description = grossprofit001mb.description;
						salesinvoices.grosspercentage = grossprofit001mb.grosspercentage;
						salesinvoices.grossprofit = grossprofit001mb.grossprofit;
						salesinvoices.itemname = grossprofit001mb.itemname;
						salesinvoices.postingdate = grossprofit001mb.postingdate;
						salesinvoices.project = grossprofit001mb.project;
						salesinvoices.quantity = grossprofit001mb.quantity;
						salesinvoices.salesinvoice = grossprofit001mb.salesinvoice;
						salesinvoices.sellingamount = grossprofit001mb.sellingamount;
						salesinvoices.warehouse = grossprofit001mb.warehouse;
						salesinvoices.insertUser = this.insertUser;
						salesinvoices.insertDatetime = this.insertDatetime;
						salesinvoices.updatedUser = this.authManager.getcurrentUser.username;
						salesinvoices.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.salesInvoices);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.saleForm.reset();
				this.submitted = false;
				this.id = null;
			});
		}
		else {
			salesinvoice.insertUser = this.authManager.getcurrentUser.username;
			salesinvoice.insertDatetime = new Date();
			this.salesinvoiceManager.salesinvoicesave(salesinvoice).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let grossprofit001mb = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
				this.salesInvoices?.push(grossprofit001mb);
				const newItems = [JSON.parse(JSON.stringify(grossprofit001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.saleForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.saleForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.salesinvoiceManager.salesinvoicePdf().subscribe((response) =>{
            saveAs(response,"SalesInvoiceList");

		});
	}

	onGenerateExcelReport(){
		this.salesinvoiceManager.salesinvoiceExcel().subscribe((response) => {
			saveAs(response,"SalesInvoiceList");
        })
	}

}
