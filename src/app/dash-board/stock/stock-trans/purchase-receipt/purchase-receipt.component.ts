import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseReceiptManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-receipt.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Stktranspurecpt001mb } from 'src/app/shared/services/restcontroller/entities/Stktranspurecpt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-purchase-receipt',
    templateUrl: './purchase-receipt.component.html',
    styleUrls: ['./purchase-receipt.component.css']
})

export class PurchaseReceiptComponent implements OnInit {

    purRecForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    name: string = "Item.Status";
    type: string = "Status";
    stpurtId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    title: string = "";
    status: string = "";
    grandTotal: number | any;
    purtName: string = "";
    statusproperties?: Systemproperties001mb[] = [];
    puReceipts: Stktranspurecpt001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private purchaseReceiptManager: PurchaseReceiptManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.purRecForm = this.formBuilder.group({
            title: ['', Validators.required],
            status: ['', Validators.required],
            grandTotal: ['', Validators.required],
            purtName: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.statusproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.purchaseReceiptManager.allpureceipt().subscribe((response) => {
            this.puReceipts = deserialize<Stktranspurecpt001mb[]>(Stktranspurecpt001mb, response)
            if (this.puReceipts.length > 0) {
                this.gridOptions?.api?.setRowData(this.puReceipts);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.purRecForm.controls; }

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
                field: 'stpurtId',
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
                headerName: 'Title',
                field: 'title',
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
                headerName: 'Grand Total',
                field: 'grandTotal',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Purchase Receipt',
                field: 'purtName',
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
                width: 105,
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
                width: 105,
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
        this.stpurtId = params.data.stpurtId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.purRecForm.patchValue({
            'title': params.data.title,
            'status': params.data.status,
            'grandTotal': params.data.grandTotal,
            'purtName': params.data.purtName
        });
    }

    onDeleteButtonClick(params: any) {
        this.purchaseReceiptManager.deletepureceipt(params.data.stpurtId).subscribe((response) => {
            for (let i = 0; i < this.puReceipts.length; i++) {
                if (this.puReceipts[i].stpurtId == params.data.stpurtId) {
                    this.puReceipts?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Receipt";
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

    onOrderClick(event: any, purRecForm: any) {
        this.markFormGroupTouched(this.purRecForm);
        this.submitted = true;
        if (this.purRecForm.invalid) {
            return;
        }

        let stktranspurecpt001mb = new Stktranspurecpt001mb();
        stktranspurecpt001mb.title = this.f.title.value ? this.f.title.value : "";
        stktranspurecpt001mb.status = this.f.status.value ? this.f.status.value : "";
        stktranspurecpt001mb.grandTotal = this.f.grandTotal.value ? this.f.grandTotal.value : null;
        stktranspurecpt001mb.purtName = this.f.purtName.value ? this.f.purtName.value : "";
        if (this.stpurtId) {
            stktranspurecpt001mb.stpurtId = this.stpurtId;
            stktranspurecpt001mb.insertUser = this.insertUser;
            stktranspurecpt001mb.insertDatetime = this.insertDatetime;
            stktranspurecpt001mb.updatedUser = this.authManager.getcurrentUser.username;
            stktranspurecpt001mb.updatedDatetime = new Date();
            this.purchaseReceiptManager.updatepureceipt(stktranspurecpt001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let del = deserialize<Stktranspurecpt001mb>(Stktranspurecpt001mb, response);
                for (let recpt of this.puReceipts) {
                    if (recpt.stpurtId == del.stpurtId) {
                        recpt.title = del.title;
                        recpt.status = del.status;
                        recpt.grandTotal = del.grandTotal;
                        recpt.purtName = del.purtName;
                        recpt.insertUser = this.insertUser;
                        recpt.insertDatetime = this.insertDatetime;
                        recpt.updatedUser = this.authManager.getcurrentUser.username;
                        recpt.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.puReceipts);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.purRecForm.reset();
                this.stpurtId = null;
                this.submitted = false;
            })
        }
        else {
            stktranspurecpt001mb.insertUser = this.authManager.getcurrentUser.username;
            stktranspurecpt001mb.insertDatetime = new Date();
            this.purchaseReceiptManager.savepureceipt(stktranspurecpt001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let del = deserialize<Stktranspurecpt001mb>(Stktranspurecpt001mb, response);
                this.puReceipts.push(del);
                const newItems = [JSON.parse(JSON.stringify(del))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.purRecForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.purRecForm.reset();
    }

    onGeneratePdfReport() {
		this.purchaseReceiptManager.purchaseReceiptPdf().subscribe((response) => {
			saveAs(response, "PurchaseReceiptList");

		});
	}

	onGenerateExcelReport() {
		this.purchaseReceiptManager.purchaseReceiptExcel().subscribe((response) => {
			saveAs(response, "PurchaseReceiptList");
		});
	}
}