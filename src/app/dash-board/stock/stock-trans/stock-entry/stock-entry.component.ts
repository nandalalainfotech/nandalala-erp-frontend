import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StockEntryManager } from 'src/app/shared/services/restcontroller/bizservice/stock-entry.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Stktransentry001mb } from 'src/app/shared/services/restcontroller/entities/Stktransentry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-stock-entry',
    templateUrl: './stock-entry.component.html',
    styleUrls: ['./stock-entry.component.css']
})

export class StockEntryComponent implements OnInit {

    stkEntryForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    name: string = "stktransent.title";
    type: string = "title";
    aname: string = "ProdOrder.status";
    atype: string = "status";
    stentId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    title: string = "";
    status: string = "";
    purpose: string = "";
    stName: string = "";
    asystemproperties?: Systemproperties001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    stockEntrys: Stktransentry001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private stockEntryManager: StockEntryManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.stkEntryForm = this.formBuilder.group({
            title: ['', Validators.required],
            status: ['', Validators.required],
            purpose: ['', Validators.required],
            stName: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.aname, this.atype).subscribe(response => {
            this.asystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.stockEntryManager.allstockentry().subscribe((response) => {
            this.stockEntrys = deserialize<Stktransentry001mb[]>(Stktransentry001mb, response)
            if (this.stockEntrys.length > 0) {
                this.gridOptions?.api?.setRowData(this.stockEntrys);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.stkEntryForm.controls; }

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
                field: 'stentId',
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
                headerName: 'purpose',
                field: 'purpose',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Stock Name',
                field: 'stName',
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
        this.stentId = params.data.stentId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.stkEntryForm.patchValue({
            'title': params.data.title,
            'status': params.data.status,
            'purpose': params.data.purpose,
            'stName': params.data.stName
        });
    }

    onDeleteButtonClick(params: any) {
        this.stockEntryManager.deletestockentry(params.data.stentId).subscribe((response) => {
            for (let i = 0; i < this.stockEntrys.length; i++) {
                if (this.stockEntrys[i].stentId == params.data.stentId) {
                    this.stockEntrys?.splice(i, 1);
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
        modalRef.componentInstance.title = "Stock Entry";
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

    onOrderClick(event: any, stkEntryForm: any) {
        this.markFormGroupTouched(this.stkEntryForm);
        this.submitted = true;
        if (this.stkEntryForm.invalid) {
            return;
        }

        let stktransentry001mb = new Stktransentry001mb();
        stktransentry001mb.title = this.f.title.value ? this.f.title.value : "";
        stktransentry001mb.status = this.f.status.value ? this.f.status.value : "";
        stktransentry001mb.purpose = this.f.purpose.value ? this.f.purpose.value : "";
        stktransentry001mb.stName = this.f.stName.value ? this.f.stName.value : "";
        if (this.stentId) {
            stktransentry001mb.stentId = this.stentId;
            stktransentry001mb.insertUser = this.insertUser;
            stktransentry001mb.insertDatetime = this.insertDatetime;
            stktransentry001mb.updatedUser = this.authManager.getcurrentUser.username;
            stktransentry001mb.updatedDatetime = new Date();
            this.stockEntryManager.updatestockentry(stktransentry001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let stk = deserialize<Stktransentry001mb>(Stktransentry001mb, response);
                for (let stock of this.stockEntrys) {
                    if (stock.stentId == stk.stentId) {
                        stock.title = stk.title;
                        stock.status = stk.status;
                        stock.purpose = stk.purpose;
                        stock.stName = stk.stName;
                        stock.insertUser = this.insertUser;
                        stock.insertDatetime = this.insertDatetime;
                        stock.updatedUser = this.authManager.getcurrentUser.username;
                        stock.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.stockEntrys);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.stkEntryForm.reset();
                this.stentId = null;
                this.submitted = false;
            })
        }
        else {
            stktransentry001mb.insertUser = this.authManager.getcurrentUser.username;
            stktransentry001mb.insertDatetime = new Date();
            this.stockEntryManager.savestockentry(stktransentry001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let stk = deserialize<Stktransentry001mb>(Stktransentry001mb, response);
                this.stockEntrys.push(stk);
                const newItems = [JSON.parse(JSON.stringify(stk))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.stkEntryForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.stkEntryForm.reset();
    }

    onGeneratePdfReport() {
		this.stockEntryManager.stockEntryPdf().subscribe((response) => {
			saveAs(response, "StockEntryList");

		});
	}

	onGenerateExcelReport() {
		this.stockEntryManager.stockEntryExcel().subscribe((response) => {
			saveAs(response, "StockEntryList");
		});
	}
}