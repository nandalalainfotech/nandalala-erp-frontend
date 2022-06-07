import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { suStatusManager } from 'src/app/shared/services/restcontroller/bizservice/sustatus.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Supstatus001mb } from 'src/app/shared/services/restcontroller/entities/Supstatus001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-supplier-status',
    templateUrl: './supplier-status.component.html',
    styleUrls: ['./supplier-status.component.css']
})

export class SupplierStatusComponent implements OnInit {

    frameworkComponents: any;
    suppStatusForm: FormGroup | any;
    sustatusId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    supName: string = "";
    sustatus: string = "";
    phone: number | any;
    supname = "PRSupp.Type";
    sutype = "Type";
    supstname = "Supplier.Status";
    supsttype = "Status";
    submitted = false;
    supStatus: Supstatus001mb[] = [];
    supstsystemproperties: Systemproperties001mb[] = [];
    supsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private sustatusManager: suStatusManager,
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
        this.createDataGrid001();
        this.suppStatusForm = this.formBuilder.group({
            supName: ['', Validators.required],
            sustatus: ['', Validators.required],
            phone: ['', Validators.required],
        })

        this.systemPropertiesService.system(this.supname, this.sutype).subscribe(response => {
            this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.supstname, this.supsttype).subscribe(response => {
            this.supstsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.sustatusManager.allsupstatus().subscribe((response) => {
            this.supStatus = deserialize<Supstatus001mb[]>(Supstatus001mb, response);
            if (this.supStatus.length > 0) {
                this.gridOptions?.api?.setRowData(this.supStatus);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.suppStatusForm.controls }

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
                headerName: '#Id',
                field: 'sustatusId',
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
                headerName: 'Supplier Name',
                field: 'supName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'sustatus',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Phone',
                field: 'phone',
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
                width: 100,
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
                width: 120,
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
                width: 100,
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
        this.sustatusId = params.data.sustatusId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.suppStatusForm.patchValue({
            'supName': params.data.supName,
            'sustatus': params.data.sustatus,
            'phone': params.data.phone,
        });
    }

    onDeleteButtonClick(params: any) {
        this.sustatusManager.supstausdelete(params.data.sustatusId).subscribe((response) => {
            for (let i = 0; i < this.supStatus.length; i++) {
                if (this.supStatus[i].sustatusId == params.data.sustatusId) {
                    this.supStatus?.splice(i, 1);
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
        modalRef.componentInstance.title = "Status";
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

    onOrderClick(event: any, suppStatusForm: any) {
        this.markFormGroupTouched(this.suppStatusForm);
        this.submitted = true;
        if (this.suppStatusForm.invalid) {
            return;
        }
        let supstatus001mb = new Supstatus001mb();
        supstatus001mb.phone = this.f.phone.value ? this.f.phone.value : null;
        supstatus001mb.supName = this.f.supName.value ? this.f.supName.value : "";
        supstatus001mb.sustatus = this.f.sustatus.value ? this.f.sustatus.value : "";
        if (this.sustatusId) {
            supstatus001mb.sustatusId = this.sustatusId;
            supstatus001mb.insertUser = this.insertUser;
			supstatus001mb.insertDatetime = this.insertDatetime;
            supstatus001mb.updatedUser = this.authManager.getcurrentUser.username;
			supstatus001mb.updatedDatetime = new Date();
            this.sustatusManager.sustatusupdate(supstatus001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sustatusres = deserialize<Supstatus001mb>(Supstatus001mb, response);
                for (let supstatus of this.supStatus) {
                    if (supstatus.sustatusId == sustatusres.sustatusId) {
                        supstatus.phone = sustatusres.phone;
                        supstatus.supName = sustatusres.supName;
                        supstatus.sustatus = sustatusres.sustatus;
                        supstatus.insertUser = this.insertUser;
                        supstatus.insertDatetime = this.insertDatetime;
                        supstatus.updatedUser = this.authManager.getcurrentUser.username;
                        supstatus.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.supStatus);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.suppStatusForm.reset();
                this.sustatusId = null;
                this.submitted = false;
            })
        }
        else {
            supstatus001mb.insertUser = this.authManager.getcurrentUser.username;
			supstatus001mb.insertDatetime = new Date();
            this.sustatusManager.supstatussave(supstatus001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let supst = deserialize<Supstatus001mb>(Supstatus001mb, response);
                this.supStatus.push(supst);
                const newItems = [JSON.parse(JSON.stringify(supst))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.suppStatusForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.suppStatusForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.sustatusManager.sustatusPdf().subscribe((response) =>{
            saveAs(response,"SupplierStatusList");

		});
	}

	onGenerateExcelReport(){
		this.sustatusManager.sustatusExcel().subscribe((response) => {
			saveAs(response,"SupplierStatusList");
        })
	}

}