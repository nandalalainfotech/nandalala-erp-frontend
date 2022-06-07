import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { StockAgeingManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ageing.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Stkrepageing001mb } from 'src/app/shared/services/restcontroller/entities/Stkrepageing001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-stock-ageing',
	templateUrl: './stock-ageing.component.html',
	styleUrls: ['./stock-ageing.component.css']
})
export class StockAgeingComponent implements OnInit {

	frameworkComponents: any;
	submitted = false;
	ageingForm: FormGroup | any;
	stageId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	name: string = "dummy.status";
	type: string = "dummy";
	groupname: string = "Item.Group";
	grouptype: string = "Group";
	uom: string | null = "";
	averageAge: number | any;
	brand: string | null = "";
	description: string | null = "";
	earliest: number | any;
	itemCode: string | null = "";
	itemGroup: string | null = "";
	latest: number | any;
	stkAgeing: Stkrepageing001mb[] = [];
	itemgrpproperties?: Systemproperties001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	stkitems: Itemdt001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private stockAgeingManager: StockAgeingManager, 
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
		this.ageingForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			itemGroup: ['', Validators.required],
			brand: ['', Validators.required],
			averageAge: ['', Validators.required],
			uom: ['', Validators.required],
			description: ['', Validators.required],
			earliest: ['', Validators.required],
			latest: ['', Validators.required],
		})
		this.createDataGrid001mb();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.groupname, this.grouptype).subscribe(response => {
			this.itemgrpproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.salesItemManager.allsalesitem().subscribe((response) => {
			this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		});
		this.stockAgeingManager.allstkageing().subscribe((response) => {
			this.stkAgeing = deserialize<Stkrepageing001mb[]>(Stkrepageing001mb, response);
			if (this.stkAgeing.length > 0) {
				this.gridOptions?.api?.setRowData(this.stkAgeing);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.ageingForm.controls; }

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
				field: 'stageId',
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
				headerName: 'Item Group',
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
				headerName: 'Average Age',
				field: 'averageAge',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Earliest',
				field: 'earliest',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Latest',
				field: 'latest',
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
		]
	}

	onEditButtonClick(params: any) {
		this.stageId = params.data.stageId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.ageingForm.patchValue({
			'uom': params.data.uom,
			'averageAge': params.data.averageAge,
			'brand': params.data.brand,
			'description': params.data.description,
			'earliest': params.data.earliest,
			'itemCode': params.data.itemCode,
			'itemGroup': params.data.itemGroup,
			'latest': params.data.latest,
		})
	}

	onDeleteButtonClick(params: any) {
		this.stockAgeingManager.deletestkageing(params.data.stageId).subscribe((response) => {
			for (let i = 0; i < this.stkAgeing.length; i++) {
				if (this.stkAgeing[i].stageId == params.data.stageId) {
					this.stkAgeing?.splice(i, 1);
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
        modalRef.componentInstance.title = "Stock Ageing";
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

	onOrderClick(event: any, ageing: any) {
		this.markFormGroupTouched(this.ageingForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.ageingForm.invalid) {
			return;
		}
		let stkrepageing001mb = new Stkrepageing001mb();
		stkrepageing001mb.uom = this.f.uom.value ? this.f.uom.value : "";
		stkrepageing001mb.averageAge = this.f.averageAge.value ? this.f.averageAge.value : null;
		stkrepageing001mb.brand = this.f.brand.value ? this.f.brand.value : "";
		stkrepageing001mb.description = this.f.description.value ? this.f.description.value : "";
		stkrepageing001mb.earliest = this.f.earliest.value ? this.f.earliest.value : null;
		stkrepageing001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		stkrepageing001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
		stkrepageing001mb.latest = this.f.latest.value ? this.f.latest.value : null;
		if (this.stageId) {
			stkrepageing001mb.stageId = this.stageId;
			stkrepageing001mb.insertUser = this.insertUser;
            stkrepageing001mb.insertDatetime = this.insertDatetime;
            stkrepageing001mb.updatedUser = this.authManager.getcurrentUser.username;
            stkrepageing001mb.updatedDatetime = new Date();
			this.stockAgeingManager.updatestkageing(stkrepageing001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let ageings = deserialize<Stkrepageing001mb>(Stkrepageing001mb, response);
				for (let stockAgeing of this.stkAgeing) {
					if (stockAgeing.stageId == ageings.stageId) {
						stockAgeing.uom = ageings.uom;
						stockAgeing.averageAge = ageings.averageAge;
						stockAgeing.brand = ageings.brand;
						stockAgeing.description = ageings.description;
						stockAgeing.earliest = ageings.earliest;
						stockAgeing.itemCode = ageings.itemCode;
						stockAgeing.itemGroup = ageings.itemGroup;
						stockAgeing.latest = ageings.latest;
						stockAgeing.insertUser = this.insertUser;
						stockAgeing.insertDatetime = this.insertDatetime;
						stockAgeing.updatedUser = this.authManager.getcurrentUser.username;
						stockAgeing.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.stkAgeing);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.ageingForm.reset();
				this.submitted = false;
				this.stageId = null;
			});
		} else {
			stkrepageing001mb.insertUser = this.authManager.getcurrentUser.username;
            stkrepageing001mb.insertDatetime = new Date();
			this.stockAgeingManager.savestkageing(stkrepageing001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let ageings = deserialize<Stkrepageing001mb>(Stkrepageing001mb, response);
				this.stkAgeing?.push(ageings);
				const newItems = [JSON.parse(JSON.stringify(ageings))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.ageingForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.ageingForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport() {
		this.stockAgeingManager.stockAgeingPdf().subscribe((response) => {
			saveAs(response, "StockAgeingList");

		});
	}

	onGenerateExcelReport() {
		this.stockAgeingManager.stockAgeingExcel().subscribe((response) => {
			saveAs(response, "StockAgeingList");
		});
	}
}


