import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { WorkStationManager } from 'src/app/shared/services/restcontroller/bizservice/work-station.service';
import { Workstation001mb } from 'src/app/shared/services/restcontroller/entities/Workstation001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-work-station',
    templateUrl: './work-station.component.html',
    styleUrls: ['./work-station.component.css']
})

export class WorkStationComponent implements OnInit {
    workStationForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    workstId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    workstName: string = "";
    workStation: Workstation001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private workStationManager: WorkStationManager, 
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.workStationForm = this.formBuilder.group({
            workstName: ['', Validators.required]
        });

        this.createDataGrid001();
        this.workStationManager.allworkstation().subscribe((response) => {
            this.workStation = deserialize<Workstation001mb[]>(Workstation001mb, response);
            if (this.workStation.length > 0) {
                this.gridOptions?.api?.setRowData(this.workStation);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.workStationForm.controls; }

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
                field: 'workstId',
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
        this.workstId = params.data.workstId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.workStationForm.patchValue({
            'workstName': params.data.workstName,

        });
    }

    onDeleteButtonClick(params: any) {
        this.workStationManager.stationdelete(params.data.workstId).subscribe((response) => {
            for (let i = 0; i < this.workStation.length; i++) {
                if (this.workStation[i].workstId == params.data.workstId) {
                    this.workStation?.splice(i, 1);
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
        modalRef.componentInstance.title = "Work Station";
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

    onOrderClick(event: any, workStationForm: any) {
        this.markFormGroupTouched(this.workStationForm);
        this.submitted = true;
        if (this.workStationForm.invalid) {
            return;
        }
        let workstation001mb = new Workstation001mb();
        workstation001mb.workstName = this.f.workstName.value ? this.f.workstName.value : "";
        if (this.workstId) {
            workstation001mb.workstId = this.workstId;
            workstation001mb.insertUser = this.insertUser;
			workstation001mb.insertDatetime = this.insertDatetime;
            workstation001mb.updatedUser = this.authManager.getcurrentUser.username;
			workstation001mb.updatedDatetime = new Date();
            this.workStationManager.workstationupdate(workstation001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let work = deserialize<Workstation001mb>(Workstation001mb, response);
                for (let workst of this.workStation) {
                    if (workst.workstId == work.workstId) {
                        workst.workstName = work.workstName;
                        workst.insertUser = this.insertUser;
                        workst.insertDatetime = this.insertDatetime;
                        workst.updatedUser = this.authManager.getcurrentUser.username;
                        workst.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.workStation);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.workStationForm.reset();
                this.submitted = false;
                this.workstId = null;
            })
        }
        else {
            workstation001mb.insertUser = this.authManager.getcurrentUser.username;
			workstation001mb.insertDatetime = new Date();
            this.workStationManager.workstationsave(workstation001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let work = deserialize<Workstation001mb>(Workstation001mb, response);
                this.workStation?.push(work);
                const newItems = [JSON.parse(JSON.stringify(work))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.workStationForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.workStationForm.reset();
    }

    onGeneratePdfReport(){
		this.workStationManager.workStationPdf().subscribe((response) =>{
			saveAs(response,'WorkStationList');

		});
	}

	onGenerateExcelReport(){
		this.workStationManager.workStationExcel().subscribe((response) => {
			saveAs(response,'WorkStationList');
        })
	}

}