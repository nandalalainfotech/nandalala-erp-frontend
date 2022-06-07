import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmCommunicationManager } from 'src/app/shared/services/restcontroller/bizservice/crm-communication.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Communication001mb } from 'src/app/shared/services/restcontroller/entities/Communication001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-crm-communication',
    templateUrl: './crm-communication.component.html',
    styleUrls: ['./crm-communication.component.css']
})

export class CrmCommunicationComponent implements OnInit {
    commForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    commId:number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    subject: string = "";
    status: string | null = "";
    sentrec: string | null = "";
    stname = "crmcommunics.status";
    sttype = "status";
    strecname = "crmcommunics.sentrec";
    strectype = "sentrec";
    communications: Communication001mb[] = [];
    public gridOptions: GridOptions | any;
    sentrecsystemproperties: Systemproperties001mb[] = [];
    stsystemproperties: Systemproperties001mb[] = [];

    constructor(private crmCommunicationManager: CrmCommunicationManager, 
        private formBuilder: FormBuilder, 
        private systemPropertiesService: SystemPropertiesService, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.commForm = this.formBuilder.group({
            subject: ['', Validators.required],
            status: ['', Validators.required],
            sentrec: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
            this.stsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.strecname, this.strectype).subscribe(response => {
            this.sentrecsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.crmCommunicationManager.allcrmcommunication().subscribe((response) => {
            this.communications = deserialize<Communication001mb[]>(Communication001mb, response)
            if (this.communications.length > 0) {
                this.gridOptions?.api?.setRowData(this.communications);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.commForm.controls; }

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
                field: 'commId',
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
                headerName: 'Subject',
                field: 'subject',
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
                headerName: 'Sent/Received',
                field: 'sentrec',
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
        this.commId = params.data.commId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.commForm.patchValue({
            'sentrec': params.data.sentrec,
            'status': params.data.status,
            'subject': params.data.subject,
        });
    }

    onDeleteButtonClick(params: any) {
        this.crmCommunicationManager.crmcommunicationdelete(params.data.commId).subscribe((response) => {
            for (let i = 0; i < this.communications.length; i++) {
                if (this.communications[i].commId == params.data.commId) {
                    this.communications?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Communication";
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

    onOrderClick(event: any, commForm: any) {
        this.markFormGroupTouched(this.commForm);
        this.submitted = true;
        if (this.commForm.invalid) {
            return;
        }

        let communication001 = new Communication001mb();
        communication001.sentrec = this.f.sentrec.value ? this.f.sentrec.value : "";
        communication001.status = this.f.status.value ? this.f.status.value : "";
        communication001.subject = this.f.subject.value ? this.f.subject.value : "";
        if (this.commId) {
            communication001.commId = this.commId;
            communication001.insertUser = this.insertUser;
            communication001.insertDatetime = this.insertDatetime;
            communication001.updatedUser = this.authManager.getcurrentUser.username;
            communication001.updatedDatetime = new Date();
            this.crmCommunicationManager.crmcommunicationupdate(communication001).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let com = deserialize<Communication001mb>(Communication001mb, response);
                for (let communication of this.communications) {
                    if (communication.commId == com.commId) {
                        communication.sentrec = com.sentrec;
                        communication.status = com.status;
                        communication.subject = com.subject;
                        communication.insertUser = this.insertUser;
                        communication.insertDatetime = this.insertDatetime;
                        communication.updatedUser = this.authManager.getcurrentUser.username;
                        communication.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.communications);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.commForm.reset();
                this.commId = null;
                this.submitted = false;
            });
        } else {
            communication001.insertUser = this.authManager.getcurrentUser.username;
            communication001.insertDatetime = new Date();
            this.crmCommunicationManager.crmcommunicationsave(communication001).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let com = deserialize<Communication001mb>(Communication001mb, response);
                this.communications.push(com);
                const newItems = [JSON.parse(JSON.stringify(com))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.commForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.commForm.reset();
    }

    onGeneratePdfReport(){
		this.crmCommunicationManager.crmCommunicationPdf().subscribe((response) =>{
            saveAs(response,"CommunicationSetupList");

		});
	}

	onGenerateExcelReport(){
		this.crmCommunicationManager.crmCommunicationExcel().subscribe((response) => {
			saveAs(response,"CommunicationSetupList");
        })
	}
}