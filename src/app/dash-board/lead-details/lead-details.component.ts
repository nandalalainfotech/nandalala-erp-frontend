import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/lead-detail.service';
import { Lead001mb } from 'src/app/shared/services/restcontroller/entities/Lead001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-lead-details',
    templateUrl: './lead-details.component.html',
    styleUrls: ['./lead-details.component.css'],
})
export class LeadDetailsComponent implements OnInit {
    detailsLeadForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    id: number | any;
    insertUser: string = '';
    insertDatetime: Date | any;
    personname: string = '';
    organisationname: string = '';
    status: string = '';
    source: string = '';
    leadowner: string = '';
    nextcontactby: string | null = '';
    leadtype: string | null = '';
    marketsegment: string | null = '';
    lead: Lead001mb[] = [];
    public gridOptions: GridOptions | any;
    user?: User001mb;
    parentMenuString: string = '';
    childMenuString: string = '';

    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;

    constructor(
        private leadDetailsManager: LeadDetailsManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private authManger: AuthManager,
        private router: Router,
        // private loginManager: LoginManager,
        private dataSharedService: DataSharedService,

        private modalService: NgbModal
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        };
    }

    ngOnInit() {
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });

        this.detailsLeadForm = this.formBuilder.group({
            personname: ['', Validators.required],
            organisationname: ['', Validators.required],
            status: ['', Validators.required],
            source: ['', Validators.required],
            leadowner: ['', Validators.required],
            nextcontactby: ['', Validators.required],
            leadtype: ['', Validators.required],
            marketsegment: ['', Validators.required],
        });

        this.createDataGrid001();
        this.leadDetailsManager.alllead().subscribe((response) => {
            this.lead = deserialize<Lead001mb[]>(Lead001mb, response);
            if (this.lead.length > 0) {
                this.gridOptions?.api?.setRowData(this.lead);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() {
        return this.detailsLeadForm.controls;
    }

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
                headerName: 'id',
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
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit',
                },
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 205,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onDeleteButtonClick.bind(this),
                    label: 'Delete',
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
                    label: 'Audit',
                },
            },
        ];
    }

    onEditButtonClick(params: any) {
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.detailsLeadForm.patchValue({
            personname: params.data.personname,
            organisationname: params.data.organisationname,
            status: params.data.status,
            source: params.data.source,
            leadowner: params.data.leadowner,
            nextcontactby: params.data.nextcontactby,
            leadtype: params.data.leadtype,
            marketsegment: params.data.marketsegment,
        });
    }

    onDeleteButtonClick(params: any) {
        this.leadDetailsManager
            .deletelead(params.data.id)
            .subscribe((response) => {
                for (let i = 0; i < this.lead.length; i++) {
                    if (this.lead[i].id == params.data.id) {
                        this.lead?.splice(i, 1);
                        break;
                    }
                }
                const selectedRows = params.api.getSelectedRows();
                params.api.applyTransaction({ remove: selectedRows });
                this.calloutService.showSuccess('Order Removed Successfully');
            });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = 'Lead';
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

    onOrderClick(event: any, detailsLeadForm: any) {
        this.markFormGroupTouched(this.detailsLeadForm);
        this.submitted = true;
        if (this.detailsLeadForm.invalid) {
            return;
        }
        let lead001mb = new Lead001mb();
        lead001mb.personname = this.f.personname.value
            ? this.f.personname.value
            : '';
        lead001mb.organisationname = this.f.organisationname.value
            ? this.f.organisationname.value
            : '';
        lead001mb.status = this.f.status.value ? this.f.status.value : '';
        lead001mb.source = this.f.source.value ? this.f.source.value : '';
        lead001mb.leadowner = this.f.leadowner.value
            ? this.f.leadowner.value
            : '';
        lead001mb.nextcontactby = this.f.nextcontactby.value
            ? this.f.nextcontactby.value
            : '';
        lead001mb.leadtype = this.f.leadtype.value ? this.f.leadtype.value : '';
        lead001mb.marketsegment = this.f.marketsegment.value
            ? this.f.marketsegment.value
            : '';
        if (this.id) {
            lead001mb.id = this.id;
            lead001mb.insertUser = this.insertUser;
            lead001mb.insertDatetime = this.insertDatetime;
            lead001mb.updatedUser = this.authManager.getcurrentUser.username;
            lead001mb.updatedDatetime = new Date();
            this.leadDetailsManager
                .leadupdate(lead001mb)
                .subscribe((response) => {
                    this.calloutService.showSuccess(
                        'Order Updated Successfully'
                    );
                    let leadres = deserialize<Lead001mb>(Lead001mb, response);
                    for (let leaddet of this.lead) {
                        if (leaddet.id == leadres.id) {
                            leaddet.personname = leadres.personname;
                            leaddet.organisationname = leadres.organisationname;
                            leaddet.status = leadres.status;
                            leaddet.source = leadres.source;
                            leaddet.leadowner = leadres.leadowner;
                            leaddet.nextcontactby = leadres.nextcontactby;
                            leaddet.leadtype = leadres.leadtype;
                            leaddet.marketsegment = leadres.marketsegment;
                            leaddet.insertUser = this.insertUser;
                            leaddet.insertDatetime = this.insertDatetime;
                            leaddet.updatedUser =
                                this.authManager.getcurrentUser.username;
                            leaddet.updatedDatetime = new Date();
                        }
                    }
                    this.gridOptions.api.setRowData(this.lead);
                    this.gridOptions.api.refreshView();
                    this.gridOptions.api.deselectAll();
                    this.detailsLeadForm.reset();
                    this.id = null;
                    this.submitted = false;
                });
        } else {
            lead001mb.insertUser = this.authManager.getcurrentUser.username;
            lead001mb.insertDatetime = new Date();
            this.leadDetailsManager
                .savelead(lead001mb)
                .subscribe((response) => {
                    this.calloutService.showSuccess('Order Saved Successfully');
                    let lead001 = deserialize<Lead001mb>(Lead001mb, response);
                    this.lead?.push(lead001);
                    const newItems = [JSON.parse(JSON.stringify(lead001))];
                    this.gridOptions.api.applyTransaction({ add: newItems });
                    this.detailsLeadForm.reset();
                    this.submitted = false;
                });
        }
    }
    onReset() {
        this.detailsLeadForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.leadDetailsManager.leadDetailsPdf().subscribe((response) =>{
            saveAs(response,"LeadDetails");

		});
	}

	onGenerateExcelReport(){
		this.leadDetailsManager.leadDetailsExcel().subscribe((response) => {
			saveAs(response,"LeadDetails");
        })
	}

}
