import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SupplierWiseAnalyticsManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-wise-analytics.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Swsanalytics001mb } from 'src/app/shared/services/restcontroller/entities/Swsanalytics001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-supplier-wise-analytics',
	templateUrl: './supplier-wise-analytics.component.html',
	styleUrls: ['./supplier-wise-analytics.component.css']
})
export class SupplierWiseAnalyticsComponent implements OnInit {

	frameworkComponents: any;
	swsId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	name: string = "dummy.status";
	type: string = "dummy";
	itemCode: string = "";
	description: string | null = "";
	swsUom: string = "";
	consQty: number | any;
	consAmt: string | null = "";
	delQty: number | any;
	delAmt: string | null = "";
	totalQty: number | any;
	totalAmt: string | null = "";
	supplierWise: Swsanalytics001mb[] = [];
	supplierAnalyticForm: FormGroup | any;
	submitted = false;
	systemproperties?: Systemproperties001mb[] = [];
	itemlist: Itemdt001mb[]=[];
	public gridOptions: GridOptions | any;

	constructor(private systemPropertiesService: SystemPropertiesService, 
		private formBuilder: FormBuilder,
		private supplierWiseAnalyticsManager: SupplierWiseAnalyticsManager,
		private salesitemManager:SalesItemManager,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}
	ngOnInit() {

		this.supplierAnalyticForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			description: ['', Validators.required],
			swsUom: ['', Validators.required],
			consQty: ['', Validators.required],
			consAmt: ['', Validators.required],
			delQty: ['', Validators.required],
			delAmt: ['', Validators.required],
			totalQty: ['', Validators.required],
			totalAmt: ['', Validators.required]
		});

		this.createDataGrid001();
		this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
		this.supplierWiseAnalyticsManager.allsupplierwise().subscribe((response) => {
			this.supplierWise = deserialize<Swsanalytics001mb[]>(Swsanalytics001mb, response);
			if (this.supplierWise.length > 0) {
				this.gridOptions?.api?.setRowData(this.supplierWise);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.supplierAnalyticForm.controls; }
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
				field: 'swsId',
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
				headerName: 'UOM',
				field: 'swsUom',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Consumed Qty',
				field: 'consQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Consumed Amt',
				field: 'consAmt',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Deleted Qty',
				field: 'delQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Deleted Amt',
				field: 'delAmt',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Qty',
				field: 'totalQty',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Amt',
				field: 'totalAmt',
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
		this.swsId = params.data.swsId;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.supplierAnalyticForm.patchValue({
			'itemCode': params.data.itemCode,
			'description': params.data.description,
			'swsUom': params.data.swsUom,
			'consQty': params.data.consQty,
			'consAmt': params.data.consAmt,
			'delQty': params.data.delQty,
			'delAmt': params.data.delAmt,
			'totalQty': params.data.totalQty,
			'totalAmt': params.data.totalAmt,
		});
	}
	onDeleteButtonClick(params: any) {
		this.supplierWiseAnalyticsManager.deletesupplierwise(params.data.swsId).subscribe((response) => {
			for (let i = 0; i < this.supplierWise.length; i++) {
				if (this.supplierWise[i].swsId == params.data.swsId) {
					this.supplierWise?.splice(i, 1);
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
        modalRef.componentInstance.title = "Supplier Wise Analytics";
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
	onOrderClick(event: any, supplierAnalyticForm: any) {
		this.markFormGroupTouched(this.supplierAnalyticForm);
		this.submitted = true;
		if (this.supplierAnalyticForm.invalid) {
			return;
		}

		let swsanalytics001mb = new Swsanalytics001mb();
		swsanalytics001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		swsanalytics001mb.description = this.f.description.value ? this.f.description.value : "";
		swsanalytics001mb.swsUom = this.f.swsUom.value ? this.f.swsUom.value : "";
		swsanalytics001mb.consQty = this.f.consQty.value ? this.f.consQty.value : null;
		swsanalytics001mb.consAmt = this.f.consAmt.value ? this.f.consAmt.value : "";
		swsanalytics001mb.delQty = this.f.delQty.value ? this.f.delQty.value : null;
		swsanalytics001mb.delAmt = this.f.delAmt.value ? this.f.delAmt.value : "";
		swsanalytics001mb.totalQty = this.f.totalQty.value ? this.f.totalQty.value : null;
		swsanalytics001mb.totalAmt = this.f.totalAmt.value ? this.f.totalAmt.value : "";
		if (this.swsId) {
			swsanalytics001mb.swsId = this.swsId;
			swsanalytics001mb.insertUser = this.insertUser;
			swsanalytics001mb.insertDatetime = this.insertDatetime;
			swsanalytics001mb.updatedUser = this.authManager.getcurrentUser.username;
			swsanalytics001mb.updatedDatetime = new Date();
			this.supplierWiseAnalyticsManager.supplierwiseupdate(swsanalytics001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let supplieranaly = deserialize<Swsanalytics001mb>(Swsanalytics001mb, response);
				for (let supply of this.supplierWise) {
					if (supply.swsId == supplieranaly.swsId) {
						supply.itemCode = supplieranaly.itemCode;
						supply.description = supplieranaly.description;
						supply.swsUom = supplieranaly.swsUom;
						supply.consQty = supplieranaly.consQty;
						supply.consAmt = supplieranaly.consAmt;
						supply.delQty = supplieranaly.delQty;
						supply.delAmt = supplieranaly.delAmt;
						supply.totalQty = supplieranaly.totalQty;
						supply.totalAmt = supplieranaly.totalAmt;
						supply.insertUser = this.insertUser;
						supply.insertDatetime = this.insertDatetime;
						supply.updatedUser = this.authManager.getcurrentUser.username;
						supply.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.supplierWise);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.supplierAnalyticForm.reset();
				this.submitted = false;
				this.swsId = null;
			})
		}
		else {
			swsanalytics001mb.insertUser = this.authManager.getcurrentUser.username;
			swsanalytics001mb.insertDatetime = new Date();
			this.supplierWiseAnalyticsManager.supplierwisesave(swsanalytics001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let supplieranaly = deserialize<Swsanalytics001mb>(Swsanalytics001mb, response);
				this.supplierWise.push(supplieranaly);
				const newItems = [JSON.parse(JSON.stringify(supplieranaly))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.supplierAnalyticForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.supplierAnalyticForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.supplierWiseAnalyticsManager.supplierWiseAnalyticsPdf().subscribe((response) =>{
            saveAs(response,"SupplierWiseList");

		});
	}

	onGenerateExcelReport(){
		this.supplierWiseAnalyticsManager.supplierWiseAnalyticsExcel().subscribe((response) => {
			saveAs(response,"SupplierWiseList");
        })
	}

}