import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Project001mb } from 'src/app/shared/services/restcontroller/entities/Project001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-projectt',
	templateUrl: './projectt.component.html',
	styleUrls: ['./projectt.component.css']
})
export class ProjecttComponent implements OnInit {

	frameworkComponents: any;
	id: number | any;
	insertUser: string = "";
	insertDatetime: Date | any;
	projectname: string = "";
	estimatedcost: number | any;
	startdate!: Date | null;
	enddate!: Date | null;
	status: string = "";
	projectt: Project001mb[] = [];
	public gridOptions: GridOptions | any;
	projectForm: FormGroup | any;
	submitted = false;

	constructor(private projecttManager: ProjecttManager,
		private formBuilder: FormBuilder, private datePipe: DatePipe,
		private systemPropertiesService: SystemPropertiesService,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {

		this.projectForm = this.formBuilder.group({
			projectname: ['', Validators.required],
			estimatedcost: ['', Validators.required],
			startdate: ['', Validators.required],
			enddate: ['', Validators.required],
			status: ['', Validators.required]
		});

		this.createDataGrid001mb();
		this.projecttManager.allproject().subscribe((response) => {
			this.projectt = deserialize<Project001mb[]>(Project001mb, response);
			if (this.projectt.length > 0) {
				this.gridOptions?.api?.setRowData(this.projectt);
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
				field: 'id',
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
				headerName: 'Project Name',
				field: 'projectname',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Estimated Cost',
				field: 'estimatedcost',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Start Date',
				field: 'startdate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.startdate ? this.datePipe.transform(params.data.startdate, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'End Date',
				field: 'enddate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.enddate ? this.datePipe.transform(params.data.enddate, 'MM/dd/yyyy') : '';
				}
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
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 200,
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
				width: 200,
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
				width: 200,
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
		this.id = params.data.id;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.projectForm.patchValue({
			'projectname': params.data.projectname,
			'estimatedcost': params.data.estimatedcost,
			'startdate': this.datePipe.transform(params.data.startdate, 'MM/dd/yyyy'),
			'enddate': this.datePipe.transform(params.data.enddate, 'MM/dd/yyyy'),
			'status': params.data.status,
		});
	}

	onDeleteButtonClick(params: any) {
		this.projecttManager.deleteproject(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.projectt.length; i++) {
				if (this.projectt[i].id == params.data.id) {
					this.projectt?.splice(i, 1);
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
		modalRef.componentInstance.title = "Project";
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

	onOrderClick(event: any, projectForm: any) {
		this.markFormGroupTouched(this.projectForm);
		this.submitted = true;
		if (this.projectForm.invalid) {
			return;
		}
		let project001mb = new Project001mb();

		project001mb.startdate = new Date(this.f.startdate.value);
		project001mb.enddate = new Date(this.f.enddate.value);
		project001mb.projectname = this.f.projectname.value ? this.f.projectname.value : "";
		project001mb.estimatedcost = this.f.estimatedcost.value ? this.f.estimatedcost.value : 0;
		project001mb.status = this.f.status.value ? this.f.status.value : "";
		if (this.id) {
			project001mb.id = this.id;
			project001mb.insertUser = this.insertUser;
			project001mb.insertDatetime = this.insertDatetime;
			project001mb.updatedUser = this.authManager.getcurrentUser.username;
			project001mb.updatedDatetime = new Date();
			this.projecttManager.updateproject(project001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Update Successfully");
				let project001mb = deserialize<Project001mb>(Project001mb, response);
				for (let prjt of this.projectt) {
					if (prjt.id == project001mb.id) {
						prjt.projectname = project001mb.projectname;
						prjt.estimatedcost = project001mb.estimatedcost;
						prjt.startdate = project001mb.startdate;
						prjt.enddate = project001mb.enddate;
						prjt.status = project001mb.status;
						prjt.insertUser = this.insertUser;
						prjt.insertDatetime = this.insertDatetime;
						prjt.updatedUser = this.authManager.getcurrentUser.username;
						prjt.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.projectt);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.projectForm.reset();
				this.submitted = false;
				this.id = null;
			})
		}
		else {
			project001mb.insertUser = this.authManager.getcurrentUser.username;
			project001mb.insertDatetime = new Date();
			this.projecttManager.saveproject(project001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let project001mb = deserialize<Project001mb>(Project001mb, response);
				this.projectt?.push(project001mb);
				const newItems = [JSON.parse(JSON.stringify(project001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
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
		this.projecttManager.projecttPdf().subscribe((response) => {
			saveAs(response, "ProjectDetailsList");

		});
	}

	onGenerateExcelReport() {
		this.projecttManager.projecttExcel().subscribe((response) => {
			saveAs(response, "ProjectDetailsList");
		});
	}
}
