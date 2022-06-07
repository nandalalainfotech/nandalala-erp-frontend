import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CostCenterManager } from 'src/app/shared/services/restcontroller/bizservice/costcenter.service';
import { Costcenter001mb } from 'src/app/shared/services/restcontroller/entities/Costcenter001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-costcenter',
    templateUrl: './costcenter.component.html',
    styleUrls: ['./costcenter.component.css']
})

export class CostcenterComponent implements OnInit {
    costForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    centId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    centerName: string = "";
    costcenter: Costcenter001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private costCenterManager: CostCenterManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.costForm = this.formBuilder.group({
            centerName: ['', Validators.required]
        })
        this.createDataGrid001();
        this.costCenterManager.allcostcenter().subscribe((response) => {
            this.costcenter = deserialize<Costcenter001mb[]>(Costcenter001mb, response);
            if (this.costcenter.length > 0) {
                this.gridOptions?.api?.setRowData(this.costcenter);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.costForm.controls; }
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
                field: 'centId',
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
                headerName: 'Name',
                field: 'centerName',
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
        this.centId = params.data.centId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.costForm.patchValue({
            'centerName': params.data.centerName
        });
    }
    onDeleteButtonClick(params: any) {
        this.costCenterManager.costcenterdelete(params.data.centId).subscribe((response) => {
            for (let i = 0; i < this.costcenter.length; i++) {
                if (this.costcenter[i].centId == params.data.centId) {
                    this.costcenter?.splice(i, 1);
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
        modalRef.componentInstance.title = "CostCenter Chart";
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
    onOrderClick(event: any, costForm: any) {
        this.markFormGroupTouched(this.costForm);
        this.submitted = true;
        if (this.costForm.invalid) {
            return;
        }
        let costcenter001mb = new Costcenter001mb();
        costcenter001mb.centerName = this.f.centerName.value ? this.f.centerName.value : "";
        if (this.centId) {
            costcenter001mb.centId = this.centId;
            costcenter001mb.insertUser = this.insertUser;
			costcenter001mb.insertDatetime = this.insertDatetime;
            costcenter001mb.updatedUser = this.authManager.getcurrentUser.username;
			costcenter001mb.updatedDatetime = new Date();
            this.costCenterManager.costcenterupdate(costcenter001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let cost = deserialize<Costcenter001mb>(Costcenter001mb, response);
                for (let ctcenter of this.costcenter) {
                    if (ctcenter.centId == cost.centId) {
                        ctcenter.centerName = cost.centerName;
                        ctcenter.insertUser = this.insertUser;
                        ctcenter.insertDatetime = this.insertDatetime;
                        ctcenter.updatedUser = this.authManager.getcurrentUser.username;
                        ctcenter.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.costcenter);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.costForm.reset();
                this.centId = null;
                this.submitted = false;
            })
        }
        else {
            costcenter001mb.insertUser = this.authManager.getcurrentUser.username;
			costcenter001mb.insertDatetime = new Date();
            this.costCenterManager.costcentersave(costcenter001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let cost = deserialize<Costcenter001mb>(Costcenter001mb, response);
                this.costcenter?.push(cost)
                const newItems = [JSON.parse(JSON.stringify(cost))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.costForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.costForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.costCenterManager.costCenterPdf().subscribe((response) =>{
            saveAs(response,"CostCenterChartList");

		});
	}

	onGenerateExcelReport(){
		this.costCenterManager.costCenterExcel().subscribe((response) => {
			saveAs(response,"CostCenterChartList");
        })
	}

}