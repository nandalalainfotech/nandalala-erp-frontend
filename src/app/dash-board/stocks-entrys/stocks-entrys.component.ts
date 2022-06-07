import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StocksEntryManager } from 'src/app/shared/services/restcontroller/bizservice/stocks-entry.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Stockentry001mb } from 'src/app/shared/services/restcontroller/entities/Stockentry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-stocks-entrys',
    templateUrl: './stocks-entrys.component.html',
    styleUrls: ['./stocks-entrys.component.css'],
})
export class StocksEntrysComponent implements OnInit {
    frameworkComponents: any;
    submitted = false;
    entryForm: FormGroup | any;
    sname: string = 'processpr.month';
    stype: string = 'month';
    stockid: number | any;
    insertUser: string = '';
    insertDatetime: Date | any;
    materialrequest: string = '';
    date: Date | null = null;
    quantity?: number | null;
    transferedQty: string = '';
    qtytotransfer: string = '';
    description: string = '';
    company: string = '';
    itemid?: number;
    stockEntry: Stockentry001mb[] = [];
    vsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    user?: User001mb;
    parentMenuString: string = '';
    childMenuString: string = '';

    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;

    constructor(
        private systemPropertiesService: SystemPropertiesService,
        private stocksEntryManager: StocksEntryManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
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

        this.createDataGrid001();
        this.entryForm = this.formBuilder.group({
            materialrequest: ['', Validators.required],
            date: ['', Validators.required],
            quantity: ['', Validators.required],
            itemid: ['', Validators.required],
            transferedQty: ['', Validators.required],
            qtytotransfer: ['', Validators.required],
            description: ['', Validators.required],
            company: ['', Validators.required],
        });
        this.systemPropertiesService
            .system(this.sname, this.stype)
            .subscribe((response) => {
                this.vsystemproperties = deserialize<Systemproperties001mb[]>(
                    Systemproperties001mb,
                    response
                );
            });
        this.stocksEntryManager.allstockentrys().subscribe((response) => {
            this.stockEntry = deserialize<Stockentry001mb[]>(
                Stockentry001mb,
                response
            );
            if (this.stockEntry.length > 0) {
                this.gridOptions?.api?.setRowData(this.stockEntry);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() {
        return this.entryForm.controls;
    }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRenderer: this.onFirstDataRendered.bind(this),
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: 'Stockid',
                field: 'stockid',
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
                headerName: 'MaterialRequest',
                field: 'materialrequest',
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
                    return params.data.date
                        ? this.datePipe.transform(
                              params.data.date,
                              'MM/dd/yyyy'
                          )
                        : '';
                },
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
                headerName: 'TransferedQty',
                field: 'transferedQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'Qtytotransfer',
                field: 'qtytotransfer',
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
                headerName: 'Itemid',
                field: 'itemid',
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
                    label: 'Edit',
                },
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 55,
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
                width: 55,
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
        this.stockid = params.data.stockid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.entryForm.patchValue({
            materialrequest: params.data.materialrequest,
            date: this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            quantity: params.data.quantity,
            transferedQty: params.data.transferedQty,
            qtytotransfer: params.data.qtytotransfer,
            description: params.data.description,
            company: params.data.company,
            itemid: params.data.itemid,
        });
    }

    onDeleteButtonClick(params: any) {
        this.stocksEntryManager
            .deletestockentrys(params.data.stockid)
            .subscribe((response) => {
                for (let i = 0; i < this.stockEntry.length; i++) {
                    if (this.stockEntry[i].stockid == params.data.stockid) {
                        this.stockEntry?.splice(i, 1);
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
        modalRef.componentInstance.title = 'Stock Entry';
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

    onOrderClick(event: any, entry: any) {
        this.markFormGroupTouched(this.entryForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.entryForm.invalid) {
            return;
        }
        let stockentry001mb = new Stockentry001mb();
        stockentry001mb.materialrequest = this.f.materialrequest.value
            ? this.f.materialrequest.value
            : '';
        stockentry001mb.date = new Date(this.f.date.value);
        stockentry001mb.quantity = this.f.quantity.value
            ? this.f.quantity.value
            : null;
        stockentry001mb.transferedQty = this.f.transferedQty.value
            ? this.f.transferedQty.value
            : '';
        stockentry001mb.qtytotransfer = this.f.qtytotransfer.value
            ? this.f.qtytotransfer.value
            : '';
        stockentry001mb.description = this.f.description.value
            ? this.f.description.value
            : '';
        stockentry001mb.company = this.f.company.value
            ? this.f.company.value
            : '';
        stockentry001mb.itemid = this.f.itemid.value
            ? this.f.itemid.value
            : null;
        if (this.stockid) {
            stockentry001mb.stockid = this.stockid;
            stockentry001mb.insertUser = this.insertUser;
            stockentry001mb.insertDatetime = this.insertDatetime;
            stockentry001mb.updatedUser =
                this.authManager.getcurrentUser.username;
            stockentry001mb.updatedDatetime = new Date();
            this.stocksEntryManager
                .updatestockentrys(stockentry001mb)
                .subscribe((response) => {
                    this.calloutService.showSuccess(
                        'Order Updated Successfully'
                    );
                    let stockentry001mbresp = deserialize<Stockentry001mb>(
                        Stockentry001mb,
                        response
                    );
                    for (let stkEntry of this.stockEntry) {
                        if (stkEntry.stockid == stockentry001mbresp.stockid) {
                            stkEntry.materialrequest =
                                stockentry001mbresp.materialrequest;
                            stkEntry.date = stockentry001mbresp.date;
                            stkEntry.quantity = stockentry001mbresp.quantity;
                            stkEntry.transferedQty =
                                stockentry001mbresp.transferedQty;
                            stkEntry.qtytotransfer =
                                stockentry001mbresp.qtytotransfer;
                            stkEntry.description =
                                stockentry001mbresp.description;
                            stkEntry.company = stockentry001mbresp.company;
                            stkEntry.itemid = stockentry001mbresp.itemid;
                            stkEntry.insertUser = this.insertUser;
                            stkEntry.insertDatetime = this.insertDatetime;
                            stkEntry.updatedUser =
                                this.authManager.getcurrentUser.username;
                            stkEntry.updatedDatetime = new Date();
                        }
                    }
                    this.gridOptions.api.setRowData(this.stockEntry);
                    this.gridOptions.api.refreshView();
                    this.gridOptions.api.deselectAll();
                    this.entryForm.reset();
                    this.submitted = false;
                    this.stockid = null;
                });
        } else {
            stockentry001mb.insertUser =
                this.authManager.getcurrentUser.username;
            stockentry001mb.insertDatetime = new Date();
            this.stocksEntryManager
                .savestockentrys(stockentry001mb)
                .subscribe((response) => {
                    this.calloutService.showSuccess('Order Saved Successfully');
                    let entries = deserialize<Stockentry001mb>(
                        Stockentry001mb,
                        response
                    );
                    this.stockEntry.push(entries);
                    const newItems = [JSON.parse(JSON.stringify(entries))];
                    this.gridOptions.api.applyTransaction({ add: newItems });
                    this.entryForm.reset();
                    this.submitted = false;
                });
        }
    }
    onReset() {
        this.entryForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.stocksEntryManager.stocksEntryPdf().subscribe((response) =>{
            saveAs(response,"StocksEntryDetails");

		});
	}

	onGenerateExcelReport(){
		this.stocksEntryManager.stocksEntryExcel().subscribe((response) => {
			saveAs(response,"StocksEntryDetails");
        })
	}

}
