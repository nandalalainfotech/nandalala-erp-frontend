import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { UnitofMeaseureManager } from 'src/app/shared/services/restcontroller/bizservice/unit-of-measure.service';
import { Unitofmeasure001mb } from 'src/app/shared/services/restcontroller/entities/Unitofmeasure001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-unit-of-measure',
	templateUrl: './unit-of-measure.component.html',
	styleUrls: ['./unit-of-measure.component.css']
})

export class UnitOfMeasureComponent implements OnInit {
	unitForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	unitId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	unitName: string = "";
	unitMeasure: Unitofmeasure001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private unitofMeaseureManager: UnitofMeaseureManager,
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
		this.unitForm = this.formBuilder.group({
			unitName: ['', Validators.required]
		});

		this.createDataGrid001()
		this.unitofMeaseureManager.allunitmeasure().subscribe(response => {
			this.unitMeasure = deserialize<Unitofmeasure001mb[]>(Unitofmeasure001mb, response);
			if (this.unitMeasure.length > 0) {
				this.gridOptions?.api?.setRowData(this.unitMeasure);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.unitForm.controls; }

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
				field: 'unitId',
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
				field: 'unitName',
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
				width: 55,
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
                width: 50,
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
		this.unitId = params.data.unitId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.unitForm.patchValue({
			'unitName': params.data.unitName
		});
	}

	onDeleteButtonClick(params: any) {
		this.unitofMeaseureManager.deleteunitmeasure(params.data.unitId).subscribe((response) => {
			for (let i = 0; i < this.unitMeasure.length; i++) {
				if (this.unitMeasure[i].unitId == params.data.unitId) {
					this.unitMeasure?.splice(i, 1);
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
        modalRef.componentInstance.title = "Unit Of Measure";
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

	onOrderClick(event: any, unitForm: any) {
		this.markFormGroupTouched(this.unitForm);
		this.submitted = true;
		if (this.unitForm.invalid) {
			return;
		}

		let unitofmeasure001mb = new Unitofmeasure001mb();
		unitofmeasure001mb.unitName = this.f.unitName.value ? this.f.unitName.value : "";

		if (this.unitId) {
			unitofmeasure001mb.unitId = this.unitId;
			unitofmeasure001mb.insertUser = this.insertUser;
            unitofmeasure001mb.insertDatetime = this.insertDatetime;
            unitofmeasure001mb.updatedUser = this.authManager.getcurrentUser.username;
            unitofmeasure001mb.updatedDatetime = new Date();
			this.unitofMeaseureManager.updateunitmeasure(unitofmeasure001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let unitofmeasure001mb = deserialize<Unitofmeasure001mb>(Unitofmeasure001mb, response);
				for (let unitofmeasure of this.unitMeasure) {
					if (unitofmeasure.unitId == unitofmeasure001mb.unitId) {
						unitofmeasure.unitName = unitofmeasure001mb.unitName;
						unitofmeasure.insertUser = this.insertUser;
						unitofmeasure.insertDatetime = this.insertDatetime;
						unitofmeasure.updatedUser = this.authManager.getcurrentUser.username;
						unitofmeasure.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.unitMeasure);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.unitForm.reset();
				this.unitId = null;
				this.submitted = false;
			});
		} else {
			unitofmeasure001mb.insertUser = this.authManager.getcurrentUser.username;
            unitofmeasure001mb.insertDatetime = new Date();
			this.unitofMeaseureManager.saveunitmeasure(unitofmeasure001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let unitofmeasure001mb = deserialize<Unitofmeasure001mb>(Unitofmeasure001mb, response);
				this.unitMeasure?.push(unitofmeasure001mb);
				const newItems = [JSON.parse(JSON.stringify(unitofmeasure001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.unitForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.unitForm.reset();
	}


	onGeneratePdfReport() {
		this.unitofMeaseureManager.unitofMeaseurePdf().subscribe((response) => {
			saveAs(response, "unitofMeaseureList");

		});
	}

	onGenerateExcelReport() {
		this.unitofMeaseureManager.unitofMeaseureExcel().subscribe((response) => {
			saveAs(response, "unitofMeaseureList");
		});
	}
}
