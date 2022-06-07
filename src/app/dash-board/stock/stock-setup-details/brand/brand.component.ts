import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BrandManager } from 'src/app/shared/services/restcontroller/bizservice/brand.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Brand001mb } from 'src/app/shared/services/restcontroller/entities/Brand001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-brand',
	templateUrl: './brand.component.html',
	styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {
	brdForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	brandId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	brandName: string = "";
	description: string = "";
	brand: Brand001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private brandManager: BrandManager,
		private systemPropertiesService: SystemPropertiesService, 
		private formBuilder: FormBuilder,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent,
		}
	}

	ngOnInit() {
		this.brdForm = this.formBuilder.group({
			brandName: ['', Validators.required],
			description: ['', Validators.required]
		});

		this.createDataGrid001();
		this.brandManager.allbrand().subscribe(response => {
			this.brand = deserialize<Brand001mb[]>(Brand001mb, response);
			if (this.brand.length > 0) {
				this.gridOptions?.api?.setRowData(this.brand);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.brdForm.controls; }

	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRendered: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		// this.gridOptions.domLayout = 'autoHeight';
		this.gridOptions.animateRows = true;

		this.gridOptions.columnDefs = [
			{
				headerName: '#ID',
				field: 'brandId',
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
				headerName: 'Name',
				field: 'brandName',
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
		this.brandId = params.data.brandId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.brdForm.patchValue({
			'brandName': params.data.brandName,
			'description': params.data.description
		});
	}

	onDeleteButtonClick(params: any) {
		this.brandManager.deletebrand(params.data.brandId).subscribe((response) => {
			for (let i = 0; i < this.brand.length; i++) {
				if (this.brand[i].brandId == params.data.brandId) {
					this.brand?.splice(i, 1);
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
		modalRef.componentInstance.title = "Brand";
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

	onOrderClick(event: any, brdForm: any) {
		this.markFormGroupTouched(this.brdForm);
		this.submitted = true;
		if (this.brdForm.invalid) {
			return;
		}

		let brand001mb = new Brand001mb();
		brand001mb.brandName = this.f.brandName.value ? this.f.brandName.value : "";
		brand001mb.description = this.f.description.value ? this.f.description.value : "";

		if (this.brandId) {
			brand001mb.brandId = this.brandId;
			brand001mb.insertUser = this.insertUser;
            brand001mb.insertDatetime = this.insertDatetime;
            brand001mb.updatedUser = this.authManager.getcurrentUser.username;
            brand001mb.updatedDatetime = new Date();
			this.brandManager.updatebrand(brand001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let brand001mb = deserialize<Brand001mb>(Brand001mb, response);
				for (let stockbrand of this.brand) {
					if (stockbrand.brandId == brand001mb.brandId) {
						stockbrand.brandName = brand001mb.brandName;
						stockbrand.description = brand001mb.description;
						stockbrand.insertUser = this.insertUser;
						stockbrand.insertDatetime = this.insertDatetime;
						stockbrand.updatedUser = this.authManager.getcurrentUser.username;
						stockbrand.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.brand);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.brdForm.reset();
				this.brandId = null;
				this.submitted = false;
			});
		} else {
			brand001mb.insertUser = this.authManager.getcurrentUser.username;
            brand001mb.insertDatetime = new Date();
			this.brandManager.savebrand(brand001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let brand001mb = deserialize<Brand001mb>(Brand001mb, response);
				this.brand?.push(brand001mb);
				const newItems = [JSON.parse(JSON.stringify(brand001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.brdForm.reset();
				this.submitted = false;
			});
		}
	}
	onReset() {
		this.submitted = false;
		this.brdForm.reset();
	}

	onGeneratePdfReport() {
		this.brandManager.brandPdf().subscribe((response) => {
			saveAs(response, "brandList");

		});
	}

	onGenerateExcelReport() {
		this.brandManager.brandExcel().subscribe((response) => {
			saveAs(response, "brandList");
		});
	}
}