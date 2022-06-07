import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProjectQuantityManager } from 'src/app/shared/services/restcontroller/bizservice/projected-quantity.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Stkrepproject001mb } from 'src/app/shared/services/restcontroller/entities/Stkrepproject001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-projected-quantity',
	templateUrl: './projected-quantity.component.html',
	styleUrls: ['./projected-quantity.component.css']
})
export class ProjectedQuantityComponent implements OnInit {

	stprojId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	frameworkComponents: any;
	submitted = false;
	projectForm: FormGroup | any;
	groupname: string = "Item.Group";
	grouptype: string = "Group";
	uom: string | null = "";
	actualQty: number | any;
	brand: string | null = "";
	description: string | null = "";
	itemCode: string | null = "";
	itemGroup: string | null = "";
	orderedQty: number | any;
	plannedQty: number | any;
	reorderQty: number | any;
	reorderValue: number | any;
	requestedQty: number | any;
	reservedQty: number | any;
	shortageQty: number | any;
	wareHouse: string | null = "";
	stkProject: Stkrepproject001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	itemgrpproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	stkitems: Itemdt001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private projectQuantityManager: ProjectQuantityManager, 
		private salesItemManager: SalesItemManager, 
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
		this.projectForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			itemGroup: ['', Validators.required],
			brand: ['', Validators.required],
			wareHouse: ['', Validators.required],
			uom: ['', Validators.required],
			actualQty: ['', Validators.required],
			plannedQty: ['', Validators.required],
			requestedQty: ['', Validators.required],
			description: ['', Validators.required],
			orderedQty: ['', Validators.required],
			reservedQty: ['', Validators.required],
			reorderQty: ['', Validators.required],
			reorderValue: ['', Validators.required],
			shortageQty: ['', Validators.required],
		})
		this.createDataGrid001mb();
		this.systemPropertiesService.system(this.groupname, this.grouptype).subscribe(response => {
			this.itemgrpproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.salesItemManager.allsalesitem().subscribe((response) => {
			this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		})

		this.projectQuantityManager.allstkproject().subscribe((response) => {
			this.stkProject = deserialize<Stkrepproject001mb[]>(Stkrepproject001mb, response);
			if (this.stkProject.length > 0) {
				this.gridOptions?.api?.setRowData(this.stkProject);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.projectForm.controls; }

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
				field: 'stprojId',
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
				headerName: 'ItemGroup',
				field: 'itemGroup',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Brand',
				field: 'brand',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'WareHouse',
				field: 'wareHouse',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'UOM',
				field: 'uom',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual Qty',
				field: 'actualQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Planned Qty',
				field: 'plannedQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Requested Qty',
				field: 'requestedQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Ordered Qty',
				field: 'orderedQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Reserved Qty',
				field: 'reservedQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Reorder Value',
				field: 'reorderValue',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Reorder Qty',
				field: 'reorderQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Shortage Qty',
				field: 'shortageQty',
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
				width: 250,
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
				width: 255,
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
                width: 255,
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
		this.stprojId = params.data.stprojId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.projectForm.patchValue({
			'uom': params.data.uom,
			'actualQty': params.data.actualQty,
			'brand': params.data.brand,
			'description': params.data.description,
			'itemCode': params.data.itemCode,
			'itemGroup': params.data.itemGroup,
			'orderedQty': params.data.orderedQty,
			'plannedQty': params.data.plannedQty,
			'reorderQty': params.data.reorderQty,
			'reorderValue': params.data.reorderValue,
			'requestedQty': params.data.requestedQty,
			'reservedQty': params.data.reservedQty,
			'shortageQty': params.data.shortageQty,
			'wareHouse': params.data.wareHouse,
		})
	}

	onDeleteButtonClick(params: any) {
		this.projectQuantityManager.deletestkproject(params.data.stprojId).subscribe((response) => {
			for (let i = 0; i < this.stkProject.length; i++) {
				if (this.stkProject[i].stprojId == params.data.stprojId) {
					this.stkProject?.splice(i, 1);
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
        modalRef.componentInstance.title = "Projected Quantity";
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

	onOrderClick(event: any, project: any) {
		this.markFormGroupTouched(this.projectForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.projectForm.invalid) {
			return;
		}
		let stkrepproject001mb = new Stkrepproject001mb();
		stkrepproject001mb.uom = this.f.uom.value ? this.f.uom.value : "";
		stkrepproject001mb.actualQty = this.f.actualQty.value ? this.f.actualQty.value : null;
		stkrepproject001mb.brand = this.f.brand.value ? this.f.brand.value : "";
		stkrepproject001mb.description = this.f.description.value ? this.f.description.value : "";
		stkrepproject001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		stkrepproject001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		stkrepproject001mb.orderedQty = this.f.orderedQty.value ? this.f.orderedQty.value : null;
		stkrepproject001mb.plannedQty = this.f.plannedQty.value ? this.f.plannedQty.value : null;
		stkrepproject001mb.reorderQty = this.f.reorderQty.value ? this.f.reorderQty.value : null;
		stkrepproject001mb.reorderValue = this.f.reorderValue.value ? this.f.reorderValue.value : null;
		stkrepproject001mb.requestedQty = this.f.requestedQty.value ? this.f.requestedQty.value : null;
		stkrepproject001mb.reservedQty = this.f.reservedQty.value ? this.f.reservedQty.value : null;
		stkrepproject001mb.shortageQty = this.f.shortageQty.value ? this.f.shortageQty.value : null;
		stkrepproject001mb.wareHouse = this.f.wareHouse.value ? this.f.wareHouse.value : "";
		if (this.stprojId) {
			stkrepproject001mb.stprojId = this.stprojId;
			stkrepproject001mb.insertUser = this.insertUser;
            stkrepproject001mb.insertDatetime = this.insertDatetime;
            stkrepproject001mb.updatedUser = this.authManager.getcurrentUser.username;
            stkrepproject001mb.updatedDatetime = new Date();
			this.projectQuantityManager.updatestkproject(stkrepproject001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let projects = deserialize<Stkrepproject001mb>(Stkrepproject001mb, response);
				for (let stkProjectQty of this.stkProject) {
					if (stkProjectQty.stprojId == projects.stprojId) {
						stkProjectQty.uom = projects.uom;
						stkProjectQty.actualQty = projects.actualQty;
						stkProjectQty.brand = projects.brand;
						stkProjectQty.description = projects.description;
						stkProjectQty.itemCode = projects.itemCode;
						stkProjectQty.itemGroup = projects.itemGroup;
						stkProjectQty.orderedQty = projects.orderedQty;
						stkProjectQty.plannedQty = projects.plannedQty;
						stkProjectQty.reorderQty = projects.reorderQty;
						stkProjectQty.reorderValue = projects.reorderValue;
						stkProjectQty.requestedQty = projects.requestedQty;
						stkProjectQty.reservedQty = projects.reservedQty;
						stkProjectQty.shortageQty = projects.shortageQty;
						stkProjectQty.wareHouse = projects.wareHouse;
						stkProjectQty.insertUser = this.insertUser;
						stkProjectQty.insertDatetime = this.insertDatetime;
						stkProjectQty.updatedUser = this.authManager.getcurrentUser.username;
						stkProjectQty.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.stkProject);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.projectForm.reset();
				this.submitted = false;
				this.stprojId = null;
			});
		} else {
			stkrepproject001mb.insertUser = this.authManager.getcurrentUser.username;
            stkrepproject001mb.insertDatetime = new Date();
			this.projectQuantityManager.savestkproject(stkrepproject001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let projects = deserialize<Stkrepproject001mb>(Stkrepproject001mb, response);
				this.stkProject?.push(projects);
				const newItems = [JSON.parse(JSON.stringify(projects))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.projectForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.projectForm.reset();
		this.submitted = false;
	}


	onGeneratePdfReport() {
		this.projectQuantityManager.projectQuantityPdf().subscribe((response) => {
			saveAs(response, "ProjectedQtyList");

		});
	}

	onGenerateExcelReport() {
		this.projectQuantityManager.projectQuantityExcel().subscribe((response) => {
			saveAs(response, "ProjectedQtyList");
		});
	}

}



