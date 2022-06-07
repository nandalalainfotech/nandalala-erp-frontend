import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AppraisalTemplateManager } from 'src/app/shared/services/restcontroller/bizservice/appraisal-template.service';
import { AppraisalManager } from 'src/app/shared/services/restcontroller/bizservice/appraisal.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Appraisal001mb } from 'src/app/shared/services/restcontroller/entities/Appraisal001mb';
import { Apprtemp001mb } from 'src/app/shared/services/restcontroller/entities/Apprtemp001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
@Component({
    selector: 'app-appraisal',
    templateUrl: './appraisal.component.html',
    styleUrls: ['./appraisal.component.css']
})
export class AppraisalComponent implements OnInit {

    frameworkComponents: any;
    apprId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    appname: string = "apptmpId";
    series: string | null = "";
    appraisalTemp: string | null = "";
    appraisal: Appraisal001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    apprtemp?: Apprtemp001mb[] = [];

    public gridOptions: GridOptions | any;
    appraisalForm: FormGroup | any;
    submitted = false;

    constructor(private appraisalTemplateManager: AppraisalTemplateManager, 
        private formBuilder: FormBuilder,
        private appraisalManager: AppraisalManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.appraisalForm = this.formBuilder.group({
            series: ['', Validators.required],
            appraisalTemp: ['', Validators.required]
        });

        this.createDataGrid001();
        this.appraisalTemplateManager.allappraisaltemp().subscribe((response) => {
            this.apprtemp = deserialize<Apprtemp001mb[]>(Apprtemp001mb, response);
        })


        this.appraisalManager.allappraisal().subscribe((response) => {
            this.appraisal = deserialize<Appraisal001mb[]>(Appraisal001mb, response);
            if (this.appraisal.length > 0) {
                this.gridOptions?.api?.setRowData(this.appraisal);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    
    get f() { return this.appraisalForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this)
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#Id',
                field: 'apprId',
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
                headerName: 'AppraisalTemplate',
                field: 'appraisalTemp',
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
                    label: 'Edit'
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
                    label: 'Delete'
                }
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 50,
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
        this.apprId = params.data.apprId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.appraisalForm.patchValue({
            'series': params.data.series,
            'appraisalTemp': params.data.appraisalTemp,
        });
    }

    onDeleteButtonClick(params: any) {
        this.appraisalManager.deleteappraisal(params.data.apprId).subscribe((response) => {
            for (let i = 0; i < this.appraisal.length; i++) {
                if (this.appraisal[i].apprId == params.data.apprId) {
                    this.appraisal?.splice(i, 1);
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
        modalRef.componentInstance.title = "Appraisal";
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
    onOrderClick(event: any, appraisalForm: any) {
        this.markFormGroupTouched(this.appraisalForm);
        this.submitted = true;
        if (this.appraisalForm.invalid) {
            return;
        }
        let appraisal001mb = new Appraisal001mb();
        appraisal001mb.series = this.f.series.value ? this.f.series.value : "";
        appraisal001mb.appraisalTemp = this.f.appraisalTemp.value ? this.f.appraisalTemp.value : "";
        if (this.apprId) {
            appraisal001mb.apprId = this.apprId;
            appraisal001mb.insertUser = this.insertUser;
            appraisal001mb.insertDatetime = this.insertDatetime;
            appraisal001mb.updatedUser = this.authManager.getcurrentUser.username;
            appraisal001mb.updatedDatetime = new Date();
            this.appraisalManager.updateappraisal(appraisal001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let appraisal001mb = deserialize<Appraisal001mb>(Appraisal001mb, response);
                for (let appraise of this.appraisal) {
                    if (appraise.apprId == appraisal001mb.apprId) {
                        appraise.series = appraisal001mb.series;
                        appraise.appraisalTemp = appraisal001mb.appraisalTemp;
                        appraise.insertUser = this.insertUser;
                        appraise.insertDatetime = this.insertDatetime;
                        appraise.updatedUser = this.authManager.getcurrentUser.username;
                        appraise.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.appraisal);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.appraisalForm.reset();
                this.submitted = false;
                this.apprId = null;
            })
        }
        else {
            appraisal001mb.insertUser = this.authManager.getcurrentUser.username;
            appraisal001mb.insertDatetime = new Date();
            this.appraisalManager.saveappraisal(appraisal001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let appraisal001mb = deserialize<Appraisal001mb>(Appraisal001mb, response);
                this.appraisal?.push(appraisal001mb);
                const newItems = [JSON.parse(JSON.stringify(appraisal001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.appraisalForm.reset();
                this.submitted = false;
            })

            this.submitted = false;
        }

    }
    onReset() {
        this.appraisalForm.reset();
        this.submitted = false;

    }

    onGeneratePdfReport(){
		this.appraisalManager.appraisalPdf().subscribe((response) =>{
            saveAs(response,"AppraisalList");

		});
	}

	onGenerateExcelReport(){
		this.appraisalManager.appraisalExcel().subscribe((response) => {
			saveAs(response,"AppraisalList");
        })
	}
}