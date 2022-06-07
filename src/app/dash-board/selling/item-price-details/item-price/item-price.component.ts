import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemPriceManager } from 'src/app/shared/services/restcontroller/bizservice/item-price.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Itemprice001mb } from 'src/app/shared/services/restcontroller/entities/Itemprice001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-item-price',
	templateUrl: './item-price.component.html',
	styleUrls: ['./item-price.component.css']
})

export class ItemPriceComponent implements OnInit {
	priceForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	ipId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itemname: string = "Dummy.status";
	itemtype: string = "dummy"
	groupname: string = "Item.Group";
	grouptype: string = "Group";
	statusname: string = "Itembom.status";
	statustype: string = "status";
	itemCode: string = "";
	itemGroup: string = "";
	status: string = "";
	itemlist: Itemdt001mb[]=[];
	public gridOptions: GridOptions | any;
	itemPr: Itemprice001mb[] = [];
	isystemproperties?: Systemproperties001mb[] = [];
	grpsystemproperties?: Systemproperties001mb[] = [];
	statussystemproperties?: Systemproperties001mb[] = [];

	constructor(private salesitemManager:SalesItemManager,
		private systemPropertiesService: SystemPropertiesService,
		private itemPriceManager: ItemPriceManager, 
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManger: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.priceForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			itemGroup: ['', Validators.required],
			status: ['', Validators.required]
		})
		this.createDataGrid001();
		this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        });
		this.systemPropertiesService.system(this.itemname, this.itemtype,).subscribe(response => {
			this.isystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.groupname, this.grouptype,).subscribe(response => {
			this.grpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.statusname, this.statustype,).subscribe(response => {
			this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.itemPriceManager.allitemprice().subscribe(response => {
			this.itemPr = deserialize<Itemprice001mb[]>(Itemprice001mb, response);
			if (this.itemPr.length > 0) {
				this.gridOptions?.api?.setRowData(this.itemPr);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.priceForm.controls }
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
				field: 'ipId',
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
				headerName: 'Group',
				field: 'itemGroup',
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
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 50,
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
				width: 85,
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
                width: 55,
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
		this.ipId = params.data.ipId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.priceForm.patchValue({
			'itemCode': params.data.itemCode,
			'itemGroup': params.data.itemGroup,
			'status': params.data.status,
		})
	}

	onDeleteButtonClick(params: any) {
		this.itemPriceManager.deleteitemprice(params.data.ipId).subscribe((response) => {
			for (let i = 0; i < this.itemPr.length; i++) {
				if (this.itemPr[i].ipId == params.data.ipId) {
					this.itemPr?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item Price";
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
	onOrderClick(event: any, priceForm: any) {
		this.markFormGroupTouched(this.priceForm);
		this.submitted = true;
		if (this.priceForm.invalid) {
			return;
		}
		let itemprice001mb = new Itemprice001mb();
		itemprice001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		itemprice001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		itemprice001mb.status = this.f.status.value ? this.f.status.value : "";
		if (this.ipId) {
			itemprice001mb.ipId = this.ipId;
			itemprice001mb.insertUser = this.insertUser;
			itemprice001mb.insertDatetime = this.insertDatetime;
			itemprice001mb.updatedUser = this.authManger.getcurrentUser.username;
			itemprice001mb.updatedDatetime = new Date();
			this.itemPriceManager.updateitemprice(itemprice001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let Prices = deserialize<Itemprice001mb>(Itemprice001mb, response);
				for (let item of this.itemPr) {
					if (item.ipId == Prices.ipId) {
						item.itemGroup = Prices.itemGroup;
						item.itemCode = Prices.itemCode;
						item.status = Prices.status;
						item.insertUser = this.insertUser;
						item.insertDatetime = this.insertDatetime;
						item.updatedUser = this.authManger.getcurrentUser.username;
						item.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.itemPr);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.priceForm.reset();
				this.ipId = null;
				this.submitted = false;
			});
		} else {
			itemprice001mb.insertUser = this.authManger.getcurrentUser.username;
			itemprice001mb.insertDatetime = new Date();
			this.itemPriceManager.saveitemprice(itemprice001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let Prices = deserialize<Itemprice001mb>(Itemprice001mb, response);
				this.itemPr?.push(Prices);
				const newItems = [JSON.parse(JSON.stringify(Prices))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.priceForm.reset();
				this.submitted = false;
			});
		}
	}
	onReset() {
		this.submitted = false;
		this.priceForm.reset();
	}

	onGeneratePdfReport(){
		this.itemPriceManager.itemPricePdf().subscribe((response) =>{
            saveAs(response,"ItemPriceList");

		});
	}

	onGenerateExcelReport(){
		this.itemPriceManager.itemPriceExcel().subscribe((response) => {
			saveAs(response,"ItemPriceList");
        })
	}
}