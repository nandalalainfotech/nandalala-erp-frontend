import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmOpportunityManager } from 'src/app/shared/services/restcontroller/bizservice/crm-opportunity.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Crmspoppo001mb } from 'src/app/shared/services/restcontroller/entities/Crmspoppo001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-opportunity',
    templateUrl: './opportunity.component.html',
    styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

    OpportunityForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    oppId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "crmoppo.type";
    type: string = "type";
    gname: string = "crmoppo.from";
    gtype: string = "from";
    sname: string = "crmsoppo.status";
    stype: string = "status";
    oppSeries: string = "";
    oppType: string | null = "";
    oppFrom: string | null = "";
    status: string | null = "";
    withitems: boolean = false;
    crmspOppo: Crmspoppo001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    vsystemproperties?: Systemproperties001mb[] = [];
    psystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private crmOpportunityManager: CrmOpportunityManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.OpportunityForm = this.formBuilder.group({
            oppSeries: ['', Validators.required],
            oppType: ['', Validators.required],
            oppFrom: ['', Validators.required],
            status: ['', Validators.required],
            withitems: [''],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.gname, this.gtype).subscribe(response => {
            this.vsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.sname, this.stype).subscribe(response => {
            this.psystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.crmOpportunityManager.allopportunity().subscribe(response => {
            this.crmspOppo = deserialize<Crmspoppo001mb[]>(Crmspoppo001mb, response);
            if (this.crmspOppo.length > 0) {
                this.gridOptions?.api?.setRowData(this.crmspOppo);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.OpportunityForm.controls; }

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
                field: 'oppId',
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
                headerName: 'Series',
                field: 'oppSeries',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Type',
                field: 'oppType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Source',
                field: 'oppFrom',
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
                headerName: 'With Items',
                field: 'withitems',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.withitems == 1 ? true : false;
                }
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
                width: 155,
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
                width: 155,
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

        this.oppId = params.data.oppId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.OpportunityForm.patchValue({
            'oppSeries': params.data.oppSeries,
            'oppType': params.data.oppType,
            'oppFrom': params.data.oppFrom,
            'status': params.data.status,
            'withitems': params.data.withitems,
        })
    }

    onDeleteButtonClick(params: any) {
        this.crmOpportunityManager.deleteopportunity(params.data.oppId).subscribe((response) => {
            for (let i = 0; i < this.crmspOppo.length; i++) {
                if (this.crmspOppo[i].oppId == params.data.oppId) {
                    this.crmspOppo?.splice(i, 1);
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
        modalRef.componentInstance.title = "Opportunity";
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

    onOrderClick(event: any, OpportunityForm: any) {

        this.markFormGroupTouched(this.OpportunityForm);
        this.submitted = true;
        if (this.OpportunityForm.invalid) {
            return;
        }

        let crmspoppo001mb = new Crmspoppo001mb();
        crmspoppo001mb.oppSeries = this.f.oppSeries.value ? this.f.oppSeries.value : "";
        crmspoppo001mb.oppType = this.f.oppType.value ? this.f.oppType.value : "";
        crmspoppo001mb.oppFrom = this.f.oppFrom.value ? this.f.oppFrom.value : "";
        crmspoppo001mb.status = this.f.status.value ? this.f.status.value : "";
        crmspoppo001mb.withitems = this.f.withitems.value ? this.f.withitems.value : false;
        if (this.oppId) {
            crmspoppo001mb.oppId = this.oppId;
            crmspoppo001mb.insertUser = this.insertUser;
            crmspoppo001mb.insertDatetime = this.insertDatetime;
            crmspoppo001mb.updatedUser = this.authManager.getcurrentUser.username;
            crmspoppo001mb.updatedDatetime = new Date();
            this.crmOpportunityManager.updateopportunity(crmspoppo001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sales = deserialize<Crmspoppo001mb>(Crmspoppo001mb, response);
                for (let opp of this.crmspOppo) {
                    if (opp.oppId == sales.oppId) {
                        opp.oppSeries = sales.oppSeries;
                        opp.oppType = sales.oppType;
                        opp.oppFrom = sales.oppFrom;
                        opp.status = sales.status;
                        opp.withitems = sales.withitems;
                        opp.insertUser = this.insertUser;
                        opp.insertDatetime = this.insertDatetime;
                        opp.updatedUser = this.authManager.getcurrentUser.username;
                        opp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.crmspOppo);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.OpportunityForm.reset();
                this.oppId = null;
                this.submitted = false;
            })
        }
        else {
            crmspoppo001mb.insertUser = this.authManager.getcurrentUser.username;
            crmspoppo001mb.insertDatetime = new Date();
            this.crmOpportunityManager.saveopportunity(crmspoppo001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let sales = deserialize<Crmspoppo001mb>(Crmspoppo001mb, response);
                this.crmspOppo?.push(sales);
                const newItems = [JSON.parse(JSON.stringify(sales))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.OpportunityForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.OpportunityForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.crmOpportunityManager.crmOpportunityPdf().subscribe((response) =>{
            saveAs(response,"OpportunityDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.crmOpportunityManager.crmOpportunityExcel().subscribe((response) => {
			saveAs(response,"OpportunityDetailsList");
        })
	}
}

