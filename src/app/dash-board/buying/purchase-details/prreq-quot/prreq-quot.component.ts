import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PrreqQuotReqManager } from 'src/app/shared/services/restcontroller/bizservice/prreq-quot.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Prreqquot001mb } from 'src/app/shared/services/restcontroller/entities/Prreqquot001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-prreq-quot',
	templateUrl: './prreq-quot.component.html',
	styleUrls: ['./prreq-quot.component.css']
})

export class PrreqQuotComponent implements OnInit {
	prReqqForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	prqId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	rqSeries: string = "";
	date: Date | null = null;
	supplier: string = "";
	emailId: string = "";
	contact: string = "";
	itemCode: string = "";
	requiredDate: Date | null = null;
	quantity: string = "";
	warehouse: string = "";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	supname="PRSupp.Type";
	suptupe="Type";
	public gridOptions: GridOptions | any;
	dummysystemproperties: Systemproperties001mb[] = [];
	supsystemproperties:Systemproperties001mb[] = [];
	prReqquot: Prreqquot001mb[] = [];
	itemlist: Itemdt001mb[]=[];

	constructor(private prreqQuotReqManager: PrreqQuotReqManager, 
		private systemPropertiesService: SystemPropertiesService, 
		private formBuilder: FormBuilder,
		private calloutService: CalloutService, 
		private datePipe: DatePipe, 
		private salesitemManager:SalesItemManager,
		private authManager: AuthManager,
		private modalService: NgbModal) {
			
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent,
		}
	}

	ngOnInit() {
		this.prReqqForm = this.formBuilder.group({
			rqSeries: ['', Validators.required],
			date: ['', Validators.required],
			supplier: ['', Validators.required],
			emailId: ['', Validators.required],
			contact: ['', Validators.required],
			requiredDate: ['', Validators.required],
			quantity: ['', Validators.required],
			warehouse: ['', Validators.required],
			itemCode: ['', Validators.required]
		});
		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.supname, this.suptupe).subscribe(response => {
			this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
		this.prreqQuotReqManager.allprreqquot().subscribe((response) => {
			this.prReqquot = deserialize<Prreqquot001mb[]>(Prreqquot001mb, response);
			if (this.prReqquot.length > 0) {
				this.gridOptions?.api?.setRowData(this.prReqquot);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}

		})
	}

	get f() { return this.prReqqForm.controls; }

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
				field: 'prqId',
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
				field: 'rqSeries',
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
			}
			,
			{
				headerName: 'EamilId',
				field: 'emailId',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			}
			,
			{
				headerName: 'Contact',
				field: 'contact',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			}
			,
			{
				headerName: 'Item',
				field: 'itemCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			}
			,
			{
				headerName: 'Required Date',
				field: 'requiredDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.requiredDate ? this.datePipe.transform(params.data.requiredDate, 'MM/dd/yyyy') : '';
				}
			}
			,
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
				headerName: 'WareHouse',
				field: 'warehouse',
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
		this.prqId = params.data.prqId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.prReqqForm.patchValue({
			'rqSeries': params.data.rqSeries,
			'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
			'supplier': params.data.supplier,
			'emailId': params.data.emailId,
			'contact': params.data.contact,
			'itemCode': params.data.itemCode,
			'requiredDate': this.datePipe.transform(params.data.requiredDate, 'MM/dd/yyyy'),
			'quantity': params.data.quantity,
			'warehouse': params.data.warehouse
		});
	}

	onDeleteButtonClick(params: any) {
		this.prreqQuotReqManager.prreqquotdelete(params.data.prqId).subscribe((response) => {
			for (let i = 0; i < this.prReqquot.length; i++) {
				if (this.prReqquot[i].prqId == params.data.prqId) {
					this.prReqquot?.splice(i, 1);
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
		modalRef.componentInstance.title = "Purchase Quotation Request";
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

	onOrderClick(event: any, prReqqForm: any) {
		this.markFormGroupTouched(this.prReqqForm);
		this.submitted = true;
		if (this.prReqqForm.invalid) {
			return;
		}
		let prreqquot001mb = new Prreqquot001mb();
		prreqquot001mb.supplier = this.f.supplier.value ? this.f.supplier.value : "";
		prreqquot001mb.rqSeries = this.f.rqSeries.value ? this.f.rqSeries.value : "";
		prreqquot001mb.date = new Date(this.f.date.value);
		prreqquot001mb.emailId = this.f.emailId.value ? this.f.emailId.value : "";
		prreqquot001mb.contact = this.f.contact.value ? this.f.contact.value : "";
		prreqquot001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		prreqquot001mb.requiredDate = new Date(this.f.requiredDate.value);
		prreqquot001mb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
		prreqquot001mb.warehouse = this.f.warehouse.value ? this.f.warehouse.value : "";
		if (this.prqId) {
			prreqquot001mb.prqId = this.prqId;
			prreqquot001mb.insertUser = this.insertUser;
			prreqquot001mb.insertDatetime = this.insertDatetime;
			prreqquot001mb.updatedUser = this.authManager.getcurrentUser.username;
			prreqquot001mb.updatedDatetime = new Date();
			this.prreqQuotReqManager.prreqquotupdate(prreqquot001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated  Successfully");
				let prreq = deserialize<Prreqquot001mb>(Prreqquot001mb, response);
				for (let purchaseRequest of this.prReqquot) {
					if (purchaseRequest.prqId == prreq.prqId) {
						purchaseRequest.supplier = prreq.supplier;
						purchaseRequest.rqSeries = prreq.rqSeries;
						purchaseRequest.date = prreq.date;
						purchaseRequest.emailId = prreq.emailId;
						purchaseRequest.contact = prreq.contact;
						purchaseRequest.itemCode = prreq.itemCode;
						purchaseRequest.requiredDate = prreq.requiredDate;
						purchaseRequest.quantity = prreq.quantity;
						purchaseRequest.warehouse = prreq.warehouse;
						purchaseRequest.insertUser = this.insertUser;
						purchaseRequest.insertDatetime = this.insertDatetime;
						purchaseRequest.updatedUser = this.authManager.getcurrentUser.username;
						purchaseRequest.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.prReqquot);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prReqqForm.reset();
				this.prqId = null;
				this.submitted = false;
			});
		} else {
			prreqquot001mb.insertUser = this.authManager.getcurrentUser.username;
			prreqquot001mb.insertDatetime = new Date();
			this.prreqQuotReqManager.prreqquotsave(prreqquot001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let prreq = deserialize<Prreqquot001mb>(Prreqquot001mb, response);
				this.prReqquot?.push(prreq);
				const newItems = [JSON.parse(JSON.stringify(prreq))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.prReqqForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.prReqqForm.reset();
	}

	onGeneratePdfReport(){
		this.prreqQuotReqManager.prreqQuotReqPdf().subscribe((response) =>{
			saveAs(response," QuotationRequestDetails");

		});
	}

	onGenerateExcelReport(){
		this.prreqQuotReqManager.prreqQuotReqExcel().subscribe((response) => {
			saveAs(response," QuotationRequestDetails");
        })
	}

}
