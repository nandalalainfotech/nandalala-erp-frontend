import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdStockManager } from 'src/app/shared/services/restcontroller/bizservice/prod-stock.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Prodstockentry001mb } from 'src/app/shared/services/restcontroller/entities/Prodstockentry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-product-stock',
	templateUrl: './product-stock.component.html',
	styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

	prodStockForm: FormGroup | any;
	submitted = false;
	prstockId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	frameworkComponents: any;
	title: string = "";
	status: string = "";
	purpose: string = "";
	stockEntry: string = "";
	name: string = "ProdOrder.status";
	type: string = "status";
	Prodstockentry: Prodstockentry001mb[] = [];
	public gridOptions: GridOptions | any;
	systemproperties?: Systemproperties001mb[] = [];
	constructor(private prodStockManager: ProdStockManager, 
		private systemPropertiesService: SystemPropertiesService, 
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.prodStockForm = this.formBuilder.group({
			title: ['', Validators.required],
			status: ['', Validators.required],
			purpose: ['', Validators.required],
			stockEntry: ['', Validators.required]
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.prodStockManager.allstock().subscribe(response => {
			this.Prodstockentry = deserialize<Prodstockentry001mb[]>(Prodstockentry001mb, response);
			this.gridOptions?.api?.setRowData(this.Prodstockentry);
		})
	}
	get f() { return this.prodStockForm.controls; }
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
				field: 'prstockId',
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
				headerName: 'Title',
				field: 'title',
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
				headerName: 'Purpose',
				field: 'purpose',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Stock Entry',
				field: 'stockEntry',
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
		];
	}

	onEditButtonClick(params: any) {
		this.prstockId = params.data.prstockId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.prodStockForm.patchValue({
			'title': params.data.title,
			'status': params.data.status,
			'purpose': params.data.purpose,
			'stockEntry': params.data.stockEntry
		});
	}

	onDeleteButtonClick(params: any) {
		this.prodStockManager.stockdelete(params.data.prstockId).subscribe((response) => {
			for (let i = 0; i < this.Prodstockentry.length; i++) {
				if (this.Prodstockentry[i].prstockId == params.data.prstockId) {
					this.Prodstockentry?.splice(i, 1);
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
        modalRef.componentInstance.title = "Product Stock Entry";
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
	onOrderClick(event: any, prodStockForm: any) {
		this.markFormGroupTouched(this.prodStockForm);
		this.submitted = true;
		if (this.prodStockForm.invalid) {
			return;
		}
		let prodstockentry001mb = new Prodstockentry001mb();
		prodstockentry001mb.title = this.f.title.value ? this.f.title.value : "";
		prodstockentry001mb.status = this.f.status.value ? this.f.status.value : "";
		prodstockentry001mb.purpose = this.f.purpose.value ? this.f.purpose.value : "";
		prodstockentry001mb.stockEntry = this.f.stockEntry.value ? this.f.stockEntry.value : "";
		if (this.prstockId) {
			prodstockentry001mb.prstockId = this.prstockId;
			prodstockentry001mb.insertUser = this.insertUser;
			prodstockentry001mb.insertDatetime = this.insertDatetime;
			prodstockentry001mb.updatedUser = this.authManager.getcurrentUser.username;
			prodstockentry001mb.updatedDatetime = new Date();
			this.prodStockManager.stockupdate(prodstockentry001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let prodstockentry001mb = deserialize<Prodstockentry001mb>(Prodstockentry001mb, response);
				for (let prodstock of this.Prodstockentry) {
					if (prodstock.prstockId == prodstockentry001mb.prstockId) {
						prodstock.purpose = prodstockentry001mb.purpose;
						prodstock.status = prodstockentry001mb.status;
						prodstock.stockEntry = prodstockentry001mb.stockEntry;
						prodstock.title = prodstockentry001mb.title;
						prodstock.insertUser = this.insertUser;
						prodstock.insertDatetime = this.insertDatetime;
						prodstock.updatedUser = this.authManager.getcurrentUser.username;
						prodstock.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.Prodstockentry);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prodStockForm.reset();
				this.prstockId = null;
				this.submitted = false;
			})
		}
		else {
			prodstockentry001mb.insertUser = this.authManager.getcurrentUser.username;
			prodstockentry001mb.insertDatetime = new Date();
			this.prodStockManager.stocksave(prodstockentry001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let prodstockentry001mb = deserialize<Prodstockentry001mb>(Prodstockentry001mb, response);
				this.Prodstockentry?.push(prodstockentry001mb);
				const newItems = [JSON.parse(JSON.stringify(prodstockentry001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.prodStockForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.submitted = false;
		this.prodStockForm.reset();
	}

	onGeneratePdfReport(){
		this.prodStockManager.prodStockPdf().subscribe((response) =>{
			saveAs(response,'ProductionStockList');

		});
	}

	onGenerateExcelReport(){
	
		this.prodStockManager.prodStockExcel().subscribe((response) => {
			
			saveAs(response,'ProductionStockList');
        })
	}

}