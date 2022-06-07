import { Component, OnInit, ViewChild } from '@angular/core';
import { Lead001mb } from 'src/app/shared/services/restcontroller/entities/Lead001mb';
import { deserialize } from 'serializer.ts/Serializer';
import { GridOptions } from 'ag-grid-community';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/lead-detail.service';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-lead-detail',
    templateUrl: './lead-detail.component.html',
    styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

    frameworkComponents: any;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    personname: string = "";
    organisationname: string = "";
    status: string = "";
    source: string = "";
    leadowner: string = "";
    nextcontactby: string | null = "";
    leadtype: string | null = "";
    marketsegment: string | null = "";
    leads: Lead001mb[] = [];
    public gridOptions: GridOptions | any;
    leadForm: FormGroup | any;
    submitted = false;

    constructor(private leadDetailsManager: LeadDetailsManager,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer:IconRendererComponent
        }
    }

    ngOnInit() {
        this.leadForm = this.formBuilder.group({
			personname: ['', Validators.required],
			organisationname: ['', Validators.required],
			status: ['', Validators.required],
			source: ['', Validators.required],
			leadowner: ['', Validators.required],
			leadtype: ['', Validators.required],
			marketsegment: ['', Validators.required],
            nextcontactby: ['', Validators.required]
        });

        this.createDataGrid001();
        this.leadDetailsManager.alllead().subscribe((response) => {
            this.leads = deserialize<Lead001mb[]>(Lead001mb, response);
            if (this.leads.length > 0) {
                this.gridOptions?.api?.setRowData(this.leads);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.leadForm.controls; }
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
                headerName: 'personname',
                field: 'personname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Organisationname',
                field: 'organisationname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'status',
                field: 'status',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'source',
                field: 'source',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'leadowner',
                field: 'leadowner',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'nextcontactby',
                field: 'nextcontactby',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'leadtype',
                field: 'leadtype',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'marketsegment',
                field: 'marketsegment',
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
                width: 150,
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
                width: 150,
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
                width: 150,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
        ]
    }
    onEditButtonClick(params: any) {
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.leadForm.patchValue({
			'personname': params.data.personname,
			'organisationname': params.data.organisationname,
			'status': params.data.status,
			'source': params.data.source,
			'leadowner': params.data.leadowner,
			'nextcontactby': params.data.nextcontactby,
			'leadtype': params.data.leadtype,
			'marketsegment': params.data.marketsegment,
        });
    }

    onDeleteButtonClick(params: any) {
        this.leadDetailsManager.deletelead(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.leads.length; i++) {
                if (this.leads[i].id == params.data.id) {
                    this.leads?.splice(i, 1);
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
        modalRef.componentInstance.title = "Lead Details";
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


    onOrderClick(event: any, lead: any) {

        this.markFormGroupTouched(this.leadForm);
		this.submitted = true;
		if (this.leadForm.invalid) {
			return;
		}

        let lead001mb = new Lead001mb();
        lead001mb.personname = this.f.personname.value ? this.f.personname.value : "";
        lead001mb.organisationname = this.f.organisationname.value ? this.f.organisationname.value : "";
        lead001mb.status = this.f.status.value ? this.f.status.value : "";
        lead001mb.source = this.f.source.value ? this.f.source.value : "";
        lead001mb.leadowner = this.f.leadowner.value ? this.f.leadowner.value : "";
        lead001mb.nextcontactby = this.f.nextcontactby.value ? this.f.nextcontactby.value : "";
        lead001mb.leadtype = this.f.leadtype.value ? this.f.leadtype.value : "";
        lead001mb.marketsegment = this.f.marketsegment.value ? this.f.marketsegment.value : "";
        if (this.id) {
            lead001mb.id = this.id;
            lead001mb.insertUser = this.insertUser;
            lead001mb.insertDatetime = this.insertDatetime;
            lead001mb.updatedUser = this.authManager.getcurrentUser.username;
            lead001mb.updatedDatetime = new Date();
            this.leadDetailsManager.leadupdate(lead001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let leadss = deserialize<Lead001mb>(Lead001mb, response);
                for (let lead of this.leads) {
                    if (lead.id == leadss.id) {
                        lead.personname = leadss.personname;
                        lead.organisationname = leadss.organisationname;
                        lead.status = leadss.status;
                        lead.source = leadss.source;
                        lead.leadowner = leadss.leadowner;
                        lead.nextcontactby = leadss.nextcontactby;
                        lead.leadtype = leadss.leadtype;
                        lead.marketsegment = leadss.marketsegment;
                        lead.insertUser = this.insertUser;
                        lead.insertDatetime = this.insertDatetime;
                        lead.updatedUser = this.authManager.getcurrentUser.username;
                        lead.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.leads);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.leadForm.reset();
                this.submitted=false;
                this.id = null;
            })
        }
        else {
            lead001mb.insertUser = this.authManager.getcurrentUser.username;
            lead001mb.insertDatetime = new Date();
            this.leadDetailsManager.savelead(lead001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let leadss = deserialize<Lead001mb>(Lead001mb, response);
                this.leads?.push(leadss);
                const newItems = [JSON.parse(JSON.stringify(leadss))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.leadForm.reset();
                this.submitted=false;
            })
        }
    }
    onReset() {
        this.leadForm.reset();
        this.submitted=false;
    }

    onGeneratePdfReport(){
		this.leadDetailsManager.leadDetailsPdf().subscribe((response) =>{
            saveAs(response,"LeadDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.leadDetailsManager.leadDetailsExcel().subscribe((response) => {
			saveAs(response,"LeadDetailsList");
        })
	}
}

