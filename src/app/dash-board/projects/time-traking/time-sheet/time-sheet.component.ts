import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { TaskManager } from 'src/app/shared/services/restcontroller/bizservice/task.service';
import { TimeSheetManager } from 'src/app/shared/services/restcontroller/bizservice/time-sheet.service';
import { Dailytimesheet001mb } from 'src/app/shared/services/restcontroller/entities/Dailytimesheet001mb';
import { Project001mb } from 'src/app/shared/services/restcontroller/entities/Project001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Task001mb } from 'src/app/shared/services/restcontroller/entities/Task001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-time-sheet',
	templateUrl: './time-sheet.component.html',
	styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

	@ViewChild('timeSheet') timeSheet: NgForm | any;
	frameworkComponents: any;
	id: number | any;
	insertUser: string = "";
	insertDatetime: Date | any;
	submitted = false;
	timeSheetForm: FormGroup | any;
	name: string = "dummy.status";
	type: string = "dummy";
	aname: string = "payreq.status";
	atype: string = "status";
	timesheet: string = "";
	employee: string = "";
	employeename: string = "";
	fromdatetime!: Date | null;
	todatetime!: Date | null;
	hours: string = "";
	activitytype: string = "";
	task: string = "";
	project: string = "";
	status: string = "";
	systemproperties?: Systemproperties001mb[] = [];
	asystemproperties?: Systemproperties001mb[] = [];
	timesSheets: Dailytimesheet001mb[] = [];
	public gridOptions: GridOptions | any;
	projects: Project001mb[] = [];
	tasks: Task001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService,
		private timeSheetManager: TimeSheetManager,
		private calloutService: CalloutService,
		private taskManager: TaskManager,
		private projecttManager: ProjecttManager,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}
	ngOnInit() {
		this.createDataGrid001();
		this.timeSheetForm = this.formBuilder.group({
			timesheet: ['', Validators.required],
			employee: ['', Validators.required],
			employeename: ['', Validators.required],
			fromdatetime: ['', Validators.required],
			todatetime: ['', Validators.required],
			hours: ['', Validators.required],
			activitytype: ['', Validators.required],
			task: ['', Validators.required],
			project: ['', Validators.required],
			status: ['', Validators.required],

		})
		this.systemPropertiesService.system(this.aname, this.atype).subscribe(response => {
			this.asystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.projecttManager.allproject().subscribe((response) => {
			this.projects = deserialize<Project001mb[]>(Project001mb, response);
		})
		this.taskManager.alltask().subscribe((response) => {
			this.tasks = deserialize<Task001mb[]>(Task001mb, response);
		})
		this.timeSheetManager.alltimesheet().subscribe((response) => {
			this.timesSheets = deserialize<Dailytimesheet001mb[]>(Dailytimesheet001mb, response);
			if (this.timesSheets.length > 0) {
				this.gridOptions?.api?.setRowData(this.timesSheets);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}
	get f() { return this.timeSheetForm.controls; }

	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRenderer: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: 'Time sheet ID',
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
				headerName: 'Task',
				field: 'timesheet',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Employee',
				field: 'employee',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Employee Name',
				field: 'employeename',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'From DateTime',
				field: 'fromdatetime',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.fromdatetime ? this.datePipe.transform(params.data.fromdatetime, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'To DateTime',
				field: 'todatetime',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.todatetime ? this.datePipe.transform(params.data.todatetime, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'Hours',
				field: 'hours',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Activity Type',
				field: 'activitytype',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Project',
				field: 'project',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Task',
				field: 'task',
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
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 50,
				flex: 1,
				suppressSizeToFit: true,
				cellStyle: { textAlign: 'center' },
				cellRendererParams: {
					onClick: this.onEditButtonClick.bind(this),
					label: 'Edit'
				}
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
				}
			},
			{
				headerName: 'Audit',
				cellRenderer: 'iconRenderer',
				width: 55,
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
		this.timeSheetForm.patchValue({
			'employee': params.data.employee,
			'timesheet': params.data.timesheet,
			'employeename': params.data.employeename,
			'fromdatetime': this.datePipe.transform(params.data.fromdatetime, 'MM/dd/yyyy'),
			'todatetime': this.datePipe.transform(params.data.todatetime, 'MM/dd/yyyy'),
			'hours': params.data.hours,
			'activitytype': params.data.activitytype,
			'task': params.data.task,
			'project': params.data.project,
			'status': params.data.status,
		})
	}

	onDeleteButtonClick(params: any) {
		this.timeSheetManager.timesheetdelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.timesSheets.length; i++) {
				if (this.timesSheets[i].id == params.data.id) {
					this.timesSheets?.splice(i, 1);
					break;
				}
			}
			const selectedRows = params.api.getSelectedRows();
			params.api.applyTransaction({ remove: selectedRows });
			this.gridOptions.api.deselectAll();
			this.calloutService.showSuccess("Order Removed Successfully");
		})
	}

	onAuditButtonClick(params: any) {
		const modalRef = this.modalService.open(AuditComponent);
		modalRef.componentInstance.title = "Time Sheet";
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

	onOrderClick(event: any, timeSheet: any) {
		this.markFormGroupTouched(this.timeSheetForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.timeSheetForm.invalid) {
			return;
		}
		let dailytimeshett001mb = new Dailytimesheet001mb();
		dailytimeshett001mb.timesheet = this.f.timesheet.value ? this.f.timesheet.value : "";
		dailytimeshett001mb.employee = this.f.employee.value ? this.f.employee.value : "";
		dailytimeshett001mb.employeename = this.f.employeename.value ? this.f.employeename.value : "";
		dailytimeshett001mb.fromdatetime = new Date(this.f.fromdatetime.value);
		dailytimeshett001mb.todatetime = new Date(this.f.todatetime.value);
		dailytimeshett001mb.hours = this.f.hours.value ? this.f.hours.value : "";
		dailytimeshett001mb.activitytype = this.f.activitytype.value ? this.f.activitytype.value : "";
		dailytimeshett001mb.task = this.f.task.value ? this.f.task.value : "";
		dailytimeshett001mb.project = this.f.project.value ? this.f.project.value : "";
		dailytimeshett001mb.status = this.f.status.value ? this.f.status.value : "";
		if (this.id) {
			dailytimeshett001mb.id = this.id;
			dailytimeshett001mb.insertUser = this.insertUser;
			dailytimeshett001mb.insertDatetime = this.insertDatetime;
			dailytimeshett001mb.updatedUser = this.authManager.getcurrentUser.username;
			dailytimeshett001mb.updatedDatetime = new Date();
			this.timeSheetManager.timesheetupdate(dailytimeshett001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let timesheet = deserialize<Dailytimesheet001mb>(Dailytimesheet001mb, response);
				for (let timesheets of this.timesSheets) {
					if (timesheets.id == timesheet.id) {
						timesheets.timesheet = timesheet.timesheet;
						timesheets.employee = timesheet.employee;
						timesheets.employeename = timesheet.employeename;
						timesheets.fromdatetime = timesheet.fromdatetime;
						timesheets.todatetime = timesheet.todatetime;
						timesheets.hours = timesheet.hours;
						timesheets.activitytype = timesheet.activitytype;
						timesheets.task = timesheet.task;
						timesheets.project = timesheet.project;
						timesheets.status = timesheet.status;
						timesheets.insertUser = this.insertUser;
						timesheets.insertDatetime = this.insertDatetime;
						timesheets.updatedUser = this.authManager.getcurrentUser.username;
						timesheets.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.timesSheets);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.timeSheetForm.reset();
				this.submitted = false;
				this.id = null;
			});
		} else {
			dailytimeshett001mb.insertUser = this.authManager.getcurrentUser.username;
			dailytimeshett001mb.insertDatetime = new Date();
			this.timeSheetManager.timesheetsave(dailytimeshett001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let timesheet = deserialize<Dailytimesheet001mb>(Dailytimesheet001mb, response);
				this.timesSheets.push(timesheet);
				const newItems = [JSON.parse(JSON.stringify(timesheet))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.timeSheetForm.reset();
				this.submitted = false;
			});
		}
	}
	onReset() {
		this.timeSheetForm.reset();
		this.submitted = false;
	}


	onGeneratePdfReport() {
		this.timeSheetManager.timeSheetPdf().subscribe((response) => {
			saveAs(response, "DailyTimeSheetSummary");

		});
	}

	onGenerateExcelReport() {
		this.timeSheetManager.timeSheetExcel().subscribe((response) => {
			saveAs(response, "DailyTimeSheetSummary");
		});
	}
}
