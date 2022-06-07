import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MaterialManager } from 'src/app/shared/services/restcontroller/bizservice/material.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.css']
})

export class MaterialComponent implements OnInit {
	frameworkComponents: any;
	materialForm: FormGroup | any;
	itemid: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itemcode: string | null = "";
	quantity: number | any;
	rate: number | any;
	amount: number | any;
	submitted = false;
	material: Itemdt001mb[] = [];
	public gridOptions: GridOptions | any;


	constructor(private materialManager: MaterialManager,
		private formBuilder: FormBuilder,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.createDataGrid001();
		this.materialForm = this.formBuilder.group({
			itemcode: ['', Validators.required],
			quantity: ['', Validators.required],
			rate: ['', Validators.required],
			amount: ['', Validators.required]
		})
		this.materialManager.allmaterial().subscribe(response => {
			this.material = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
			if (this.material.length > 0) {
				this.gridOptions?.api?.setRowData(this.material);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.materialForm.controls }

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
				width: 80,
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
        this.itemid = params.data.itemid;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.materialForm.patchValue({
            'itemcode': params.data.itemcode,
            'quantity': params.data.quantity,
            'rate': params.data.rate,
            'amount': params.data.amount
        });
    }

	onDeleteButtonClick(params: any) {
        this.materialManager.deletematerial(params.data.itemid).subscribe((response) => {
            for (let i = 0; i < this.material.length; i++) {
                if (this.material[i].itemid == params.data.itemid) {
                    this.material?.splice(i, 1);
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
        modalRef.componentInstance.title = "Bill Of Material";
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

	onOrderClick(event: any, materialForm: any) {
		this.markFormGroupTouched(this.materialForm);
		this.submitted = true;
		if (this.materialForm.invalid) {
			return;
		}
		let itemdt001mb = new Itemdt001mb();
		itemdt001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
		itemdt001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
		itemdt001mb.amount = this.f.amount.value ? this.f.amount.value : null;
		itemdt001mb.rate = this.f.rate.value ? this.f.rate.value : null;
		if (this.itemid) {
			itemdt001mb.itemid = this.itemid;
			itemdt001mb.insertUser = this.insertUser;
			itemdt001mb.insertDatetime = this.insertDatetime;
			itemdt001mb.updatedUser =  this.authManager.getcurrentUser.username;
			itemdt001mb.updatedDatetime = new Date();
			this.materialManager.updatematerial(itemdt001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let bommaterial = deserialize<Itemdt001mb>(Itemdt001mb, response);
				for (let bommat of this.material) {
					if (bommat.itemid == bommaterial.itemid) {
						bommat.itemcode = bommaterial.itemcode;
						bommat.quantity = bommaterial.quantity;
						bommat.rate = bommaterial.rate;
						bommat.amount = bommaterial.amount;
						bommat.insertUser = this.insertUser;
						bommat.insertDatetime = this.insertDatetime;
						bommat.updatedUser =  this.authManager.getcurrentUser.username;
						bommat.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.material);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.materialForm.reset();
				this.submitted = false;
				this.itemid = null;
			});
		}
		else {
			itemdt001mb.insertUser = this.authManager.getcurrentUser.username;
			itemdt001mb.insertDatetime = new Date();
			this.materialManager.savematerial(itemdt001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let bommaterial = deserialize<Itemdt001mb>(Itemdt001mb, response);
				this.material?.push(bommaterial);
				const newItems = [JSON.parse(JSON.stringify(bommaterial))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.materialForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.materialForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.materialManager.billOfMaterialPdf().subscribe((response) =>{
			saveAs(response,'BOMDetails');

		});
	}

	onGenerateExcelReport(){
		this.materialManager.billOfMaterialExcel().subscribe((response) => {
			saveAs(response,'BOMDetails');
        })
	}

}