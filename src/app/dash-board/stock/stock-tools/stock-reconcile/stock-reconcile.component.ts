import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StkReconcileManager } from 'src/app/shared/services/restcontroller/bizservice/tool-stk-reconcile.service';
import { Stkreconcile001mb } from 'src/app/shared/services/restcontroller/entities/Stkreconcile001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-stock-reconcile',
    templateUrl: './stock-reconcile.component.html',
    styleUrls: ['./stock-reconcile.component.css']
})
export class StockReconcileComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    stocksForm: FormGroup | any;
    stkrecId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    series: string = "";
    company: string = "";
    postingDate!: Date | null;
    postingTime: string = "";
    diffAcc: string | null = "";
    costCenter: string | null = "";
    stkReconcile: Stkreconcile001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private stkReconcileManager: StkReconcileManager, 
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
        this.stocksForm = this.formBuilder.group({
            postingDate: ['', Validators.required],
            company: ['', Validators.required],
            postingTime: ['', Validators.required],
            diffAcc: ['', Validators.required],
            series: ['', Validators.required],
            costCenter: ['', Validators.required],
        })
        this.createDataGrid001();
        this.stkReconcileManager.allreconcile().subscribe((response) => {
            this.stkReconcile = deserialize<Stkreconcile001mb[]>(Stkreconcile001mb, response);
            if (this.stkReconcile.length > 0) {
                this.gridOptions?.api?.setRowData(this.stkReconcile);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.stocksForm.controls; }

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
                field: 'stkrecId',
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
                field: 'series',
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
                headerName: 'Posting Date',
                field: 'postingDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.postingDate ? this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Posting Time',
                field: 'postingTime',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Difference Account',
                field: 'diffAcc',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Cost Center',
                field: 'costCenter',
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
        this.stkrecId = params.data.stkrecId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.stocksForm.patchValue({
            'series': params.data.series,
            'company': params.data.company,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
            'postingTime': params.data.postingTime,
            'diffAcc': params.data.diffAcc,
            'costCenter': params.data.costCenter,
        })
    }

    onDeleteButtonClick(params: any) {
        this.stkReconcileManager.deletereconcile(params.data.stkrecId).subscribe((response) => {
            for (let i = 0; i < this.stkReconcile.length; i++) {
                if (this.stkReconcile[i].stkrecId == params.data.stkrecId) {
                    this.stkReconcile?.splice(i, 1);
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
        modalRef.componentInstance.title = "Stock Reconcile";
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

    onOrderClick(event: any, stocks: any) {
        this.markFormGroupTouched(this.stocksForm);
        this.submitted = true;
        if (this.stocksForm.invalid) {
            return;
        }
        let stkreconcile001mb = new Stkreconcile001mb();
        stkreconcile001mb.series = this.f.series.value ? this.f.series.value : "";
        stkreconcile001mb.company = this.f.company.value ? this.f.company.value : "";
        stkreconcile001mb.postingDate = new Date(this.f.postingDate.value);
        stkreconcile001mb.postingTime = this.f.postingTime.value ? this.f.postingTime.value : "";
        stkreconcile001mb.diffAcc = this.f.diffAcc.value ? this.f.diffAcc.value : "";
        stkreconcile001mb.costCenter = this.f.costCenter.value ? this.f.costCenter.value : "";
        if (this.stkrecId) {
            stkreconcile001mb.stkrecId = this.stkrecId;
            stkreconcile001mb.insertUser = this.insertUser;
            stkreconcile001mb.insertDatetime = this.insertDatetime;
            stkreconcile001mb.updatedUser = this.authManager.getcurrentUser.username;
            stkreconcile001mb.updatedDatetime = new Date();
            this.stkReconcileManager.updatereconcile(stkreconcile001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let stkreconres = deserialize<Stkreconcile001mb>(Stkreconcile001mb, response);
                for (let stkrecon of this.stkReconcile) {
                    if (stkrecon.stkrecId == stkreconres.stkrecId) {
                        stkrecon.series = stkreconres.series;
                        stkrecon.company = stkreconres.company;
                        stkrecon.postingDate = stkreconres.postingDate;
                        stkrecon.postingTime = stkreconres.postingTime;
                        stkrecon.diffAcc = stkreconres.diffAcc;
                        stkrecon.costCenter = stkreconres.costCenter;
                        stkrecon.insertUser = this.insertUser;
                        stkrecon.insertDatetime = this.insertDatetime;
                        stkrecon.updatedUser = this.authManager.getcurrentUser.username;
                        stkrecon.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.stkReconcile);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.stocksForm.reset();
                this.submitted = false;
                this.stkrecId = null;
            })
        }
        else {
            stkreconcile001mb.insertUser = this.authManager.getcurrentUser.username;
            stkreconcile001mb.insertDatetime = new Date();
            this.stkReconcileManager.savereconcile(stkreconcile001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let stock = deserialize<Stkreconcile001mb>(Stkreconcile001mb, response);
                this.stkReconcile.push(stock);
                const newItems = [JSON.parse(JSON.stringify(stock))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.stocksForm.reset();
                this.submitted = false
            })
        }
    }
    onReset() {
        this.stocksForm.reset();
        this.submitted = false
    }

    onGeneratePdfReport() {
		this.stkReconcileManager.stkReconcilePdf().subscribe((response) => {
			saveAs(response, "StockReconcileList");

		});
	}

	onGenerateExcelReport() {
		this.stkReconcileManager.stkReconcileExcel().subscribe((response) => {
			saveAs(response, "StockReconcileList");
		});
	}
}