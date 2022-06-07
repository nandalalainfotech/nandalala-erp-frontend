import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { supTypeManager } from 'src/app/shared/services/restcontroller/bizservice/suptype.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Supptype001mb } from 'src/app/shared/services/restcontroller/entities/Supptype001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-supplier-type',
    templateUrl: './supplier-type.component.html',
    styleUrls: ['./supplier-type.component.css']
})

export class SupplierTypeComponent implements OnInit {

    frameworkComponents: any;
    suppTypeForm: FormGroup | any;
    sutypeId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    supName: string = "";
    suType: string = "";
    supname = "PRSupp.Type";
    sutype = "Type";
    typename = "Supplier.Type";
    tytype = "Type";
    submitted = false;
    supType: Supptype001mb[] = [];
    typesystemproperties?: Systemproperties001mb[] = [];
    supsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private suptypeManager: supTypeManager,
        private systemPropertiesService: SystemPropertiesService,
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
        this.suppTypeForm = this.formBuilder.group({
            supName: ['', Validators.required],
            suType: ['', Validators.required]
        })

        this.systemPropertiesService.system(this.supname, this.sutype).subscribe(response => {
            this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.typename, this.tytype).subscribe(response => {
            this.typesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.suptypeManager.allsuptype().subscribe((response) => {
            this.supType = deserialize<Supptype001mb[]>(Supptype001mb, response);
            if (this.supType.length > 0) {
                this.gridOptions?.api?.setRowData(this.supType);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.suppTypeForm.controls }

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
                field: 'sutypeId',
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
                headerName: 'Supplier Name',
                field: 'supName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Type',
                field: 'suType',
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
                    label: 'Audit'
                },
            },
        ];
    }

    onEditButtonClick(params: any) {
        this.sutypeId = params.data.sutypeId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.suppTypeForm.patchValue({
            'supName': params.data.supName,
            'suType': params.data.suType,
        });
    }

    onDeleteButtonClick(params: any) {
        this.suptypeManager.suptypedelete(params.data.sutypeId).subscribe((response) => {
            for (let i = 0; i < this.supType.length; i++) {
                if (this.supType[i].sutypeId == params.data.sutypeId) {
                    this.supType?.splice(i, 1);
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
        modalRef.componentInstance.title = "Type";
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

    onOrderClick(event: any, suppTypeForm: any) {
        this.markFormGroupTouched(this.suppTypeForm);
        this.submitted = true;
        if (this.suppTypeForm.invalid) {
            return;
        }
        let supptype001mb = new Supptype001mb();
        supptype001mb.supName = this.f.supName.value ? this.f.supName.value : "";
        supptype001mb.suType = this.f.suType.value ? this.f.suType.value : "";
        if (this.sutypeId) {
            supptype001mb.sutypeId = this.sutypeId;
            supptype001mb.insertUser = this.insertUser;
			supptype001mb.insertDatetime = this.insertDatetime;
            supptype001mb.updatedUser = this.authManager.getcurrentUser.username;
			supptype001mb.updatedDatetime = new Date();
            this.suptypeManager.suptypeupdate(supptype001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let suptyperes = deserialize<Supptype001mb>(Supptype001mb, response);
                for (let suptype of this.supType) {
                    if (suptype.sutypeId == suptyperes.sutypeId) {
                        suptype.supName = suptyperes.supName;
                        suptype.suType = suptyperes.suType;
                        suptype.insertUser = this.insertUser;
                        suptype.insertDatetime = this.insertDatetime;
                        suptype.updatedUser = this.authManager.getcurrentUser.username;
                        suptype.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.supType);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.suppTypeForm.reset();
                this.sutypeId = null;
                this.submitted = false;
            })
        }
        else {
            supptype001mb.insertUser = this.authManager.getcurrentUser.username;
			supptype001mb.insertDatetime = new Date();
            this.suptypeManager.suptypesave(supptype001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let supty = deserialize<Supptype001mb>(Supptype001mb, response);
                this.supType.push(supty);
                const newItems = [JSON.parse(JSON.stringify(supty))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.suppTypeForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.suppTypeForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.suptypeManager.suptypePdf().subscribe((response) =>{
            saveAs(response,"SupplierTypeList");

		});
	}

	onGenerateExcelReport(){
		this.suptypeManager.suptypeExcel().subscribe((response) => {
			saveAs(response,"SupplierTypeList");
        })
	}


}