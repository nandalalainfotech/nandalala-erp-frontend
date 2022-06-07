import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmContactManager } from 'src/app/shared/services/restcontroller/bizservice/crm-contact.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Crmspcontact001mb } from 'src/app/shared/services/restcontroller/entities/Crmspcontact001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-crm-contact',
    templateUrl: './crm-contact.component.html',
    styleUrls: ['./crm-contact.component.css']
})
export class CRMContactComponent implements OnInit {

    spContactForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    contId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    leadName: string = "";
    status: string | null = "";
    contact: Crmspcontact001mb[] = [];
    contname: string = "crmcontact.status";
    conttype: string = "status";
    spcontactsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private crmContactManager: CrmContactManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {

        this.spContactForm = this.formBuilder.group({
            leadName: ['', Validators.required],
            status: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.contname, this.conttype).subscribe(response => {
            this.spcontactsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.crmContactManager.allcontact1().subscribe((response) => {
            this.contact = deserialize<Crmspcontact001mb[]>(Crmspcontact001mb, response);
            if (this.contact.length > 0) {
                this.gridOptions?.api?.setRowData(this.contact);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.spContactForm.controls; }

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
                field: 'contId',
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
                headerName: 'Lead Name',
                field: 'leadName',
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

        this.contId = params.data.contId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.spContactForm.patchValue({

            'leadName': params.data.leadName,
            'status': params.data.status,
        })
    }

    onDeleteButtonClick(params: any) {
        this.crmContactManager.deletespcontact(params.data.contId).subscribe((response) => {
            for (let i = 0; i < this.contact.length; i++) {
                if (this.contact[i].contId == params.data.contId) {
                    this.contact?.splice(i, 1);
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
        modalRef.componentInstance.title = "Contact";
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

    onOrderClick(event: any, spContactForm: any) {

        this.markFormGroupTouched(this.spContactForm);
        this.submitted = true;
        if (this.spContactForm.invalid) {
            return;
        }

        let crmspcontact001mb = new Crmspcontact001mb();
        crmspcontact001mb.leadName = this.f.leadName.value ? this.f.leadName.value : "";
        crmspcontact001mb.status = this.f.status.value ? this.f.status.value : "";
        if (this.contId) {
            crmspcontact001mb.contId = this.contId;
            crmspcontact001mb.insertUser = this.insertUser;
            crmspcontact001mb.insertDatetime = this.insertDatetime;
            crmspcontact001mb.updatedUser = this.authManager.getcurrentUser.username;
            crmspcontact001mb.updatedDatetime = new Date();
            this.crmContactManager.updatespcontact(crmspcontact001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let crmspcontact001mb = deserialize<Crmspcontact001mb>(Crmspcontact001mb, response);
                for (let spcontact of this.contact) {
                    if (spcontact.contId == crmspcontact001mb.contId) {
                        spcontact.leadName = crmspcontact001mb.leadName;
                        spcontact.status = crmspcontact001mb.status;
                        spcontact.insertUser = this.insertUser;
                        spcontact.insertDatetime = this.insertDatetime;
                        spcontact.updatedUser = this.authManager.getcurrentUser.username;
                        spcontact.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.contact);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.spContactForm.reset();
                this.contId = null;
                this.submitted = false;
            })
        }
        else {
            crmspcontact001mb.insertUser = this.authManager.getcurrentUser.username;
            crmspcontact001mb.insertDatetime = new Date();
            this.crmContactManager.savespcontact(crmspcontact001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let crmspcontact001mb = deserialize<Crmspcontact001mb>(Crmspcontact001mb, response);
                this.contact?.push(crmspcontact001mb);
                const newItems = [JSON.parse(JSON.stringify(crmspcontact001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.spContactForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.spContactForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.crmContactManager.crmContactPdf().subscribe((response) =>{
            saveAs(response,"SalesContactDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.crmContactManager.crmContactExcel().subscribe((response) => {
			saveAs(response,"SalesContactDetailsList");
        })
	}
}
