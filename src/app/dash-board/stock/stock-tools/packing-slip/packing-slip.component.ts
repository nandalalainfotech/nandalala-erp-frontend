import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DeliveryNoteManager } from 'src/app/shared/services/restcontroller/bizservice/delivery-note.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { PackageSlipManager } from 'src/app/shared/services/restcontroller/bizservice/tool-pkgslip.service';
import { Packingslip001mb } from 'src/app/shared/services/restcontroller/entities/Packingslip001mb';
import { Stktransdeliver001mb } from 'src/app/shared/services/restcontroller/entities/Stktransdeliver001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-packing-slip',
    templateUrl: './packing-slip.component.html',
    styleUrls: ['./packing-slip.component.css']
})
export class PackingSlipComponent implements OnInit {

    frameworkComponents: any;
    psId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    submitted = false;
    slipForm: FormGroup | any;
    fname: string = "recruit.offerletter";
    ftype: string = "offerletter";
    slipName: string = "";
    status: string = "";
    delName: string = "";
    packingSlip: Packingslip001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    tsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    delivaryNotes: Stktransdeliver001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private deliveryNoteManager: DeliveryNoteManager, 
        private packageSlipManager: PackageSlipManager, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {
        this.slipForm = this.formBuilder.group({
            slipName: ['', Validators.required],
            status: ['', Validators.required],
            delName: ['', Validators.required],
        })
        this.createDataGrid001();
        this.systemPropertiesService.system(this.fname, this.ftype).subscribe(response => {
            this.tsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.deliveryNoteManager.alldelnote().subscribe((response) => {
            this.delivaryNotes = deserialize<Stktransdeliver001mb[]>(Stktransdeliver001mb, response)
        });
        this.packageSlipManager.allpacking().subscribe((response) => {
            this.packingSlip = deserialize<Packingslip001mb[]>(Packingslip001mb, response);
            if (this.packingSlip.length > 0) {
                this.gridOptions?.api?.setRowData(this.packingSlip);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.slipForm.controls; }

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
                headerName: '#Id',
                field: 'psId',
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
                headerName: 'Slip Name',
                field: 'slipName',
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
                headerName: 'Delivery Note',
                field: 'delName',
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
                width: 80,
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
                width: 85,
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
        this.psId = params.data.psId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.slipForm.patchValue({
            'slipName': params.data.slipName,
            'status': params.data.status,
            'delName': params.data.delName,
        })
    }
    onDeleteButtonClick(params: any) {
        this.packageSlipManager.deletepacking(params.data.psId).subscribe((response) => {
            for (let i = 0; i < this.packingSlip.length; i++) {
                if (this.packingSlip[i].psId == params.data.psId) {
                    this.packingSlip?.splice(i, 1);
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
        modalRef.componentInstance.title = "Packing Slip";
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
    onOrderClick(event: any, slip: any) {
        this.markFormGroupTouched(this.slipForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.slipForm.invalid) {
            return;
        }
        let packingslip001mb = new Packingslip001mb();
        packingslip001mb.slipName = this.f.slipName.value ? this.f.slipName.value : "";
        packingslip001mb.status = this.f.status.value ? this.f.status.value : "";
        packingslip001mb.delName = this.f.delName.value ? this.f.delName.value : "";
        if (this.psId) {
            packingslip001mb.psId = this.psId;
            packingslip001mb.insertUser = this.insertUser;
            packingslip001mb.insertDatetime = this.insertDatetime;
            packingslip001mb.updatedUser = this.authManager.getcurrentUser.username;
            packingslip001mb.updatedDatetime = new Date();
            this.packageSlipManager.updatepacking(packingslip001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let packagesilpres = deserialize<Packingslip001mb>(Packingslip001mb, response);
                for (let pkgslip of this.packingSlip) {
                    if (pkgslip.psId == packagesilpres.psId) {
                        pkgslip.slipName = packagesilpres.slipName;
                        pkgslip.status = packagesilpres.status;
                        pkgslip.delName = packagesilpres.delName;
                        pkgslip.insertUser = this.insertUser;
                        pkgslip.insertDatetime = this.insertDatetime;
                        pkgslip.updatedUser = this.authManager.getcurrentUser.username;
                        pkgslip.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.packingSlip);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.slipForm.reset();
                this.submitted = false;
                this.psId = null;
            })
        }
        else {
            packingslip001mb.insertUser = this.authManager.getcurrentUser.username;
            packingslip001mb.insertDatetime = new Date();
            this.packageSlipManager.savepacking(packingslip001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let slips = deserialize<Packingslip001mb>(Packingslip001mb, response);
                this.packingSlip.push(slips);
                const newItems = [JSON.parse(JSON.stringify(slips))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.slipForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.slipForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.packageSlipManager.packageSlipPdf().subscribe((response) => {
			saveAs(response, "PackingSlipList");

		});
	}

	onGenerateExcelReport() {
		this.packageSlipManager.packageSlipExcel().subscribe((response) => {
			saveAs(response, "PackingSlipList");
		});
	}
}