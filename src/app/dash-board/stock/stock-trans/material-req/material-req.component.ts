import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PrmatReqManager } from 'src/app/shared/services/restcontroller/bizservice/prmat-req.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Prmatreq001mb } from 'src/app/shared/services/restcontroller/entities/Prmatreq001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-material-req',
    templateUrl: './material-req.component.html',
    styleUrls: ['./material-req.component.css']
})

export class MaterialReqComponent implements OnInit {

    matReqForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    pmrId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    aname: string = "PRMatReq.Type";
    atype: string = "Type";
    mrType: string = "";
    mrSeries: string = "";
    itemCode: string = "";
    quantity: string = "";
    forWarehouse: string = "";
    requiredDate!: Date | null;
    systemproperties?: Systemproperties001mb[] = [];
    asystemproperties?: Systemproperties001mb[] = [];
    matRequests: Prmatreq001mb[] = [];
    public gridOptions: GridOptions | any;
    stkitems: Itemdt001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private prmatReqManager: PrmatReqManager, 
        private datePipe: DatePipe, 
        private salesItemManager: SalesItemManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }


    ngOnInit() {
        this.matReqForm = this.formBuilder.group({
            mrType: ['', Validators.required],
            mrSeries: ['', Validators.required],
            quantity: ['', Validators.required],
            forWarehouse: ['', Validators.required],
            itemCode: ['', Validators.required],
            requiredDate: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.aname, this.atype).subscribe(response => {
            this.asystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.salesItemManager.allsalesitem().subscribe((response) => {
            this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.prmatReqManager.allprmatreq().subscribe((response) => {
            this.matRequests = deserialize<Prmatreq001mb[]>(Prmatreq001mb, response);
            if (this.matRequests.length > 0) {
                this.gridOptions?.api?.setRowData(this.matRequests);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.matReqForm.controls; }

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
                field: 'pmrId',
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
                headerName: 'Type',
                field: 'mrType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Series',
                field: 'mrSeries',
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
                headerName: 'For Warehouse',
                field: 'forWarehouse',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Required Date',
                field: 'requiredDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.requiredDate ? this.datePipe.transform(params.data.requiredDate, 'MM/dd/yyyy') : '';
                }
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
                width: 155,
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
        ];
    }

    onEditButtonClick(params: any) {
        this.pmrId = params.data.pmrId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.matReqForm.patchValue({
            'mrType': params.data.mrType,
            'mrSeries': params.data.mrSeries,
            'itemCode': params.data.itemCode,
            'quantity': params.data.quantity,
            'forWarehouse': params.data.forWarehouse,
            'requiredDate': this.datePipe.transform(params.data.requiredDate, 'MM/dd/yyyy'),
        });
    }

    onDeleteButtonClick(params: any) {
        this.prmatReqManager.prmatreqdelete(params.data.pmrId).subscribe((responce) => {
            for (let i = 0; i < this.matRequests.length; i++) {
                if (this.matRequests[i].pmrId == params.data.pmrId) {
                    this.matRequests?.splice(i, 1);
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
        modalRef.componentInstance.title = "Material Request";
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

    onOrderClick(event: any, matReqForm: any) {
        this.markFormGroupTouched(this.matReqForm);
        this.submitted = true;
        if (this.matReqForm.invalid) {
            return;
        }
        let prmatreq001mb = new Prmatreq001mb();
        prmatreq001mb.mrType = this.f.mrType.value ? this.f.mrType.value : "";
        prmatreq001mb.mrSeries = this.f.mrSeries.value ? this.f.mrSeries.value : "";
        prmatreq001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        prmatreq001mb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
        prmatreq001mb.forWarehouse = this.f.forWarehouse.value ? this.f.forWarehouse.value : "";
        prmatreq001mb.requiredDate = new Date(this.f.requiredDate.value);
        if (this.pmrId) {
            prmatreq001mb.pmrId = this.pmrId;
            prmatreq001mb.insertUser = this.insertUser;
            prmatreq001mb.insertDatetime = this.insertDatetime;
            prmatreq001mb.updatedUser = this.authManager.getcurrentUser.username;
            prmatreq001mb.updatedDatetime = new Date();
            this.prmatReqManager.prmatrequpdate(prmatreq001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let matr = deserialize<Prmatreq001mb>(Prmatreq001mb, response);
                for (let req of this.matRequests) {
                    if (req.pmrId == matr.pmrId) {
                        req.mrType = matr.mrType;
                        req.mrSeries = matr.mrSeries;
                        req.itemCode = matr.itemCode;
                        req.quantity = matr.quantity;
                        req.forWarehouse = matr.forWarehouse;
                        req.requiredDate = matr.requiredDate;
                        req.insertUser = this.insertUser;
                        req.insertDatetime = this.insertDatetime;
                        req.updatedUser = this.authManager.getcurrentUser.username;
                        req.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.matRequests);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.matReqForm.reset();
                this.pmrId = null;
                this.submitted = false;
            })
        }
        else {
            prmatreq001mb.insertUser = this.authManager.getcurrentUser.username;
            prmatreq001mb.insertDatetime = new Date();
            this.prmatReqManager.prmatreqsave(prmatreq001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let matr = deserialize<Prmatreq001mb>(Prmatreq001mb, response);
                this.matRequests.push(matr);
                const newItems = [JSON.parse(JSON.stringify(matr))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.matReqForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.matReqForm.reset();
    }

    onGeneratePdfReport() {
		this.prmatReqManager.prmatReqPdf().subscribe((response) => {
			saveAs(response, "MaterialRequestDetails");

		});
	}

	onGenerateExcelReport() {
		this.prmatReqManager.prmatReqExcel().subscribe((response) => {
			saveAs(response, "MaterialRequestDetails");
		});
	}
}