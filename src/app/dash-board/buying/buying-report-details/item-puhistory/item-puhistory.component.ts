import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemPuhistoryManager } from 'src/app/shared/services/restcontroller/bizservice/item-puhistory.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Itempuhist001mb } from 'src/app/shared/services/restcontroller/entities/Itempuhist001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-item-puhistory',
    templateUrl: './item-puhistory.component.html',
    styleUrls: ['./item-puhistory.component.css']
})
export class ItemPuhistoryComponent implements OnInit {

    histId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    submitted = false;
    itPuhisForm: FormGroup | any;
    frameworkComponents: any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    grpname: string = "Item.Group";
    grptype: string = "Group";
    poname: string = "PRMatReq.Type";
    potype: string = "Type";
    supname: string = "PRSupp.Type";
    suptype: string = "Type";
    itemCode: string = "";
    itemGroup: string = "";
    description: string = "";
    quantity: number | any;
    uom: string = "";
    date: Date | null = null;
    amount: number | any;
    poSeries: string | null = "";
    transDate: Date | null = null;
    supplier: string | null = "";
    receivedqty: number | any;
    company: string = "";
    public gridOptions: GridOptions | any;
    itempuHis: Itempuhist001mb[] = [];
    itsystemproperties?: Systemproperties001mb[] = [];
    gpsystemproperties?: Systemproperties001mb[] = [];
    posystemproperties?: Systemproperties001mb[] = [];
    supsystemproperties?: Systemproperties001mb[] = [];
    itemlist: Itemdt001mb[]=[];

    constructor(private salesitemManager:SalesItemManager,
        private systemPropertyServeice: SystemPropertiesService, 
        private itemPuhistoryManager: ItemPuhistoryManager, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {

        this.frameworkComponents = {
            iconRenderer: IconRendererComponent

        }
    }
    ngOnInit() {
        this.itPuhisForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            itemGroup: ['', Validators.required],
            date: ['', Validators.required],
            quantity: ['', Validators.required],
            description: ['', Validators.required],
            company: ['', Validators.required],
            uom: ['', Validators.required],
            amount: ['', Validators.required],
            poSeries: ['', Validators.required],
            transDate: ['', Validators.required],
            supplier: ['', Validators.required],
            receivedqty: ['', Validators.required],
        })
        this.createDataGrid001();
        this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertyServeice.system(this.grpname, this.grptype,).subscribe((response) => {
            this.gpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertyServeice.system(this.poname, this.potype,).subscribe((response) => {
            this.posystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertyServeice.system(this.supname, this.suptype,).subscribe((response) => {
            this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.itemPuhistoryManager.allitempuhis().subscribe((response) => {
            this.itempuHis = deserialize<Itempuhist001mb[]>(Itempuhist001mb, response)
            if (this.itempuHis.length > 0) {
                this.gridOptions?.api?.setRowData(this.itempuHis);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.itPuhisForm.controls; }

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
                field: 'histId',
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
                headerName: 'Group',
                field: 'itemGroup',
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
                headerName: 'UOM',
                field: 'uom',
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
                suppressSizeToFit: true,
                resizable: true,
                valueGetter: (params: any) => {
                    return params.data.date ? this.datePipe.transform(params.data.date, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Amount',
                field: 'amount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'POSeries',
                field: 'poSeries',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'TransDate',
                field: 'transDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.transDate ? this.datePipe.transform(params.data.transDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Supplier',
                field: 'supplier',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'ReceivedQty',
                field: 'receivedqty',
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
                width: 180,
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
        this.histId = params.data.histId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.itPuhisForm.patchValue({
            'itemGroup': params.data.itemGroup,
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'itemCode': params.data.itemCode,
            'quantity': params.data.quantity,
            'uom': params.data.uom,
            'amount': params.data.amount,
            'description': params.data.description,
            'company': params.data.company,
            'poSeries': params.data.poSeries,
            'transDate': this.datePipe.transform(params.data.transDate, 'MM/dd/yyyy'),
            'supplier': params.data.supplier,
            'receivedqty': params.data.receivedqty,
        })
    }

    onDeleteButtonClick(params: any) {
        this.itemPuhistoryManager.deletepuhis(params.data.histId).subscribe((response) => {
            for (let i = 0; i < this.itempuHis.length; i++) {
                if (this.itempuHis[i].histId == params.data.histId) {
                    this.itempuHis?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item PUHistory";
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

    onOrderClick(event: any, itPuhis: any) {
        this.markFormGroupTouched(this.itPuhisForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.itPuhisForm.invalid) {
            return;
        }
        let itempuhist001mb = new Itempuhist001mb();
        itempuhist001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
        itempuhist001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        itempuhist001mb.description = this.f.description.value ? this.f.description.value : "";
        itempuhist001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        itempuhist001mb.date = new Date(this.f.date.value);
        itempuhist001mb.uom = this.f.uom.value ? this.f.uom.value : "";
        itempuhist001mb.amount = this.f.amount.value ? this.f.amount.value : null;
        itempuhist001mb.poSeries = this.f.poSeries.value ? this.f.poSeries.value : "";
        itempuhist001mb.transDate =new Date(this.f.transDate.value);
        itempuhist001mb.supplier = this.f.supplier.value ? this.f.supplier.value : "";
        itempuhist001mb.receivedqty = this.f.receivedqty.value ? this.f.receivedqty.value : null;
        itempuhist001mb.company = this.f.company.value ? this.f.company.value : "";
        if (this.histId) {
            itempuhist001mb.histId = this.histId;
            itempuhist001mb.insertUser = this.insertUser;
			itempuhist001mb.insertDatetime = this.insertDatetime;
            itempuhist001mb.updatedUser = this.authManager.getcurrentUser.username;
			itempuhist001mb.updatedDatetime = new Date();
            this.itemPuhistoryManager.updateitmpuhist(itempuhist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let itemph = deserialize<Itempuhist001mb>(Itempuhist001mb, response);
                for (let item of this.itempuHis) {
                    if (item.histId == itemph.histId) {
                        item.company = itemph.company;
                        item.date = itemph.date;
                        item.description = itemph.description;
                        item.itemCode = itemph.itemCode;
                        item.itemGroup = itemph.itemGroup;
                        item.poSeries = itemph.poSeries;
                        item.quantity = itemph.quantity;
                        item.receivedqty = itemph.receivedqty;
                        item.supplier = itemph.supplier;
                        item.transDate = itemph.transDate;
                        item.uom = itemph.uom;
                        item.insertUser = this.insertUser;
                        item.insertDatetime = this.insertDatetime;
                        item.updatedUser = this.authManager.getcurrentUser.username;
                        item.updatedDatetime = new Date();

                    }
                }
                this.gridOptions.api.setRowData(this.itempuHis);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.itPuhisForm.reset();
                this.submitted = false;
                this.histId = null;
            })
        }
        else {
            itempuhist001mb.insertUser = this.authManager.getcurrentUser.username;
			itempuhist001mb.insertDatetime = new Date();
            this.itemPuhistoryManager.saveitmpuhist(itempuhist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let itemph = deserialize<Itempuhist001mb>(Itempuhist001mb, response);
                this.itempuHis?.push(itemph);
                const newItems = [JSON.parse(JSON.stringify(itemph))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.itPuhisForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.itPuhisForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.itemPuhistoryManager.itemPuhistoryPdf().subscribe((response) =>{
            saveAs(response,"ItemHistoryList");

		});
	}

	onGenerateExcelReport(){
		this.itemPuhistoryManager.itemPuhistoryExcel().subscribe((response) => {
			saveAs(response,"ItemHistoryList");
        })
	}

}
