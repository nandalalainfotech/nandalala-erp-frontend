import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AccountChartManager } from 'src/app/shared/services/restcontroller/bizservice/account-chart.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Accountchart001mb } from 'src/app/shared/services/restcontroller/entities/Accountchart001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-account-chart',
    templateUrl: './account-chart.component.html',
    styleUrls: ['./account-chart.component.css']
})

export class AccountChartComponent implements OnInit {

    frameworkComponents: any;
    accChartForm: FormGroup | any;
    chartId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    chartName: string = "";
    submitted = false;
    accCharts: Accountchart001mb[] = [];
    public gridOptions: GridOptions | any;
    
    constructor(private accountChartManager: AccountChartManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }

    }

    ngOnInit() {
        this.createDataGrid001();
        this.accChartForm = this.formBuilder.group({
            chartName: ['', Validators.required],
        })
        this.accountChartManager.allcharts().subscribe(response => {
            this.accCharts = deserialize<Accountchart001mb[]>(Accountchart001mb, response);
            if (this.accCharts.length > 0) {
                this.gridOptions?.api?.setRowData(this.accCharts);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }

        });
    }

    get f() { return this.accChartForm.controls }


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
                headerName: '#ID',
                field: 'chartId',
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
                headerName: 'Chart',
                field: 'chartName',
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
                width: 30,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit'
                }
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 35,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onDeleteButtonClick.bind(this),
                    label: 'Delete'
                }
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 30,
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
        this.chartId = params.data.chartId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.accChartForm.patchValue({
            'chartName': params.data.chartName,
        });

    }

    onDeleteButtonClick(params: any) {
        this.accountChartManager.chartdelete(params.data.chartId).subscribe((response) => {
            for (let i = 0; i < this.accCharts.length; i++) {
                if (this.accCharts[i].chartId == params.data.chartId) {
                    this.accCharts?.splice(i, 1);
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
        modalRef.componentInstance.title = "Chart Of Account";
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

    onOrderClick(event: any, accChartForm: any) {
        this.markFormGroupTouched(this.accChartForm);
        this.submitted = true;
        if (this.accChartForm.invalid) {
            return;
        }
        let accountchart001mb = new Accountchart001mb();
        accountchart001mb.chartName = this.f.chartName.value ? this.f.chartName.value : "";
        if (this.chartId) {
            accountchart001mb.chartId = this.chartId;
            accountchart001mb.insertUser = this.insertUser;
			accountchart001mb.insertDatetime = this.insertDatetime;
            accountchart001mb.updatedUser = this.authManager.getcurrentUser.username;
			accountchart001mb.updatedDatetime = new Date();
            this.accountChartManager.chartupdate(accountchart001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let accountchart001mb = deserialize<Accountchart001mb>(Accountchart001mb, response);
                for (let accChartss of this.accCharts) {
                    if (accChartss.chartId == accountchart001mb.chartId) {
                        accChartss.chartName = accountchart001mb.chartName;
                        accChartss.insertUser = this.insertUser;
                        accChartss.insertDatetime = this.insertDatetime;
                        accChartss.updatedUser = this.authManager.getcurrentUser.username;
                        accChartss.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.accCharts);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.accChartForm.reset();
                this.submitted = false;
                this.chartId = null;
            });
        } 
        else {
            accountchart001mb.insertUser = this.authManager.getcurrentUser.username;
			accountchart001mb.insertDatetime = new Date();
            this.accountChartManager.chartsave(accountchart001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let accountchart001mb = deserialize<Accountchart001mb>(Accountchart001mb, response);
                this.accCharts?.push(accountchart001mb);
                const newItems = [JSON.parse(JSON.stringify(accountchart001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.accChartForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.accChartForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.accountChartManager.accountChartPdf().subscribe((response) =>{
            saveAs(response,"AccountChartList");

		});
	}

	onGenerateExcelReport(){
		this.accountChartManager.accountChartExcel().subscribe((response) => {
			saveAs(response,"AccountChartList");
        })
	}

}