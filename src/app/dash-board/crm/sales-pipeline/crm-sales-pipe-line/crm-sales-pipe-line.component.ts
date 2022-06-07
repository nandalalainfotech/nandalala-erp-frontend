import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmSalesPipelineManager } from 'src/app/shared/services/restcontroller/bizservice/crm-sales-pipeline.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Crmsplead001mb } from 'src/app/shared/services/restcontroller/entities/Crmsplead001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-crm-sales-pipe-line',
    templateUrl: './crm-sales-pipe-line.component.html',
    styleUrls: ['./crm-sales-pipe-line.component.css']
})
export class CRMSalesPipeLineComponent implements OnInit {

    salesPipeLineForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    slineId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    personName: string = "";
    orgName: string = "";
    status: string | null = "";
    salesPipe: Crmsplead001mb[] = [];
    spname: string = "crms.status";
    sptype: string = "status";
    stsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private crmSalesPipelineManager: CrmSalesPipelineManager,
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

        this.salesPipeLineForm = this.formBuilder.group({
            personName: ['', Validators.required],
            orgName: ['', Validators.required],
            status: ['', Validators.required],
        });


        this.createDataGrid001();
        this.systemPropertiesService.system(this.spname, this.sptype).subscribe(response => {
            this.stsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.crmSalesPipelineManager.allslpipe().subscribe((response) => {
            this.salesPipe = deserialize<Crmsplead001mb[]>(Crmsplead001mb, response);
            if (this.salesPipe.length > 0) {
                this.gridOptions?.api?.setRowData(this.salesPipe);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.salesPipeLineForm.controls; }

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
                field: 'slineId',
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
                headerName: 'Person Name',
                field: 'personName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Organization Name',
                field: 'orgName',
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

        this.slineId = params.data.slineId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.salesPipeLineForm.patchValue({

            'personName': params.data.personName,
            'orgName': params.data.orgName,
            'status': params.data.status,
        })
    }

    onDeleteButtonClick(params: any) {
        this.crmSalesPipelineManager.deletesalespipeline(params.data.slineId).subscribe((response) => {
            for (let i = 0; i < this.salesPipe.length; i++) {
                if (this.salesPipe[i].slineId == params.data.slineId) {
                    this.salesPipe?.splice(i, 1);
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
        modalRef.componentInstance.title = "Sales PipeLine";
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

    onOrderClick(event: any, salesPipeLineForm: any) {

        this.markFormGroupTouched(this.salesPipeLineForm);
        this.submitted = true;
        if (this.salesPipeLineForm.invalid) {
            return;
        }
        let crmsplead001mb = new Crmsplead001mb();
        crmsplead001mb.personName = this.f.personName.value ? this.f.personName.value : "";
        crmsplead001mb.orgName = this.f.orgName.value ? this.f.orgName.value : "";
        crmsplead001mb.status = this.f.status.value ? this.f.status.value : "";
        if (this.slineId) {
            crmsplead001mb.slineId = this.slineId;
            crmsplead001mb.insertUser = this.insertUser;
            crmsplead001mb.insertDatetime = this.insertDatetime;
            crmsplead001mb.updatedUser = this.authManager.getcurrentUser.username;
            crmsplead001mb.updatedDatetime = new Date();
            this.crmSalesPipelineManager.updatesalespipeline(crmsplead001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let crmsplead001mb = deserialize<Crmsplead001mb>(Crmsplead001mb, response);
                for (let sale of this.salesPipe) {
                    if (sale.slineId == crmsplead001mb.slineId) {
                        sale.personName = crmsplead001mb.personName;
                        sale.orgName = crmsplead001mb.orgName;
                        sale.status = crmsplead001mb.status;
                        sale.insertUser = this.insertUser;
                        sale.insertDatetime = this.insertDatetime;
                        sale.updatedUser = this.authManager.getcurrentUser.username;
                        sale.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.salesPipe);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.salesPipeLineForm.reset();
                this.slineId = null;
                this.submitted = false;
            })
        }
        else {
            crmsplead001mb.insertUser = this.authManager.getcurrentUser.username;
            crmsplead001mb.insertDatetime = new Date();
            this.crmSalesPipelineManager.savesalespipeline(crmsplead001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let crmsplead001mb = deserialize<Crmsplead001mb>(Crmsplead001mb, response);
                this.salesPipe?.push(crmsplead001mb);
                const newItems = [JSON.parse(JSON.stringify(crmsplead001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.salesPipeLineForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.salesPipeLineForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.crmSalesPipelineManager.crmSalesPipelinePdf().subscribe((response) =>{
            saveAs(response,"SalesPipeLineDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.crmSalesPipelineManager.customerBalanceExcel().subscribe((response) => {
			saveAs(response,"SalesPipeLineDetailsList");
        })
	}
}