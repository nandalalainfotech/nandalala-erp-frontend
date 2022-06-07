import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OperationManager } from 'src/app/shared/services/restcontroller/bizservice/operation.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { WorkStationManager } from 'src/app/shared/services/restcontroller/bizservice/work-station.service';
import { Operationbom001mb } from 'src/app/shared/services/restcontroller/entities/Operationbom001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Workstation001mb } from 'src/app/shared/services/restcontroller/entities/Workstation001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.css']
})

export class OperationComponent implements OnInit {
    operationsForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    opId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    opName: string = "";
    workstName: string = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    dummysystemproperties: Systemproperties001mb[] = [];
    operationBom: Operationbom001mb[] = [];
    workstation:Workstation001mb[]=[];
    public gridOptions: GridOptions | any;

    constructor(private operationManager: OperationManager,
        private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private workstationmanager:WorkStationManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.operationsForm = this.formBuilder.group({
            opName: ['', Validators.required],
            workstName: ['', Validators.required]
        });
        this.createDataGrid001();
        this.workstationmanager.allworkstation().subscribe((response) => {
            this.workstation = deserialize<Workstation001mb[]>(Workstation001mb, response);
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.operationManager.allbom().subscribe((response) => {
            this.operationBom = deserialize(Operationbom001mb, response);
            if (this.operationBom.length > 0) {
                this.gridOptions?.api?.setRowData(this.operationBom);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.operationsForm.controls; }

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
                field: 'opId',
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
                headerName: 'Operation Name',
                field: 'opName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Work Station',
                field: 'workstName',
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
                cellStyle: { textAlign: 'center' },
                width: 55,
                flex: 1,
                suppressSizeToFit: true,
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
        this.opId = params.data.opId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.operationsForm.patchValue({
            'opName': params.data.opName,
            'workstName': params.data.workstName
        });
    }

    onDeleteButtonClick(params: any) {
        this.operationManager.bomdelete(params.data.opId).subscribe((response) => {
            for (let i = 0; i < this.operationBom.length; i++) {
                if (this.operationBom[i].opId == params.data.opId) {
                    this.operationBom?.splice(i, 1);
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
        modalRef.componentInstance.title = "BOM Operation";
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

    onOrderClick(event: any, operationsForm: any) {
        this.markFormGroupTouched(this.operationsForm);
        this.submitted = true;
        if (this.operationsForm.invalid) {
            return;
        }

        let operationbom = new Operationbom001mb();
        operationbom.opName = this.f.opName.value ? this.f.opName.value : "";
        operationbom.workstName = this.f.workstName.value ? this.f.workstName.value : "";
        if (this.opId) {
            operationbom.opId = this.opId;
            operationbom.insertUser = this.insertUser;
			operationbom.insertDatetime = this.insertDatetime;
            operationbom.updatedUser = this.authManager.getcurrentUser.username;
			operationbom.updatedDatetime = new Date();
            this.operationManager.bomupdate(operationbom).subscribe(response => {
                this.calloutService.showSuccess("Order Update Successfully");
                let operation = deserialize<Operationbom001mb>(Operationbom001mb, response);
                for (let bomoperation of this.operationBom) {
                    if (bomoperation.opId == operation.opId) {
                        bomoperation.opName = operation.opName;
                        bomoperation.workstName = operation.workstName;
                        bomoperation.insertUser = this.insertUser;
                        bomoperation.insertDatetime = this.insertDatetime;
                        bomoperation.updatedUser = this.authManager.getcurrentUser.username;
                        bomoperation.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.operationBom);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.operationsForm.reset();
                this.opId = null;
                this.submitted = false;
            })
        }
        else {
            operationbom.insertUser = this.authManager.getcurrentUser.username;
			operationbom.insertDatetime = new Date();
            this.operationManager.bomsave(operationbom).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let operation = deserialize<Operationbom001mb>(Operationbom001mb, response);
                this.operationBom?.push(operation);
                const newItems = [JSON.parse(JSON.stringify(operation))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.operationsForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.operationsForm.reset();
    }

	onGeneratePdfReport(){
		this.operationManager.operationPdf().subscribe((response) =>{
			saveAs(response,'BOMOperationList');

		});
	}

	onGenerateExcelReport(){
		this.operationManager.operationExcel().subscribe((response) => {
			saveAs(response,'BOMOperationList');
        })
	}

}