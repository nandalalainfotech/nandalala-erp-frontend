import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdPlanManager } from 'src/app/shared/services/restcontroller/bizservice/prod-plan.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Prodplan001mb } from 'src/app/shared/services/restcontroller/entities/Prodplan001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-product-plan',
	templateUrl: './product-plan.component.html',
	styleUrls: ['./product-plan.component.css']
})
export class ProductPlanComponent implements OnInit {
	prodPlanForm: FormGroup | any;
	submitted = false;
	prplanId: number | any;
	insertUser: string = "";
	insertDatetime: Date | any;
	frameworkComponents: any;
	getitems: string = "";
	itemCodelist: string = "";
	bomNo: string = "";
	plannedQty: string = "";
	description: string = "";
	pendingQty: string = "";
	name: string = "Product.Planning";
	type: string = "Planning";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	dummysystemproperties: Systemproperties001mb[] = [];
	itemlist: Itemdt001mb[] = [];
	prodPlans: Prodplan001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private prodPlanManager: ProdPlanManager,
		private systemPropertiesService: SystemPropertiesService,
		private salesitemManager: SalesItemManager,
		private calloutService: CalloutService,
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.prodPlanForm = this.formBuilder.group({
			getitems: ['', Validators.required],
			itemCodelist: ['', Validators.required],
			bomNo: ['', Validators.required],
			plannedQty: ['', Validators.required],
			pendingQty: ['', Validators.required],
			description: ['', Validators.required]

		})
		this.createDataGrid001mb();
		this.salesitemManager.allsalesitem().subscribe(response => {
			this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		})
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.prodPlanManager.allplan().subscribe(response => {
			this.prodPlans = deserialize<Prodplan001mb[]>(Prodplan001mb, response);
			if (this.prodPlans.length > 0) {
				this.gridOptions?.api?.setRowData(this.prodPlans);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}
	get f() { return this.prodPlanForm.controls; }

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
				field: 'prplanId',
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
				headerName: 'Get Items Form',
				field: 'getItems',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Item Code',
				field: 'itemCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Bom No',
				field: 'bomNo',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Planned Quantity',
				field: 'plannedQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Pending Quantity',
				field: 'pendingQty',
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
				width: 105,
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
		]

	}

	onEditButtonClick(params: any) {
		this.prplanId = params.data.prplanId;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.prodPlanForm.patchValue({
			'bomNo': params.data.bomNo,
			'description': params.data.description,
			'getitems': params.data.getItems,
			'itemCodelist': params.data.itemCode,
			'pendingQty': params.data.pendingQty,
			'plannedQty': params.data.plannedQty,
		});
	}

	onDeleteButtonClick(params: any) {
		this.prodPlanManager.plandelete(params.data.prplanId).subscribe((response) => {
			for (let i = 0; i < this.prodPlans.length; i++) {
				if (this.prodPlans[i].prplanId == params.data.prplanId) {
					this.prodPlans?.splice(i, 1);
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
		modalRef.componentInstance.title = "Product Planning Tool";
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

	onOrderClick(event: any, prodPlanForm: any) {
		this.markFormGroupTouched(this.prodPlanForm);

		this.submitted = true;
		if (this.prodPlanForm.invalid) {
			return;
		}
		let prodplan001mb = new Prodplan001mb();
		prodplan001mb.bomNo = this.f.bomNo.value ? this.f.bomNo.value : "";
		prodplan001mb.description = this.f.description.value ? this.f.description.value : "";
		prodplan001mb.getItems = this.f.getitems.value ? this.f.getitems.value : "";
		prodplan001mb.itemCode = this.f.itemCodelist.value ? this.f.itemCodelist.value : "";
		prodplan001mb.pendingQty = this.f.pendingQty.value ? this.f.pendingQty.value : "";
		prodplan001mb.plannedQty = this.f.plannedQty.value ? this.f.plannedQty.value : "";
		if (this.prplanId) {
			prodplan001mb.prplanId = this.prplanId;
			prodplan001mb.insertUser = this.insertUser;
			prodplan001mb.insertDatetime = this.insertDatetime;
			prodplan001mb.updatedUser = this.authManager.getcurrentUser.username;
			prodplan001mb.updatedDatetime = new Date();
			this.prodPlanManager.planupdate(prodplan001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let prodplanResp = deserialize<Prodplan001mb>(Prodplan001mb, response);
				for (let proPlan of this.prodPlans) {
					if (proPlan.prplanId == prodplanResp.prplanId) {
						proPlan.bomNo = prodplanResp.bomNo;
						proPlan.description = prodplanResp.description;
						proPlan.getItems = prodplanResp.getItems;
						proPlan.itemCode = prodplanResp.itemCode;
						proPlan.pendingQty = prodplanResp.pendingQty;
						proPlan.plannedQty = prodplanResp.plannedQty;
						proPlan.insertUser = this.insertUser;
						proPlan.insertDatetime = this.insertDatetime;
						proPlan.updatedUser = this.authManager.getcurrentUser.username;
						proPlan.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.prodPlans);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prodPlanForm.reset();
				this.prplanId = null;
				this.submitted = false;
			})
		}
		else {
			prodplan001mb.insertUser = this.authManager.getcurrentUser.username;
			prodplan001mb.insertDatetime = new Date();
			this.prodPlanManager.plansave(prodplan001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let prodplan001mb = deserialize<Prodplan001mb>(Prodplan001mb, response);
				this.prodPlans?.push(prodplan001mb);
				const newItems = [JSON.parse(JSON.stringify(prodplan001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.prodPlanForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.submitted = false;
		this.prodPlanForm.reset();
	}

	onGeneratePdfReport(){
		this.prodPlanManager.proPlanPdf().subscribe((response) =>{
			saveAs(response,'ProductionPlanToolList');

		});
	}

	onGenerateExcelReport(){
		this.prodPlanManager.proPlanExcel().subscribe((response) =>{
			saveAs(response,'ProductionPlanToolList');

		});
	}
}

