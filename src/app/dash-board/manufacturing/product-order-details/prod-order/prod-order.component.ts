import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdOrderManager } from 'src/app/shared/services/restcontroller/bizservice/prod-order.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Prodorder001mb } from 'src/app/shared/services/restcontroller/entities/Prodorder001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-prod-order',
	templateUrl: './prod-order.component.html',
	styleUrls: ['./prod-order.component.css']
})

export class ProdOrderComponent implements OnInit {

	// @ViewChild('prodOrder') prodOrder: FormGroup | any;

	prodOrderForm: FormGroup | any;
	submitted = false;
	prId: number | any;
	insertUser: string = "";
	insertDatetime: Date | any;
	frameworkComponents: any;
	items: string = "";
	selectorder: string = "";
	code: string = "";
	name: string = "ProdOrder.status";
	type: string = "status";
	prodOrders: Prodorder001mb[] = [];
	prodorder001mb?: Prodorder001mb;
	public systemproperties: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private prodOrderManager: ProdOrderManager,
		private systemPropertiesService: SystemPropertiesService,
		private calloutService: CalloutService,
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			//  linkRenderer: LinkRendererComponent,
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.prodOrderForm = this.formBuilder.group({
			items: ['', Validators.required],
			selectorder: ['', Validators.required],
			code: ['', Validators.required],
		})

		this.createDataGrid001();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});

		this.prodOrderManager.allorders().subscribe(response => {
			this.prodOrders = deserialize<Prodorder001mb[]>(Prodorder001mb, response);
			if (this.prodOrders.length > 0) {
				this.gridOptions?.api?.setRowData(this.prodOrders);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}

	get f() { return this.prodOrderForm.controls; }

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
				field: 'prId',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true,
				suppressSizeToFit: true
			},
			{
				headerName: 'Items To Manufacture',
				field: 'itemtoManufacture',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true
			},
			{
				headerName: 'Status',
				field: 'status',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true
			},
			{
				headerName: 'Product Order Code',
				field: 'prorderCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				cellClass: "grid-cell-centered",
				suppressSizeToFit: true
			},
			{

				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 80,
				flex: 1,
				rowSelection: "multiple",
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
				width: 80,
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
		// params.colDef.cellRendererParams.isActive = false
		this.prId = params.data.prId;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.prodOrderForm.patchValue({
			'items': params.data.itemtoManufacture,
			'code': params.data.prorderCode,
			'selectorder': params.data.status,
		});
	}

	onDeleteButtonClick(params: any) {
		params.isActive = false;
		this.prodOrderManager.proddelete(params.data.prId).subscribe((response) => {
			for (let i = 0; i < this.prodOrders.length; i++) {
				if (this.prodOrders[i].prId == params.data.prId) {
					this.prodOrders?.splice(i, 1);
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
		modalRef.componentInstance.title = "Production Order";
		modalRef.componentInstance.details = params.data
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

	onOrderClick(event: any, prodOrderForm: any) {
		this.markFormGroupTouched(this.prodOrderForm);
		this.submitted = true;
		if (this.prodOrderForm.invalid) {
			return;
		}
		let prodorder001mb = new Prodorder001mb();
		prodorder001mb.itemtoManufacture = this.f.items.value ? this.f.items.value : "";
		prodorder001mb.prorderCode = this.f.code.value ? this.f.code.value : "";
		prodorder001mb.status = this.f.selectorder.value ? this.f.selectorder.value : "";
		if (this.prId) {
			prodorder001mb.prId = this.prId;
			prodorder001mb.insertUser = this.insertUser;
			prodorder001mb.insertDatetime = this.insertDatetime;
			prodorder001mb.updatedUser = this.authManager.getcurrentUser.username;
			prodorder001mb.updatedDatetime = new Date();
			this.prodOrderManager.produpdate(prodorder001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let prodorder001mbResp = deserialize<Prodorder001mb>(Prodorder001mb, response);
				for (let prodOrd of this.prodOrders) {
					if (prodOrd.prId == prodorder001mbResp.prId) {
						prodOrd.itemtoManufacture = prodorder001mbResp.itemtoManufacture;
						prodOrd.prorderCode = prodorder001mbResp.prorderCode;
						prodOrd.status = prodorder001mbResp.status;
						prodOrd.insertUser = this.insertUser;
						prodOrd.insertDatetime = this.insertDatetime;
						prodOrd.updatedUser = this.authManager.getcurrentUser.username;
						prodOrd.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.prodOrders);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prodOrderForm.reset();
				this.prId = null;
				this.submitted = false;
			});
		} else {
			prodorder001mb.insertUser = this.authManager.getcurrentUser.username;
			prodorder001mb.insertDatetime = new Date();
			this.prodOrderManager.prodsave(prodorder001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let prodorder001mb = deserialize<Prodorder001mb>(Prodorder001mb, response);
				this.prodOrders?.push(prodorder001mb);
				const newItems = [JSON.parse(JSON.stringify(prodorder001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.prodOrderForm.reset();
				this.submitted = false;
			});
		}

	}
	onReset() {
		this.submitted = false;
		this.prodOrderForm.reset();
	}

	onGeneratePdfReport(){
		this.prodOrderManager.prodOrderPdf().subscribe((response) =>{
			saveAs(response,'ProductionOrderList');

		});
	}

	onGenerateExcelReport(){
		
		this.prodOrderManager.prodOrderExcel().subscribe((response) => {
			
            saveAs(response,'ProductionOrderList');
        })
	}
}