import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MatreqSupwiseManager } from 'src/app/shared/services/restcontroller/bizservice/matreq-supwise.service';
import { RequestItemTransferManager } from 'src/app/shared/services/restcontroller/bizservice/request-item-transfer.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Matreqsunotcreate001mb } from 'src/app/shared/services/restcontroller/entities/Matreqsunotcreate001mb';
import { Reqitemtransfer001mb } from 'src/app/shared/services/restcontroller/entities/Reqitemtransfer001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-req-itm-transfer',
    templateUrl: './req-itm-transfer.component.html',
    styleUrls: ['./req-itm-transfer.component.css']
})

export class ReqItmTransferComponent implements OnInit {

    frameworkComponents: any;
    ittransId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    mrSeries: string = "";
    date!: Date | null;
    quantity: string = "";
    transferQty: string | null = "";
    qtytoTransfer: string | null = "";
    itemCode: string = "";
    company: string = "";
    description: string = "";
    reqTransfers: Reqitemtransfer001mb[] = [];
    matsystemproperties: Systemproperties001mb[] = [];
    itmsystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    transferForm: FormGroup | any;
    submitted = false;
    matSupwises: Matreqsunotcreate001mb[] = [];
    stkitems: Itemdt001mb[] = [];

    constructor(private systemProperiesService: SystemPropertiesService, 
        private datePipe: DatePipe, 
        private formBuilder: FormBuilder,
        private requestItemTransferManager: RequestItemTransferManager, 
        private salesItemManager: SalesItemManager, 
        private matreqSupwiseManager: MatreqSupwiseManager, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.transferForm = this.formBuilder.group({
            transferQty: ['', Validators.required],
            date: ['', Validators.required],
            quantity: ['', Validators.required],
            itemCode: ['', Validators.required],
            company: ['', Validators.required],
            description: ['', Validators.required],
            mrSeries: ['', Validators.required],
            qtytoTransfer: ['', Validators.required]
        });

        this.createDataGrid001mb();
        this.matreqSupwiseManager.allmatreq().subscribe((response) => {
            this.matSupwises = deserialize<Matreqsunotcreate001mb[]>(Matreqsunotcreate001mb, response)
        })
        this.salesItemManager.allsalesitem().subscribe((response) => {
            this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.requestItemTransferManager.allreqtransfer().subscribe(response => {
            this.reqTransfers = deserialize<Reqitemtransfer001mb[]>(Reqitemtransfer001mb, response);
            if (this.reqTransfers.length > 0) {
                this.gridOptions?.api?.setRowData(this.reqTransfers);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.transferForm.controls; }
    createDataGrid001mb(): void {
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
                field: 'ittransId',
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
                headerName: 'Material',
                field: 'mrSeries',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Date',
                field: 'date',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.date ? this.datePipe.transform(params.data.date, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Transfer Qty',
                field: 'transferQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Qty To Transfer',
                field: 'qtytoTransfer',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'Company',
                field: 'company',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Description',
                field: 'description',
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
                    label: 'Edit'
                },
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 200,
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
                width: 200,
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
        this.ittransId = params.data.ittransId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.transferForm.patchValue({
            'mrSeries': params.data.mrSeries,
            'transferQty': params.data.transferQty,
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'qtytoTransfer': params.data.qtytoTransfer,
            'quantity': params.data.quantity,
            'company': params.data.company,
            'itemCode': params.data.itemCode,
            'description': params.data.description,
        });
    }

    onDeleteButtonClick(params: any) {
        this.requestItemTransferManager.reqtransferdelete(params.data.ittransId).subscribe(response => {
            for (let i = 0; i < this.reqTransfers.length; i++) {
                if (this.reqTransfers[i].ittransId == params.data.ittransId) {
                    this.reqTransfers?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Request Item Transfer";
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

    onOrderClick(event: any, transferForm: any) {

        this.markFormGroupTouched(this.transferForm);
        this.submitted = true;
        if (this.transferForm.invalid) {
            return;
        }

        let reqitemtransfer001mb = new Reqitemtransfer001mb();

        reqitemtransfer001mb.date = new Date(this.f.date.value);
        reqitemtransfer001mb.mrSeries = this.f.mrSeries.value ? this.f.mrSeries.value : "";
        reqitemtransfer001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        reqitemtransfer001mb.transferQty = this.f.transferQty.value ? this.f.transferQty.value : "";
        reqitemtransfer001mb.qtytoTransfer = this.f.qtytoTransfer.value ? this.f.qtytoTransfer.value : "";
        reqitemtransfer001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        reqitemtransfer001mb.company = this.f.company.value ? this.f.company.value : "";
        reqitemtransfer001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.ittransId) {
            reqitemtransfer001mb.ittransId = this.ittransId;
            reqitemtransfer001mb.insertUser = this.insertUser;
            reqitemtransfer001mb.insertDatetime = this.insertDatetime;
            reqitemtransfer001mb.updatedUser = this.authManager.getcurrentUser.username;
            reqitemtransfer001mb.updatedDatetime = new Date();
            this.requestItemTransferManager.reqtransfersave(reqitemtransfer001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let transfers = deserialize<Reqitemtransfer001mb>(Reqitemtransfer001mb, response);
                for (let items of this.reqTransfers) {
                    if (items.ittransId == transfers.ittransId) {
                        items.mrSeries = transfers.mrSeries;
                        items.date = transfers.date;
                        items.itemCode = transfers.itemCode;
                        items.transferQty = transfers.transferQty;
                        items.company = transfers.company;
                        items.description = transfers.description;
                        items.qtytoTransfer = transfers.qtytoTransfer;
                        items.description = transfers.description;
                        items.insertUser = this.insertUser;
                        items.insertDatetime = this.insertDatetime;
                        items.updatedUser = this.authManager.getcurrentUser.username;
                        items.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.reqTransfers);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.transferForm.reset();
                this.submitted = false;
                this.ittransId = null;
            });
        } else {
            reqitemtransfer001mb.insertUser = this.authManager.getcurrentUser.username;
            reqitemtransfer001mb.insertDatetime = new Date();
            this.requestItemTransferManager.reqtransfersave(reqitemtransfer001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let transfers = deserialize<Reqitemtransfer001mb>(Reqitemtransfer001mb, response);
                this.reqTransfers.push(transfers);
                const newItems = [JSON.parse(JSON.stringify(transfers))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.transferForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.transferForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.requestItemTransferManager.requestItemTransferPdf().subscribe((response) =>{
            saveAs(response,"RequestItemTransferList");

		});
	}

	onGenerateExcelReport(){
		this.requestItemTransferManager.requestItemTransferExcel().subscribe((response) => {
			saveAs(response,"RequestItemTransferList");
        })
	}

}