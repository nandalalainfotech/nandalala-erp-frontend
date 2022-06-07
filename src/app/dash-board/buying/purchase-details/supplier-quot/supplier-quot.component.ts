import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SupplierQuotManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-quot.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Prsureq001mb } from '../../../../shared/services/restcontroller/entities/Prsureq001mb ';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-supplier-quot',
    templateUrl: './supplier-quot.component.html',
    styleUrls: ['./supplier-quot.component.css']
})

export class SupplierQuotComponent implements OnInit {
    prSupForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    prsrId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    suSeries: string = "";
    date: Date | null = null;
    supplier: string = "";
    itemCode: string = "";
    quantity: string = "";
    stockUom: string = "";
    rate: string = "";
    taxandChg: string | null = "";
    accountHead: string = "";
    squotrate: string | null = "";
    sutype: string = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    seriesname="PRMatReq.Type";
    seriestype="Type";
    supname="PRSupp.Type";
	suptupe="Type";
    public gridOptions: GridOptions | any;
    dummysystemproperties: Systemproperties001mb[] = [];
    seriessystemproperties: Systemproperties001mb[] = [];
    supsystemproperties:Systemproperties001mb[] = [];
    itemlist: Itemdt001mb[]=[];
    supplierQuot: Prsureq001mb[] = [];

    constructor(private supplierQuotManager: SupplierQuotManager, 
        private datePipe: DatePipe, 
        private formBuilder: FormBuilder, 
        private systemPropertiesService: SystemPropertiesService, 
        private salesitemManager:SalesItemManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.prSupForm = this.formBuilder.group({
            suSeries: ['', Validators.required],
            date: ['', Validators.required],
            supplier: ['', Validators.required],
            itemCode: ['', Validators.required],
            quantity: ['', Validators.required],
            stockUom: ['', Validators.required],
            rate: ['', Validators.required],
            taxandChg: ['', Validators.required],
            accountHead: ['', Validators.required],
            squotrate: ['', Validators.required],
            sutype: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.supname, this.suptupe).subscribe(response => {
			this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
        this.systemPropertiesService.system(this.seriesname, this.seriestype).subscribe(response => {
            this.seriessystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.supplierQuotManager.allsupplierquot().subscribe(response => {
            this.supplierQuot = deserialize<Prsureq001mb[]>(Prsureq001mb, response);
            this.gridOptions?.api?.setRowData(this.supplierQuot);
        })
    }

    get f() { return this.prSupForm.controls; }

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
                field: 'prsrId',
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
                field: 'suSeries',
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
                headerName: 'Stock UOM',
                field: 'stockUom',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Rate',
                field: 'rate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Type',
                field: 'sutype',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Tax and Charges',
                field: 'taxandChg',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account Head',
                field: 'accountHead',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Supplier Quoted Rate',
                field: 'squotrate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Taxes and Charges',
                field: 'taxandChg',
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
        this.prsrId = params.data.prsrId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.prSupForm.patchValue({
            'suSeries': params.data.suSeries,
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'supplier': params.data.supplier,
            'itemCode': params.data.itemCode,
            'quantity': params.data.quantity,
            'stockUom': params.data.stockUom,
            'rate': params.data.rate,
            'taxandChg': params.data.taxandChg,
            'accountHead': params.data.accountHead,
            'squotrate': params.data.squotrate,
            'sutype': params.data.sutype
        });
    }

    onDeleteButtonClick(params: any) {
        this.supplierQuotManager.supplierquotdelete(params.data.prsrId).subscribe((response) => {
            for (let i = 0; i < this.supplierQuot.length; i++) {
                if (this.supplierQuot[i].prsrId == params.data.prsrId) {
                    this.supplierQuot?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier Quotation";
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

    onOrderClick(event: any, prSupForm: any) {
        this.markFormGroupTouched(this.prSupForm);
        this.submitted = true;
        if (this.prSupForm.invalid) {
            return;
        }
        let prsureq001mb = new Prsureq001mb();
        prsureq001mb.suSeries = this.f.suSeries.value ? this.f.suSeries.value : "";
        prsureq001mb.date = new Date(this.f.date.value);
        prsureq001mb.supplier = this.f.supplier.value ? this.f.supplier.value : "";
        prsureq001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        prsureq001mb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
        prsureq001mb.stockUom = this.f.stockUom.value ? this.f.stockUom.value : "";
        prsureq001mb.taxandChg = this.f.taxandChg.value ? this.f.taxandChg.value : "";
        prsureq001mb.accountHead = this.f.accountHead.value ? this.f.accountHead.value : "";
        prsureq001mb.squotrate = this.f.squotrate.value ? this.f.squotrate.value : "";
        prsureq001mb.sutype = this.f.sutype.value ? this.f.sutype.value : "";
        prsureq001mb.rate = this.f.rate.value ? this.f.rate.value : "";
        if (this.prsrId) {
            prsureq001mb.prsrId = this.prsrId;
            prsureq001mb.insertUser = this.insertUser;
			prsureq001mb.insertDatetime = this.insertDatetime;
            prsureq001mb.updatedUser = this.authManager.getcurrentUser.username;
			prsureq001mb.updatedDatetime = new Date();
            this.supplierQuotManager.supplierquotupdate(prsureq001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated  Successfully");
                let prssup = deserialize<Prsureq001mb>(Prsureq001mb, response);
                for (let supplier of this.supplierQuot) {
                    if (supplier.prsrId == prssup.prsrId) {
                        supplier.suSeries = prssup.suSeries;
                        supplier.date = prssup.date;
                        supplier.supplier = prssup.supplier;
                        supplier.itemCode = prssup.itemCode;
                        supplier.quantity = prssup.quantity;
                        supplier.stockUom = prssup.stockUom;
                        supplier.rate = prssup.rate;
                        supplier.taxandChg = prssup.taxandChg;
                        supplier.accountHead = prssup.accountHead;
                        supplier.squotrate = prssup.squotrate;
                        supplier.sutype = prssup.sutype;
                        supplier.insertUser = this.insertUser;
                        supplier.insertDatetime = this.insertDatetime;
                        supplier.updatedUser = this.authManager.getcurrentUser.username;
                        supplier.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.supplierQuot);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.prSupForm.reset();
                this.prsrId = null;
                this.submitted = false;
            });
        } else {
            prsureq001mb.insertUser = this.authManager.getcurrentUser.username;
			prsureq001mb.insertDatetime = new Date();
            this.supplierQuotManager.supplierquotsave(prsureq001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let prssup = deserialize<Prsureq001mb>(Prsureq001mb, response);
                this.supplierQuot?.push(prssup);
                const newItems = [JSON.parse(JSON.stringify(prssup))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.prSupForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.prSupForm.reset();
    }

    onGeneratePdfReport(){
		this.supplierQuotManager.supplierQuotPdf().subscribe((response) =>{
			saveAs(response," SupplierQuotationDetails");

		});
	}

	onGenerateExcelReport(){
		this.supplierQuotManager.supplierQuotExcel().subscribe((response) => {
			saveAs(response," SupplierQuotationDetails");
        })
	}

}





