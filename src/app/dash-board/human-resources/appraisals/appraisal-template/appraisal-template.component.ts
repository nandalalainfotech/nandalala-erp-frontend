import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AppraisalTemplateManager } from 'src/app/shared/services/restcontroller/bizservice/appraisal-template.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Apprtemp001mb } from 'src/app/shared/services/restcontroller/entities/Apprtemp001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-appraisal-template',
    templateUrl: './appraisal-template.component.html',
    styleUrls: ['./appraisal-template.component.css']
})

export class AppraisalTemplateComponent implements OnInit {
    frameworkComponents: any;
    apptmpId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    appraisalTemp: string | null = "";
    description: string | null = "";
    apprTemp: Apprtemp001mb[] = [];
    apprTempForm: FormGroup | any;
    submitted = false;
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private formBuilder: FormBuilder,
        private appraisalTemplateManager: AppraisalTemplateManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.apprTempForm = this.formBuilder.group({
            appraisalTemp: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.createDataGrid001();
        this.appraisalTemplateManager.allappraisaltemp().subscribe((response) => {
            this.apprTemp = deserialize<Apprtemp001mb[]>(Apprtemp001mb, response);
            if (this.apprTemp.length > 0) {
                this.gridOptions?.api?.setRowData(this.apprTemp);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.apprTempForm.controls; }

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
                field: 'apptmpId',
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
                headerName: 'Appraisal Template',
                field: 'appraisalTemp',
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
        this.apptmpId = params.data.apptmpId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.apprTempForm.patchValue({
            'appraisalTemp': params.data.appraisalTemp,
            'description': params.data.description,
        });
    }
    onDeleteButtonClick(params: any) {
        this.appraisalTemplateManager.deleteappraisaltemp(params.data.apptmpId).subscribe((response) => {
            for (let i = 0; i < this.apprTemp.length; i++) {
                if (this.apprTemp[i].apptmpId == params.data.apptmpId) {
                    this.apprTemp?.splice(i, 1);
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
        modalRef.componentInstance.title = "Appraisal Template";
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

    onOrderClick(event: any, apprTempForm: any) {

        this.markFormGroupTouched(this.apprTempForm);
        this.submitted = true;
        if (this.apprTempForm.invalid) {
            return;
        }
        let apprtemp001mb = new Apprtemp001mb();
        apprtemp001mb.appraisalTemp = this.f.appraisalTemp.value ? this.f.appraisalTemp.value : "";
        apprtemp001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.apptmpId) {
            apprtemp001mb.apptmpId = this.apptmpId;
            apprtemp001mb.insertUser = this.insertUser;
            apprtemp001mb.insertDatetime = this.insertDatetime;
            apprtemp001mb.updatedUser = this.authManager.getcurrentUser.username;
            apprtemp001mb.updatedDatetime = new Date();
            this.appraisalTemplateManager.updateappraisaltemp(apprtemp001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let apprtemp001mb = deserialize<Apprtemp001mb>(Apprtemp001mb, response);
                for (let temp of this.apprTemp) {
                    if (temp.apptmpId == apprtemp001mb.apptmpId) {
                        temp.appraisalTemp = apprtemp001mb.appraisalTemp;
                        temp.description = apprtemp001mb.description;
                        temp.insertUser = this.insertUser;
                        temp.insertDatetime = this.insertDatetime;
                        temp.updatedUser = this.authManager.getcurrentUser.username;
                        temp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.apprTemp);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.apprTempForm.reset();
                this.submitted = false;
                this.apptmpId = null;
            })
        }
        else {
            apprtemp001mb.insertUser = this.authManager.getcurrentUser.username;
            apprtemp001mb.insertDatetime = new Date();
            this.appraisalTemplateManager.saveappraisaltemp(apprtemp001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let apprtemp001mb = deserialize<Apprtemp001mb>(Apprtemp001mb, response);
                this.apprTemp?.push(apprtemp001mb);
                const newItems = [JSON.parse(JSON.stringify(apprtemp001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.apprTempForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.apprTempForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.appraisalTemplateManager.appraisalTemplatePdf().subscribe((response) =>{
            saveAs(response,"AppraisalTemplate");

		});
	}

	onGenerateExcelReport(){
		this.appraisalTemplateManager.appraisalTemplateExcel().subscribe((response) => {
			saveAs(response,"AppraisalTemplate");
        })
	}
}