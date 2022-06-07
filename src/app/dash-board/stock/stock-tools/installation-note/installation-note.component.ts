import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { InstallNoteManager } from 'src/app/shared/services/restcontroller/bizservice/tool-installnote.service';
import { Instalnote001mb } from 'src/app/shared/services/restcontroller/entities/Instalnote001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-installation-note',
	templateUrl: './installation-note.component.html',
	styleUrls: ['./installation-note.component.css']
})
export class InstallationNoteComponent implements OnInit {

	frameworkComponents: any;
	submitted = false;
	instalsForm: FormGroup | any;
	instId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	tname: string = "recruit.offerletter";
	ttype: string = "offerletter";
	name: string = "";
	status: string = "";
	remark: string = "";
	instCode: string = "";
	installNote: Instalnote001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private systemPropertiesService: SystemPropertiesService, 
		private installNoteManager: InstallNoteManager, 
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}
	ngOnInit() {
		this.instalsForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: ['', Validators.required],
			remark: ['', Validators.required],
			instCode: ['', Validators.required],
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.tname, this.ttype).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.installNoteManager.allinstall().subscribe((response) => {
			this.installNote = deserialize<Instalnote001mb[]>(Instalnote001mb, response);
			if (this.installNote.length > 0) {
				this.gridOptions?.api?.setRowData(this.installNote);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.instalsForm.controls; }

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
				headerName: '#Id',
				field: 'instId',
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
				field: 'name',
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
				headerName: 'Remark',
				field: 'remark',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Installation Code',
				field: 'instCode',
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
		this.instId = params.data.instId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.instalsForm.patchValue({
			'name': params.data.name,
			'status': params.data.status,
			'remark': params.data.remark,
			'instCode': params.data.instCode,
		})
	}

	onDeleteButtonClick(params: any) {
		this.installNoteManager.deleteinstall(params.data.instId).subscribe((response) => {
			for (let i = 0; i < this.installNote.length; i++) {
				if (this.installNote[i].instId == params.data.instId) {
					this.installNote?.splice(i, 1);
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
        modalRef.componentInstance.title = "Installation Note";
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

	onOrderClick(event: any, instals: any) {
		this.markFormGroupTouched(this.instalsForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.instalsForm.invalid) {
			return;
		}
		let instalnote001mb = new Instalnote001mb();
		instalnote001mb.name = this.f.name.value ? this.f.name.value : "";
		instalnote001mb.status = this.f.status.value ? this.f.status.value : "";
		instalnote001mb.remark = this.f.remark.value ? this.f.remark.value : "";
		instalnote001mb.instCode = this.f.instCode.value ? this.f.instCode.value : "";
		if (this.instId) {
			instalnote001mb.instId = this.instId;
			instalnote001mb.insertUser = this.insertUser;
            instalnote001mb.insertDatetime = this.insertDatetime;
            instalnote001mb.updatedUser = this.authManager.getcurrentUser.username;
            instalnote001mb.updatedDatetime = new Date();
			this.installNoteManager.updateinstall(instalnote001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let installnoteres = deserialize<Instalnote001mb>(Instalnote001mb, response);
				for (let installnote of this.installNote) {
					if (installnote.instId == installnoteres.instId) {
						installnote.name = installnoteres.name;
						installnote.status = installnoteres.status;
						installnote.remark = installnoteres.remark;
						installnote.instCode = installnoteres.instCode;
						installnote.insertUser = this.insertUser;
						installnote.insertDatetime = this.insertDatetime;
						installnote.updatedUser = this.authManager.getcurrentUser.username;
						installnote.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.installNote);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.instalsForm.reset();
				this.submitted = false;
				this.instId = null;
			})
		}
		else {
			instalnote001mb.insertUser = this.authManager.getcurrentUser.username;
            instalnote001mb.insertDatetime = new Date();
			this.installNoteManager.saveinstall(instalnote001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let instal = deserialize<Instalnote001mb>(Instalnote001mb, response);
				this.installNote.push(instal);
				const newItems = [JSON.parse(JSON.stringify(instal))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.instalsForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.instalsForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport() {
		this.installNoteManager.installNotePdf().subscribe((response) => {
			saveAs(response, "InstallationNoteList");

		});
	}

	onGenerateExcelReport() {
		this.installNoteManager.installNoteExcel().subscribe((response) => {
			saveAs(response, "InstallationNoteList");
		});
	}
}