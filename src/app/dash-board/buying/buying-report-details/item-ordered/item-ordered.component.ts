import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemOrderedManager } from 'src/app/shared/services/restcontroller/bizservice/item-ordered.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Reqitemorder001mb } from 'src/app/shared/services/restcontroller/entities/Reqitemorder001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-item-ordered',
	templateUrl: './item-ordered.component.html',
	styleUrls: ['./item-ordered.component.css']
})
export class ItemOrderedComponent implements OnInit {

	frameworkComponents: any;
	submitted = false;
	orderForm: FormGroup | any;
	mrsId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itemname: string = "Dummy.status";
	itemtype: string = "dummy";
	mrSeries: string = "";
	date: Date | null = null;
	itemCode: string = "";
	quantity: number | any;
	orderedqty: number | any;
	qtyrtoorder: number | any;
	description: string | null = "";
	company: string = "";
	qtytoorder: number |any ;
	itemlist: Itemdt001mb[]=[];
	public gridOptions: GridOptions | any;

	constructor( private salesitemManager:SalesItemManager,
		private systemPropertyService: SystemPropertiesService, 
		private itemOrderedManager: ItemOrderedManager,
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder, 
		private datePipe: DatePipe,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}
	itsystemproperties?: Systemproperties001mb[] = [];
	itemOrder: Reqitemorder001mb[] = [];

	ngOnInit() {
		this.orderForm = this.formBuilder.group({
			mrSeries: ['', Validators.required],
			date: ['', Validators.required],
			itemCode: ['', Validators.required],
			quantity: ['', Validators.required],
			orderedqty: ['', Validators.required],
			qtyrtoorder: ['', Validators.required],
			description: ['', Validators.required],
			company: ['', Validators.required],
			qtytoorder: ['', Validators.required],
		})

		this.createDataGrid001();
		this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
		this.systemPropertyService.system(this.itemname, this.itemtype,).subscribe((response) => {
			this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.itemOrderedManager.allitemord().subscribe((response) => {
			this.itemOrder = deserialize<Reqitemorder001mb[]>(Reqitemorder001mb, response)
			if (this.itemOrder.length > 0) {
				this.gridOptions?.api?.setRowData(this.itemOrder);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.orderForm.controls; }

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
				field: 'mrsId',
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
				headerName: 'MrSeries',
				field: 'mrSeries',
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
				headerName: 'OrderedQty',
				field: 'orderedqty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'QtyTo Order',
				field: 'qtytoorder',
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
		this.mrsId = params.data.mrsId;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.orderForm.patchValue({
			'mrSeries': params.data.mrSeries,
			'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
			'itemCode': params.data.itemCode,
			'quantity': params.data.quantity,
			'orderedqty': params.data.orderedqty,
			'qtyrtoorder': params.data.qtyrtoorder,
			'description': params.data.description,
			'company': params.data.company,
			'qtytoorder': params.data.qtytoorder,
		})
	}

	onDeleteButtonClick(params: any) {
		this.itemOrderedManager.deleteitemorder(params.data.mrsId).subscribe((response) => {
			for (let i = 0; i < this.itemOrder.length; i++) {
				if (this.itemOrder[i].mrsId == params.data.mrsId) {
					this.itemOrder?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item Ordered";
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

	onOrderClick(event:any,orderForm:any) {
		this.markFormGroupTouched(this.orderForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.orderForm.invalid) {
			return;
		}
		let reqitemorder001mb = new Reqitemorder001mb();
		reqitemorder001mb.mrSeries = this.f.mrSeries.value ? this.f.mrSeries.value : "";
		reqitemorder001mb.date = new Date(this.f.date.value);
		reqitemorder001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		reqitemorder001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
		reqitemorder001mb.orderedqty = this.f.orderedqty.value ? this.f.orderedqty.value : null;
		reqitemorder001mb.description = this.f.description.value ? this.f.description.value : "";
		reqitemorder001mb.company = this.f.company.value ? this.f.company.value : "";
		reqitemorder001mb.qtytoorder = this.f.qtytoorder.value ? this.f.qtytoorder.value : null;
		reqitemorder001mb.qtyrtoorder = this.f.qtyrtoorder.value ? this.f.qtyrtoorder.value : null;
		if (this.mrsId) {
			reqitemorder001mb.mrsId = this.mrsId;
			reqitemorder001mb.insertUser = this.insertUser;
			reqitemorder001mb.insertDatetime = this.insertDatetime;
			reqitemorder001mb.updatedUser = this.authManager.getcurrentUser.username;
			reqitemorder001mb.updatedDatetime = new Date();
			this.itemOrderedManager.updateitemorder(reqitemorder001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let itmord = deserialize<Reqitemorder001mb>(Reqitemorder001mb, response);
				for (let itm of this.itemOrder) {
					if (itm.mrsId == itmord.mrsId) {
						itm.company = itmord.company;
						itm.date = itmord.date;
						itm.description = itmord.description;
						itm.itemCode = itmord.itemCode;
						itm.mrSeries = itmord.mrSeries;
						itm.orderedqty = itmord.orderedqty;
						itm.qtyrtoorder = itmord.qtyrtoorder;
						itm.quantity = itmord.quantity;
						itm.qtytoorder = itmord.qtytoorder;
						itm.insertUser = this.insertUser;
						itm.insertDatetime = this.insertDatetime;
						itm.updatedUser = this.authManager.getcurrentUser.username;
						itm.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.itemOrder);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.orderForm.reset();
				this.submitted = false;
				this.mrsId = null;
			})

		}
		else {
			reqitemorder001mb.insertUser = this.authManager.getcurrentUser.username;
			reqitemorder001mb.insertDatetime = new Date();
			this.itemOrderedManager.saveitemorder(reqitemorder001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let itmord = deserialize<Reqitemorder001mb>(Reqitemorder001mb, response);
				this.itemOrder?.push(itmord);
				const newItems = [JSON.parse(JSON.stringify(itmord))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.orderForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.orderForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.itemOrderedManager.itemOrderedPdf().subscribe((response) =>{
            saveAs(response,"ItemOrderedList");

		});
	}

	onGenerateExcelReport(){
		this.itemOrderedManager.itemOrderedExcel().subscribe((response) => {
			saveAs(response,"ItemOrderedList");
        })
	}


}
