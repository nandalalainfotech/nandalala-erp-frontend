import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnGroup, GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemStatusManager } from 'src/app/shared/services/restcontroller/bizservice/item-status.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Itemst001mb } from 'src/app/shared/services/restcontroller/entities/Itemst001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-item-status',
	templateUrl: './item-status.component.html',
	styleUrls: ['./item-status.component.css']
})

export class ItemStatusComponent implements OnInit {
	itemsForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	itemstId: number | any;
	insertUser: string = "";
	insertDatetime: Date | any;
	itemcode: string = "";
	status: string = "";
	itemGroup: string = "";
	name: string = "Itembom.status";
	type: string = "status";
	Gname: string = "Item.Group";
	Gtype: string = "Group";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	dummysystemproperties: Systemproperties001mb[] = [];
	itemStatus: Itemst001mb[] = [];
	itemlist: Itemdt001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	Gsystemproperties?: Systemproperties001mb[] = [];

	constructor(private itemStatusManager: ItemStatusManager,
		private formBuilder: FormBuilder,
		private salesitemManager: SalesItemManager,
		private systemPropertiesService: SystemPropertiesService,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.itemsForm = this.formBuilder.group({
			itemcode: ['', Validators.required],
			status: ['', Validators.required],
			itemGroup: ['', Validators.required]
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.Gname, this.Gtype).subscribe(response => {
			this.Gsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		//dropdown
		this.salesitemManager.allsalesitem().subscribe(response => {
			this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		})
		this.itemStatusManager.allitems().subscribe(response => {
			this.itemStatus = deserialize<Itemst001mb[]>(Itemst001mb, response);
			if (this.itemStatus.length > 0) {
				this.gridOptions?.api?.setRowData(this.itemStatus);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}

	get f() { return this.itemsForm.controls; }

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
				headerName: '#Id',
				field: 'itemstId',
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
				field: 'itemcode',
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
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 100,
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
				width: 100,
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
				width: 100,
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
		this.itemstId = params.data.itemstId;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.itemsForm.patchValue({
			'itemcode': params.data.itemcode,
			'status': params.data.status,
			'itemGroup': params.data.itemGroup,
		});
	}

	onDeleteButtonClick(params: any, itemsForm: any) {
		this.itemStatusManager.itemdelete(params.data.itemstId).subscribe((response) => {
			for (let i = 0; i < this.itemStatus.length; i++) {
				if (this.itemStatus[i].itemstId == params.data.itemstId) {
					this.itemStatus?.splice(i, 1);
					break;
				}
			}
			const selectedRows = params.api.getSelectedRows();
			params.api.applyTransaction({ remove: selectedRows });
			this.calloutService.showSuccess("Order Removed Successfully");
			this.gridOptions.api.deselectAll();
		});
	}

	onAuditButtonClick(params: any) {
		const modalRef = this.modalService.open(AuditComponent);
		modalRef.componentInstance.title = "Item Status";
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

	onOrderClick(event: any, itemsForm: any) {
		this.markFormGroupTouched(this.itemsForm);
		this.submitted = true;
		if (this.itemsForm.invalid) {
			return;
		}

		let itemst001mb = new Itemst001mb();
		itemst001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
		itemst001mb.status = this.f.status.value ? this.f.status.value : "";
		itemst001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		if (this.itemstId) {
			itemst001mb.itemstId = this.itemstId;
			itemst001mb.insertUser = this.insertUser;
			itemst001mb.insertDatetime = this.insertDatetime;
			itemst001mb.updatedUser = this.authManager.getcurrentUser.username;
			itemst001mb.updatedDatetime = new Date();
			this.itemStatusManager.itemupdate(itemst001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let itemRes = deserialize<Itemst001mb>(Itemst001mb, response);
				for (let itemSt of this.itemStatus) {
					if (itemSt.itemstId == itemRes.itemstId) {
						itemSt.itemcode = itemRes.itemcode;
						itemSt.status = itemRes.status;
						itemSt.itemGroup = itemRes.itemGroup;
						itemSt.insertUser = this.insertUser;
						itemSt.insertDatetime = this.insertDatetime;
						itemSt.updatedUser = this.authManager.getcurrentUser.username;
						itemSt.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.itemStatus);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.itemsForm.reset();
				this.itemstId = null;
				this.submitted = false;
			});
		}
		else {
			itemst001mb.insertUser = this.authManager.getcurrentUser.username;
			itemst001mb.insertDatetime = new Date();
			this.itemStatusManager.itemsave(itemst001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let item = deserialize<Itemst001mb>(Itemst001mb, response);
				this.itemStatus?.push(item);
				const newItems = [JSON.parse(JSON.stringify(item))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.itemsForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.itemsForm.reset();
	}

	onGeneratePdfReport(){
		this.itemStatusManager.itemStatusPdf().subscribe((response) =>{
			saveAs(response,'ItemStatusLst');

		});
	}

	onGenerateExcelReport(){
		this.itemStatusManager.itemStatusExcel().subscribe((response) => {
			saveAs(response,'ItemStatusLst');
        })
	}

}