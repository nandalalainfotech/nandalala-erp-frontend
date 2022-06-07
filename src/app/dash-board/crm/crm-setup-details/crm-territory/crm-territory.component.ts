import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
import { Territory001mb } from 'src/app/shared/services/restcontroller/entities/Territory001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-crm-territory',
    templateUrl: './crm-territory.component.html',
    styleUrls: ['./crm-territory.component.css']
})

export class CrmTerritoryComponent implements OnInit {
    terrForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    terId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    terName: string = "";
    territorys: Territory001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private crmTerritoryManager: CrmTerritoryManager,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }
    ngOnInit() {
        this.terrForm = this.formBuilder.group({
            terName: ['', Validators.required]
        });

        this.createDataGrid001();
        this.crmTerritoryManager.allterritory().subscribe((response) => {
            this.territorys = deserialize<Territory001mb[]>(Territory001mb, response);
            if (this.territorys.length > 0) {
                this.gridOptions?.api?.setRowData(this.territorys);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.terrForm.controls; }

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
                headerName: '#ID',
                field: 'terId',
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
                headerName: 'Territory Name',
                field: 'terName',
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
        this.terId = params.data.terId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.terrForm.patchValue({
            'terName': params.data.terName,
        });
    }

    onDeleteButtonClick(params: any) {
        this.crmTerritoryManager.territorydelete(params.data.terId).subscribe((response) => {
            for (let i = 0; i < this.territorys.length; i++) {
                if (this.territorys[i].terId == params.data.terId) {
                    this.territorys?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Territory";
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

    onOrderClick(event: any, terrForm: any) {
        this.markFormGroupTouched(this.terrForm);
        this.submitted = true;
        if (this.terrForm.invalid) {
            return;
        }
        let territory001 = new Territory001mb();
        territory001.terName = this.f.terName.value ? this.f.terName.value : "";
        if (this.terId) {
            territory001.terId = this.terId;
            territory001.insertUser = this.insertUser;
            territory001.insertDatetime = this.insertDatetime;
            territory001.updatedUser = this.authManager.getcurrentUser.username;
            territory001.updatedDatetime = new Date();
            this.crmTerritoryManager.territorysave(territory001).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let crmTerritory = deserialize<Territory001mb>(Territory001mb, response);
                for (let crmTerritorys of this.territorys) {
                    if (crmTerritorys.terId == crmTerritory.terId) {
                        crmTerritorys.terName = crmTerritory.terName;
                        crmTerritorys.insertUser = this.insertUser;
                        crmTerritorys.insertDatetime = this.insertDatetime;
                        crmTerritorys.updatedUser = this.authManager.getcurrentUser.username;
                        crmTerritorys.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.territorys);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.terrForm.reset();
                this.terId = null;
                this.submitted = false;
            });
        } else {
            territory001.insertUser = this.authManager.getcurrentUser.username;
            territory001.insertDatetime = new Date();
            this.crmTerritoryManager.territorysave(territory001).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let crmTerritory = deserialize<Territory001mb>(Territory001mb, response);
                this.territorys.push(crmTerritory);
                const newItems = [JSON.parse(JSON.stringify(crmTerritory))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.terrForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.terrForm.reset();
    }

    onGeneratePdfReport(){
		this.crmTerritoryManager.crmTerritoryPdf().subscribe((response) =>{
            saveAs(response,"TerritoryDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.crmTerritoryManager.crmTerritoryExcel().subscribe((response) => {
			saveAs(response,"TerritoryDetailsList");
        })
	}
}