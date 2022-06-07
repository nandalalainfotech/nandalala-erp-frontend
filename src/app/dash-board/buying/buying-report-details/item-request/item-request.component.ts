import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemRequestManager } from 'src/app/shared/services/restcontroller/bizservice/item-request.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Requestitembuy001mb } from 'src/app/shared/services/restcontroller/entities/Requestitembuy001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-item-request',
    templateUrl: './item-request.component.html',
    styleUrls: ['./item-request.component.css']
})
export class ItemRequestComponent implements OnInit {

    riId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    submitted = false;
    itmReqForm: FormGroup | any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    itemCode: string = "";
    warehouse: string = "";
    actual: number|any;
    requested:number|any;
    reserved: number|any;
    ordered: number|any;
    projected: number|any;
    public gridOptions: GridOptions | any;
    itsystemproperties?: Systemproperties001mb[] = [];
    itemRequest: Requestitembuy001mb[] = [];
    itemlist: Itemdt001mb[]=[];

    constructor(private salesitemManager:SalesItemManager,
        private systemPropertyService: SystemPropertiesService, 
        private itemRequestManager: ItemRequestManager, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.itmReqForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            warehouse: ['', Validators.required],
            actual: ['', Validators.required],
            requested: ['', Validators.required],
            reserved: ['', Validators.required],
            ordered: ['', Validators.required],
            projected: ['', Validators.required],
        })
        this.createDataGrid001();
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertyService.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.itemRequestManager.allitemreq().subscribe(response => {
            this.itemRequest = deserialize<Requestitembuy001mb[]>(Requestitembuy001mb, response);
            if (this.itemRequest.length > 0) {
                this.gridOptions?.api?.setRowData(this.itemRequest);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.itmReqForm.controls; }
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
                field: 'riId',
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
                headerName: 'Item',
                field: 'itemCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Warehouse',
                field: 'warehouse',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Actual',
                field: 'actual',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Requested',
                field: 'requested',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Reserved',
                field: 'reserved',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Ordered',
                field: 'ordered',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Projected',
                field: 'projected',
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
        ];

    }
    onEditButtonClick(params: any) {
        this.riId = params.data.riId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.itmReqForm.patchValue({
            'itemCode': params.data.itemCode,
            'warehouse': params.data.warehouse,
            'actual': params.data.actual,
            'requested': params.data.requested,
            'reserved': params.data.reserved,
            'ordered': params.data.ordered,
            'projected': params.data.projected,
        })
    }

    onDeleteButtonClick(params: any) {
        this.itemRequestManager.deleteitemreq(params.data.riId).subscribe((response) => {
            for (let i = 0; i < this.itemRequest.length; i++) {
                if (this.itemRequest[i].riId == params.data.riId) {
                    this.itemRequest?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item Request";
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

    onOrderClick(event: any, itmReq: any) {
        this.markFormGroupTouched(this.itmReqForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.itmReqForm.invalid) {
            return;
        }
        let reqitembuy1mb = new Requestitembuy001mb();
        reqitembuy1mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        reqitembuy1mb.warehouse = this.f.warehouse.value ? this.f.warehouse.value : "";
        reqitembuy1mb.actual = this.f.actual.value ? this.f.actual.value : 0;
        reqitembuy1mb.reserved = this.f.reserved.value ? this.f.reserved.value : 0;
        reqitembuy1mb.requested = this.f.requested.value ? this.f.requested.value : 0;
        reqitembuy1mb.ordered = this.f.ordered.value ? this.f.ordered.value : 0;
        reqitembuy1mb.projected = this.f.projected.value ? this.f.projected.value : 0;
        if (this.riId) {
            reqitembuy1mb.riId = this.riId;
            reqitembuy1mb.insertUser = this.insertUser;
			reqitembuy1mb.insertDatetime = this.insertDatetime;
            reqitembuy1mb.updatedUser = this.authManager.getcurrentUser.username;
			reqitembuy1mb.updatedDatetime = new Date();
            this.itemRequestManager.updateitemreq(reqitembuy1mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let itmreqs = deserialize<Requestitembuy001mb>(Requestitembuy001mb, response);
                for (let itms of this.itemRequest) {
                    if (itms.riId == itmreqs.riId) {
                        itms.actual = itmreqs.actual;
                        itms.itemCode = itmreqs.itemCode;
                        itms.ordered = itmreqs.ordered;
                        itms.projected = itmreqs.projected;
                        itms.requested = itmreqs.requested;
                        itms.reserved = itmreqs.reserved;
                        itms.warehouse = itmreqs.warehouse;
                        itms.insertUser = this.insertUser;
                        itms.insertDatetime = this.insertDatetime;
                        itms.updatedUser = this.authManager.getcurrentUser.username;
                        itms.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.itemRequest);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.itmReqForm.reset();
                this.submitted = false;
                this.riId = null;
            })
        }
        else {
            reqitembuy1mb.insertUser = this.authManager.getcurrentUser.username;
			reqitembuy1mb.insertDatetime = new Date();
            this.itemRequestManager.saveitemreq(reqitembuy1mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let itmreqs = deserialize<Requestitembuy001mb>(Requestitembuy001mb, response);
                this.itemRequest?.push(itmreqs);
                const newItems = [JSON.parse(JSON.stringify(itmreqs))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.itmReqForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.itmReqForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.itemRequestManager.itemRequestPdf().subscribe((response) =>{
            saveAs(response,"PurchaseOrderDetails");

		});
	}

	onGenerateExcelReport(){
		this.itemRequestManager.itemRequestExcel().subscribe((response) => {
			saveAs(response,"PurchaseOrderDetails");
        })
	}

}