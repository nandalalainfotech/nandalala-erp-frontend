import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

	frameworkComponents: any;
	itemForm: FormGroup | any;
	submitted = false;
	itemid: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itemcode: string | null = "";
	quantity: number | any;
	rate?: string | null = "";
	amount: string | null = "";
	item: Itemdt001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private salesItemManager: SalesItemManager,
		private calloutService: CalloutService,
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.itemForm = this.formBuilder.group({
			itemcode: ['', Validators.required],
			quantity: ['', Validators.required],
			rate: ['', Validators.required],
			amount: ['', [Validators.required]],
		})
		this.createDataGrid001();
		this.salesItemManager.allsalesitem().subscribe(response => {
			this.item = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
			if (this.item.length > 0) {
				this.gridOptions?.api?.setRowData(this.item);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.itemForm.controls; }


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
				field: 'itemid',
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
				headerName: 'Item Code',
				field: 'itemcode',
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
		this.itemid = params.data.itemid;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.itemForm.patchValue({
			'itemcode': params.data.itemcode,
			'quantity': params.data.quantity,
			'rate': params.data.rate,
			'amount': params.data.amount,
		});
	}

	onDeleteButtonClick(params: any) {
		this.salesItemManager.deletesalesitem(params.data.itemid).subscribe(response => {
			for (let i = 0; i < this.item.length; i++) {
				if (this.item[i].itemid == params.data.itemid) {
					this.item?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item";
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

	onOrderClick(event: any, itemForm: any) {
		this.markFormGroupTouched(this.itemForm);
		this.submitted = true;
		if (this.itemForm.invalid) {
			return;
		}
		let itemdt001mb = new Itemdt001mb();
		itemdt001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
		itemdt001mb.quantity = this.f.quantity.value ? this.f.quantity.value : 0;
		itemdt001mb.rate = this.f.rate.value ? this.f.rate.value : "";
		itemdt001mb.amount = this.f.amount.value ? this.f.amount.value : "";
		if (this.itemid) {
			itemdt001mb.itemid = this.itemid;
			itemdt001mb.insertUser = this.insertUser;
            itemdt001mb.insertDatetime = this.insertDatetime;
            itemdt001mb.updatedUser = this.authManager.getcurrentUser.username;
            itemdt001mb.updatedDatetime = new Date();
			this.salesItemManager.updatesalesitem(itemdt001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let sales = deserialize<Itemdt001mb>(Itemdt001mb, response);
				for (let saleItem of this.item) {
					if (saleItem.itemid == sales.itemid) {
						saleItem.itemcode = sales.itemcode;
						saleItem.quantity = sales.quantity;
						saleItem.rate = sales.rate;
						saleItem.amount = sales.amount;
						saleItem.insertUser = this.insertUser;
						saleItem.insertDatetime = this.insertDatetime;
						saleItem.updatedUser = this.authManager.getcurrentUser.username;
						saleItem.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.item);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.itemForm.reset();
				this.submitted = false;
				this.itemid = null;
			});
		}
		else {
			itemdt001mb.insertUser = this.authManager.getcurrentUser.username;
            itemdt001mb.insertDatetime = new Date();
			this.salesItemManager.savesalesitem(itemdt001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let sales = deserialize<Itemdt001mb>(Itemdt001mb, response);
				this.item.push(sales);
				const newItems = [JSON.parse(JSON.stringify(sales))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.itemForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.submitted = false;
		this.itemForm.reset();

	}

	onGeneratePdfReport(){
		this.salesItemManager.salesItemPdf().subscribe((response) =>{
            saveAs(response,"ItemReportDetails");

		});
	}

	onGenerateExcelReport(){
		this.salesItemManager.salesItemExcel().subscribe((response) => {
			saveAs(response,"ItemReportDetails");
        })
	}

}