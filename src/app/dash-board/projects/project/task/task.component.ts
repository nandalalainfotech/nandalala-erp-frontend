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
import { TaskManager } from 'src/app/shared/services/restcontroller/bizservice/task.service';
import { Project001mb } from 'src/app/shared/services/restcontroller/entities/Project001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Task001mb } from 'src/app/shared/services/restcontroller/entities/Task001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

	frameworkComponents: any;
	taskid: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	name: string = "dummy.status";
	type: string = "dummy";
	aname: string = "processpr.Month";
	atype: string = "Month";
	bname: string = "task.status";
	btype: string = "status";
	projectname: string | null = "";
	taskdescription: string = "";
	assignTo: string = "";
	assignBy: string = "";
	status: string = "";
	starton!: Date | null;
	endon!: Date | null;
	allday: boolean = false;
	sendanemail: boolean = false;
	repeatthisevent: boolean = false;
	duration: string | null = "";
	projectid: number | any;
	task: Task001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	asystemproperties?: Systemproperties001mb[] = [];
	bsystemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	tasksForm: FormGroup | any;
	submitted = false;
	projects: Project001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService, 
		private formBuilder: FormBuilder,
		private taskManager: TaskManager, 
		private datePipe: DatePipe, 
		private projecttManager: ProjecttManager,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {

		this.tasksForm = this.formBuilder.group({
			projectname: ['', Validators.required],
			taskdescription: ['', Validators.required],
			assignTo: ['', Validators.required],
			assignBy: ['', Validators.required],
			status: ['', Validators.required],
			starton: ['', Validators.required],
			endon: ['', Validators.required],
			allday: [''],
			sendanemail: [''],
			repeatthisevent: [''],
			duration: ['', Validators.required],
			projectid: ['', Validators.required]
		});
		this.createDataGrid001mb();
		this.systemPropertiesService.system(this.bname, this.btype).subscribe(response => {
			this.bsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.aname, this.atype).subscribe(response => {
			this.asystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.projecttManager.allproject().subscribe((response) => {
			this.projects = deserialize<Project001mb[]>(Project001mb, response);
		})
		this.taskManager.alltask().subscribe((response) => {
			this.task = deserialize<Task001mb[]>(Task001mb, response);
			if (this.task.length > 0) {
				this.gridOptions?.api?.setRowData(this.task);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.tasksForm.controls; }
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
				field: 'taskid',
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
				headerName: 'Select Project',
				field: 'projectname',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Task Description',
				field: 'taskdescription',
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
				headerName: 'AssignTo',
				field: 'assignTo',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'AssignBy',
				field: 'assignBy',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Starts On',
				field: 'starton',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.starton ? this.datePipe.transform(params.data.starton, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'End On',
				field: 'endon',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.endon ? this.datePipe.transform(params.data.endon, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'Task Duration',
				field: 'duration',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'All Day',
				field: 'allday',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.allday == 1 ? true : false;
                }
			},
			{
				headerName: 'Send An Email Reminder',
				field: 'sendanemail',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.sendanemail == 1 ? true : false;
                }
			},
			{
				headerName: 'Repeat This Event',
				field: 'repeatthisevent',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
                    return param.data.repeatthisevent == 1 ? true : false;
                }
			},
			{
				headerName: 'Project Id',
				field: 'projectid',
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
		this.taskid = params.data.taskid;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.tasksForm.patchValue({
			'projectname': params.data.projectname,
			'taskdescription': params.data.taskdescription,
			'assignTo': params.data.assignTo,
			'assignBy': params.data.assignBy,
			'status': params.data.status,
			'starton': this.datePipe.transform(params.data.starton, 'MM/dd/yyyy'),
			'endon': this.datePipe.transform(params.data.endon, 'MM/dd/yyyy'),
			'allday': params.data.allday,
			'sendanemail': params.data.sendanemail,
			'repeatthisevent': params.data.repeatthisevent,
			'duration': params.data.duration,
			'projectid': params.data.projectid,
		});
	}

	onDeleteButtonClick(params: any) {
		this.taskManager.deletetask(params.data.taskid).subscribe((response) => {
			for (let i = 0; i < this.task.length; i++) {
				if (this.task[i].taskid == params.data.taskid) {
					this.task?.splice(i, 1);
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
        modalRef.componentInstance.title = "Task";
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
	onOrderClick(event: any, tasksForm: any) {
		this.markFormGroupTouched(this.tasksForm);
		this.submitted = true;
		if (this.tasksForm.invalid) {
			return;
		}
		let task001mb = new Task001mb();
		task001mb.projectname = this.f.projectname.value ? this.f.projectname.value : "";
		task001mb.taskdescription = this.f.taskdescription.value ? this.f.taskdescription.value : "";
		task001mb.assignTo = this.f.assignTo.value ? this.f.assignTo.value : "";
		task001mb.assignBy = this.f.assignBy.value ? this.f.assignBy.value : "";
		task001mb.starton = new Date(this.f.starton.value);
		task001mb.endon = new Date(this.f.endon.value);
		task001mb.duration = this.f.duration.value ? this.f.duration.value : "";
		task001mb.status = this.f.status.value ? this.f.status.value : "";
		task001mb.allday = this.f.allday.value ? this.f.allday.value: false;
		task001mb.sendanemail = this.f.sendanemail.value ? this.f.sendanemail.value : false;
		task001mb.repeatthisevent = this.f.repeatthisevent.value ? this.f.repeatthisevent.value: false;
		task001mb.projectid = this.f.projectid.value ? this.f.projectid.value : null;
		if (this.taskid) {
			task001mb.taskid = this.taskid;
			task001mb.insertUser = this.insertUser;
            task001mb.insertDatetime = this.insertDatetime;
            task001mb.updatedUser = this.authManager.getcurrentUser.username;
            task001mb.updatedDatetime = new Date();
			this.taskManager.updatetask(task001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Update Successfully");
				let task001mb = deserialize<Task001mb>(Task001mb, response);
				for (let prtask of this.task) {
					if (prtask.taskid == task001mb.taskid) {
						prtask.projectname = task001mb.projectname;
						prtask.taskdescription = task001mb.taskdescription;
						prtask.assignTo = task001mb.assignTo;
						prtask.assignBy = task001mb.assignBy;
						prtask.starton = task001mb.starton;
						prtask.endon = task001mb.endon;
						prtask.duration = task001mb.duration;
						prtask.status = task001mb.status;
						prtask.allday = task001mb.allday;
						prtask.sendanemail = task001mb.sendanemail;
						prtask.repeatthisevent = task001mb.repeatthisevent;
						prtask.projectid = task001mb.projectid;
						prtask.insertUser = this.insertUser;
						prtask.insertDatetime = this.insertDatetime;
						prtask.updatedUser = this.authManager.getcurrentUser.username;
						prtask.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.task);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.tasksForm.reset();
				this.submitted = false;
				this.taskid = null;
			})
		}
		else {
			task001mb.insertUser = this.authManager.getcurrentUser.username;
            task001mb.insertDatetime = new Date();
			this.taskManager.savetask(task001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let task001mb = deserialize<Task001mb>(Task001mb, response);
				this.task?.push(task001mb);
				const newItems = [JSON.parse(JSON.stringify(task001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.tasksForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.tasksForm.reset();
		this.submitted = false;
	}


	onGeneratePdfReport() {
		this.taskManager.taskPdf().subscribe((response) => {
			saveAs(response, "TaskDetailsList");

		});
	}

	onGenerateExcelReport() {
		this.taskManager.taskExcel().subscribe((response) => {
			saveAs(response, "TaskDetailsList");
		});
	}
}
