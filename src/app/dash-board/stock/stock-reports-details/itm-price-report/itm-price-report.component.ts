import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemPriceReportManager } from 'src/app/shared/services/restcontroller/bizservice/item-price-report.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Itempricereport001mb } from 'src/app/shared/services/restcontroller/entities/Itempricereport001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-itm-price-report',
    templateUrl: './itm-price-report.component.html',
    styleUrls: ['./itm-price-report.component.css']
})

export class ItmPriceReportComponent implements OnInit {

    frameworkComponents: any;
    itpricesId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    grpname: string = "Item.Group";
    grptype: string = "Group";
    itemCode: string = "";
    itemGroup: string = "";
    uom: string = "";
    lstPurchase: string = "";
    valuationRate: string | null = "";
    spList: string = "";
    ppList: string = "";
    bomRate: string | null = "";
    description: string = "";
    priceReports: Itempricereport001mb[] = [];
    itmsystemproperties: Systemproperties001mb[] = [];
    grpsystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    priceForm: FormGroup | any;
    submitted = false;
    stkitems: Itemdt001mb[] = [];

    constructor(private systemProperiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private itemPriceReportManager: ItemPriceReportManager, 
        private salesItemManager: SalesItemManager, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.priceForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            itemGroup: ['', Validators.required],
            uom: ['', Validators.required],
            lstPurchase: ['', Validators.required],
            valuationRate: ['', Validators.required],
            spList: ['', Validators.required],
            ppList: ['', Validators.required],
            bomRate: ['', Validators.required],
            description: ['', Validators.required],
        });
        this.createDataGrid001mb();
        this.systemProperiesService.system(this.grpname, this.grptype).subscribe(response => {
            this.grpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        }),
            this.salesItemManager.allsalesitem().subscribe((response) => {
                this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
            })
        this.itemPriceReportManager.allpricereport().subscribe(response => {
            this.priceReports = deserialize<Itempricereport001mb[]>(Itempricereport001mb, response);
            if (this.priceReports.length > 0) {
                this.gridOptions?.api?.setRowData(this.priceReports);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.priceForm.controls; }
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
                field: 'itpricesId',
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
                headerName: 'Item Group',
                field: 'itemGroup',
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
                headerName: 'Last Purchase',
                field: 'lstPurchase',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Valuation Rate',
                field: 'valuationRate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sales Price List',
                field: 'spList',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Purchase Price List',
                field: 'ppList',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Rate',
                field: 'bomRate',
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
                width: 155,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
        ]
    }
    onEditButtonClick(params: any) {
        this.itpricesId = params.data.itpricesId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.priceForm.patchValue({
            'itemCode': params.data.itemCode,
            'itemGroup': params.data.itemGroup,
            'uom': params.data.uom,
            'lstPurchase': params.data.lstPurchase,
            'valuationRate': params.data.valuationRate,
            'spList': params.data.spList,
            'ppList': params.data.ppList,
            'bomRate': params.data.bomRate,
            'description': params.data.description,
        });
    }

    onDeleteButtonClick(params: any) {
        this.itemPriceReportManager.pricereportdelete(params.data.itpricesId).subscribe(response => {
            for (let i = 0; i < this.priceReports.length; i++) {
                if (this.priceReports[i].itpricesId == params.data.itpricesId) {
                    this.priceReports?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item Price Report";
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

    onOrderClick(event: any, priceForm: any) {

        this.markFormGroupTouched(this.priceForm);
        this.submitted = true;
        if (this.priceForm.invalid) {
            return;
        }

        let itempricereport001mb = new Itempricereport001mb();
        itempricereport001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        itempricereport001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
        itempricereport001mb.uom = this.f.uom.value ? this.f.uom.value : "";
        itempricereport001mb.lstPurchase = this.f.lstPurchase.value ? this.f.lstPurchase.value : "";
        itempricereport001mb.valuationRate = this.f.valuationRate.value ? this.f.valuationRate.value : "";
        itempricereport001mb.spList = this.f.spList.value ? this.f.spList.value : "";
        itempricereport001mb.ppList = this.f.ppList.value ? this.f.ppList.value : "";
        itempricereport001mb.bomRate = this.f.bomRate.value ? this.f.bomRate.value : "";
        itempricereport001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.itpricesId) {
            itempricereport001mb.itpricesId = this.itpricesId;
            itempricereport001mb.insertUser = this.insertUser;
            itempricereport001mb.insertDatetime = this.insertDatetime;
            itempricereport001mb.updatedUser = this.authManager.getcurrentUser.username;
            itempricereport001mb.updatedDatetime = new Date();
            this.itemPriceReportManager.pricereportupdate(itempricereport001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let prices = deserialize<Itempricereport001mb>(Itempricereport001mb, response);
                for (let items of this.priceReports) {
                    if (items.itpricesId == prices.itpricesId) {
                        items.itemCode = prices.itemCode;
                        items.itemGroup = prices.itemGroup;
                        items.uom = prices.uom;
                        items.valuationRate = prices.valuationRate;
                        items.spList = prices.spList;
                        items.ppList = prices.ppList;
                        items.bomRate = prices.bomRate;
                        items.description = prices.description;
                        items.insertUser = this.insertUser;
                        items.insertDatetime = this.insertDatetime;
                        items.updatedUser = this.authManager.getcurrentUser.username;
                        items.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.priceReports);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.priceForm.reset();
                this.submitted = false;
                this.itpricesId = null;
            });
        } else {
            itempricereport001mb.insertUser = this.authManager.getcurrentUser.username;
            itempricereport001mb.insertDatetime = new Date();
            this.itemPriceReportManager.pricereportsave(itempricereport001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let prices = deserialize<Itempricereport001mb>(Itempricereport001mb, response);
                this.priceReports.push(prices);
                const newItems = [JSON.parse(JSON.stringify(prices))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.priceForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.priceForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.itemPriceReportManager.itemPriceReportPdf().subscribe((response) =>{
            saveAs(response,"ItemPriceReport");

		});
	}

	onGenerateExcelReport(){
		this.itemPriceReportManager.itemPriceReportExcel().subscribe((response) => {
			saveAs(response,"ItemPriceReport");
        })
	}

}