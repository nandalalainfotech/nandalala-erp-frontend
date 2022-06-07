import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { JobApplicantManager } from 'src/app/shared/services/restcontroller/bizservice/job-applicant.service';
import { JobOpeningManager } from 'src/app/shared/services/restcontroller/bizservice/job-opening.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Recruitapplicant001mb } from 'src/app/shared/services/restcontroller/entities/Recruitapplicant001mb';
import { Recruitopening001mb } from 'src/app/shared/services/restcontroller/entities/Recruritopening001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-job-applicant',
    templateUrl: './job-applicant.component.html',
    styleUrls: ['./job-applicant.component.css']
})
export class JobApplicantComponent implements OnInit {

    jobAppForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    appId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemname: string = "Recruit.JobOpening";
    itemtype: string = "JobOpening";
    applicantName: string = "";
    status: string = "";
    jobName: string | null = "";
    jobApplicant: Recruitapplicant001mb[] = [];
    grpsystemproperties?: Systemproperties001mb[] = [];
    itsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    jobOpening: Recruitopening001mb[] = [];

    constructor(private systemPropertyServeice: SystemPropertiesService,
        private jobApplicantManager: JobApplicantManager,
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

        this.jobAppForm = this.formBuilder.group({
            applicantName: ['', Validators.required],
            status: ['', Validators.required],
            jobName: ['', Validators.required],

        });

        this.createDataGrid001();
        this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })

        this.jobOpeningManager.alljobopening().subscribe(response => {
            this.jobOpening = deserialize<Recruitopening001mb[]>(Recruitopening001mb, response);
        })

        this.jobApplicantManager.alljobapplicant().subscribe((response) => {
            this.jobApplicant = deserialize<Recruitapplicant001mb[]>(Recruitapplicant001mb, response);
            if (this.jobApplicant.length > 0) {
                this.gridOptions?.api?.setRowData(this.jobApplicant);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.jobAppForm.controls; }

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
                headerName: 'AppId',
                field: 'appId',
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
                headerName: 'Applicant Name',
                field: 'applicantName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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

        this.appId = params.data.appId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.jobAppForm.patchValue({
            'applicantName': params.data.applicantName,
            'jobName': params.data.jobName,
            'status': params.data.status,
        })
    }

    onDeleteButtonClick(params: any) {
        this.jobApplicantManager.deletejobapplicant(params.data.appId).subscribe((Response) => {
            for (let i = 0; i < this.jobApplicant.length; i++) {
                if (this.jobApplicant[i].appId == params.data.appId) {
                    this.jobApplicant?.splice(i, 1);
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
        modalRef.componentInstance.title = "Job Applicant";
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

    onOrderClick(event: any, jobAppForm: any) {

        this.markFormGroupTouched(this.jobAppForm);
        this.submitted = true;
        if (this.jobAppForm.invalid) {
            return;
        }

        let recruitapplicant001mb = new Recruitapplicant001mb();
        recruitapplicant001mb.applicantName = this.f.applicantName.value ? this.f.applicantName.value : "";
        recruitapplicant001mb.jobName = this.f.jobName.value ? this.f.jobName.value : "";
        recruitapplicant001mb.status = this.f.status.value ? this.f.status.value : "";

        if (this.appId) {
            recruitapplicant001mb.appId = this.appId;
            recruitapplicant001mb.insertUser = this.insertUser;
            recruitapplicant001mb.insertDatetime = this.insertDatetime;
            recruitapplicant001mb.updatedUser = this.authManager.getcurrentUser.username;
            recruitapplicant001mb.updatedDatetime = new Date();
            this.jobApplicantManager.updatejobapplicant(recruitapplicant001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let jobapps = deserialize<Recruitapplicant001mb>(Recruitapplicant001mb, response);
                for (let jobapplications of this.jobApplicant) {
                    if (jobapplications.appId == jobapps.appId) {
                        jobapplications.applicantName = jobapps.applicantName;
                        jobapplications.jobName = jobapps.jobName;
                        jobapplications.status = jobapps.status;
                        jobapplications.insertUser = this.insertUser;
                        jobapplications.insertDatetime = this.insertDatetime;
                        jobapplications.updatedUser = this.authManager.getcurrentUser.username;
                        jobapplications.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.jobApplicant);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.jobAppForm.reset();
                this.appId = null;
                this.submitted = false;
            });
        } else {
            recruitapplicant001mb.insertUser = this.authManager.getcurrentUser.username;
            recruitapplicant001mb.insertDatetime = new Date();
            this.jobApplicantManager.savejobapplicant(recruitapplicant001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let jobapps = deserialize<Recruitapplicant001mb>(Recruitapplicant001mb, response);
                this.jobApplicant?.push(jobapps);
                const newItems = [JSON.parse(JSON.stringify(jobapps))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.jobAppForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.jobAppForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.jobApplicantManager.jobApplicantPdf().subscribe((response) =>{
            saveAs(response,"ListOfJobApplicants");

		});
	}

	onGenerateExcelReport(){
		this.jobApplicantManager.jobApplicantExcel().subscribe((response) => {
			saveAs(response,"ListOfJobApplicants");
        })
	}

}