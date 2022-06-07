import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { JobOpeningManager } from 'src/app/shared/services/restcontroller/bizservice/job-opening.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Recruitopening001mb } from 'src/app/shared/services/restcontroller/entities/Recruritopening001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-job-opening',
    templateUrl: './job-opening.component.html',
    styleUrls: ['./job-opening.component.css']
})
export class JobOpeningComponent implements OnInit {

    jobOpForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    jobId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemname: string = "Recruit.JobOpening";
    itemtype: string = "JobOpening";
    jobName: string = "";
    status: string = "";
    itsystemproperties?: Systemproperties001mb[] = [];
    jobOpening: Recruitopening001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertyServeice: SystemPropertiesService,
        private jobOpeningManager: JobOpeningManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.jobOpForm = this.formBuilder.group({
            jobName: ['', Validators.required],
            status: ['', Validators.required],

        });

        this.createDataGrid001();
        this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.jobOpeningManager.alljobopening().subscribe(response => {
            this.jobOpening = deserialize<Recruitopening001mb[]>(Recruitopening001mb, response);
            if (this.jobOpening.length > 0) {
                this.gridOptions?.api?.setRowData(this.jobOpening);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }

        })
    }

    get f() { return this.jobOpForm.controls; }

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
                headerName: 'JobId',
                field: 'jobId',
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
                headerName: 'Job Name',
                field: 'jobName',
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
        this.jobId = params.data.jobId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.jobOpForm.patchValue({
            'jobName': params.data.jobName,
            'status': params.data.status,
        })
    }

    onDeleteButtonClick(params: any) {
        this.jobOpeningManager.deletejobopening(params.data.jobId).subscribe((Response) => {
            for (let i = 0; i < this.jobOpening.length; i++) {
                if (this.jobOpening[i].jobId == params.data.jobId) {
                    this.jobOpening?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Job Opening";
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

    onOrderClick(event: any, jobOpForm: any) {

        this.markFormGroupTouched(this.jobOpForm);
        this.submitted = true;
        if (this.jobOpForm.invalid) {
            return;
        }

        let recruitopening001mb = new Recruitopening001mb();
        recruitopening001mb.jobName = this.f.jobName.value ? this.f.jobName.value : "";
        recruitopening001mb.status = this.f.status.value ? this.f.status.value : "";

        if (this.jobId) {
            recruitopening001mb.jobId = this.jobId;
            recruitopening001mb.insertUser = this.insertUser;
            recruitopening001mb.insertDatetime = this.insertDatetime;
            recruitopening001mb.updatedUser = this.authManager.getcurrentUser.username;
            recruitopening001mb.updatedDatetime = new Date();
            this.jobOpeningManager.updatejobopening(recruitopening001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let jobapps = deserialize<Recruitopening001mb>(Recruitopening001mb, response);
                for (let jobopenings of this.jobOpening) {
                    if (jobopenings.jobId == jobapps.jobId) {
                        jobopenings.jobName = jobapps.jobName;
                        jobopenings.status = jobapps.status;
                        jobopenings.insertUser = this.insertUser;
                        jobopenings.insertDatetime = this.insertDatetime;
                        jobopenings.updatedUser = this.authManager.getcurrentUser.username;
                        jobopenings.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.jobOpening);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.jobOpForm.reset();
                this.jobId = null;
                this.submitted = false;
            });
        } else {
            recruitopening001mb.insertUser = this.authManager.getcurrentUser.username;
            recruitopening001mb.insertDatetime = new Date();
            this.jobOpeningManager.savejobopening(recruitopening001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let jobops = deserialize<Recruitopening001mb>(Recruitopening001mb, response);
                this.jobOpening?.push(jobops);
                const newItems = [JSON.parse(JSON.stringify(jobops))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.jobOpForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.jobOpForm.reset();
        this.submitted = false;
    }
    onGeneratePdfReport(){
		this.jobOpeningManager.jobOpeningPdf().subscribe((response) =>{
            saveAs(response,"ListOfJobOpening");

		});
	}

	onGenerateExcelReport(){
		this.jobOpeningManager.jobOpeningExcel().subscribe((response) => {
			saveAs(response,"ListOfJobOpening");
        })
	}

}
