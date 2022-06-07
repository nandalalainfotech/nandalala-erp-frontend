import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LeaveTypeManager } from 'src/app/shared/services/restcontroller/bizservice/leave-type.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Leavetype001mb } from 'src/app/shared/services/restcontroller/entities/Leavetype001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-leave-type',
    templateUrl: './leave-type.component.html',
    styleUrls: ['./leave-type.component.css']
})

export class LeaveTypeComponent implements OnInit {


    frameworkComponents: any;
    letypeForm: FormGroup | any;
    lvtypeId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    lvtypeName: string = "";
    maxdaysAllowed: number | any;
    leaveType: Leavetype001mb[] = [];
    seriesname = "Leave.leaveType";
    seriestype = "leaveType";
    submitted = false;
    seriessystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private leaveTypeManager: LeaveTypeManager, 
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
        this.letypeForm = this.formBuilder.group({
            lvtypeName: ['', Validators.required],
            maxdaysAllowed: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.seriesname, this.seriestype).subscribe(response => {
            this.seriessystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.leaveTypeManager.allleavetype().subscribe((response) => {
            this.leaveType = deserialize<Leavetype001mb[]>(Leavetype001mb, response);
            if (this.leaveType.length > 0) {
                this.gridOptions?.api?.setRowData(this.leaveType);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.letypeForm.controls }

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
                field: 'lvtypeId',
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
                field: 'lvtypeName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Max Day Allowed',
                field: 'maxdaysAllowed',
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
        this.lvtypeId = params.data.lvtypeId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.letypeForm.patchValue({
            'lvtypeName': params.data.lvtypeName,
            'maxdaysAllowed': params.data.maxdaysAllowed
        });
    }

    onDeleteButtonClick(params: any) {
        this.leaveTypeManager.leavetypedelete(params.data.lvtypeId).subscribe((response) => {
            for (let i = 0; i < this.leaveType.length; i++) {
                if (this.leaveType[i].lvtypeId == params.data.lvtypeId) {
                    this.leaveType?.splice(i, 1);
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
        modalRef.componentInstance.title = "Leave Type";
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

    onOrderClick(event: any, letypeForm: any) {
        this.markFormGroupTouched(this.letypeForm);
        this.submitted = true;
        if (this.letypeForm.invalid) {
            return;
        }
        let leavetype001mb = new Leavetype001mb();
        leavetype001mb.lvtypeName = this.f.lvtypeName.value ? this.f.lvtypeName.value : "";
        leavetype001mb.maxdaysAllowed = this.f.maxdaysAllowed.value ? this.f.maxdaysAllowed.value : 0;
        if (this.lvtypeId) {
            leavetype001mb.lvtypeId = this.lvtypeId;
            leavetype001mb.insertUser = this.insertUser;
            leavetype001mb.insertDatetime = this.insertDatetime;
            leavetype001mb.updatedUser = this.authManager.getcurrentUser.username;
            leavetype001mb.updatedDatetime = new Date();
            this.leaveTypeManager.leavetypesave(leavetype001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let leave = deserialize<Leavetype001mb>(Leavetype001mb, response);
                for (let leavetype of this.leaveType) {
                    if (leavetype.lvtypeId == leave.lvtypeId) {
                        leavetype.lvtypeName = leave.lvtypeName;
                        leavetype.maxdaysAllowed = leave.maxdaysAllowed;
                        leavetype.insertUser = this.insertUser;
                        leavetype.insertDatetime = this.insertDatetime;
                        leavetype.updatedUser = this.authManager.getcurrentUser.username;
                        leavetype.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.leaveType);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.letypeForm.reset();
                this.submitted = false;
                this.lvtypeId = null;
            });
        } 
        else {
            leavetype001mb.insertUser = this.authManager.getcurrentUser.username;
            leavetype001mb.insertDatetime = new Date();
            this.leaveTypeManager.leavetypesave(leavetype001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let leave = deserialize<Leavetype001mb>(Leavetype001mb, response);
                this.leaveType?.push(leave);
                const newItems = [JSON.parse(JSON.stringify(leave))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.letypeForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.letypeForm.reset();
        this.submitted = false;
    }
    onGeneratePdfReport(){
		this.leaveTypeManager.leaveTypePdf().subscribe((response) =>{
            saveAs(response,"AddLeaveType");

		});
	}

	onGenerateExcelReport(){
		this.leaveTypeManager.leaveTypeExcel().subscribe((response) => {
			saveAs(response,"AddLeaveType");
        })
	}
}