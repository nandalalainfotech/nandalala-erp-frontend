import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LeaveBlockManager } from 'src/app/shared/services/restcontroller/bizservice/leave-block.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Lvblocklist001mb } from 'src/app/shared/services/restcontroller/entities/Lvblocklist001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-leave-block',
    templateUrl: './leave-block.component.html',
    styleUrls: ['./leave-block.component.css']
})

export class LeaveBlockComponent implements OnInit {

    frameworkComponents: any;
    leBlockForm: FormGroup | any;
    lvblockId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    blockName: string = "";
    company: string | null = "";
    cmyname = "Dummy.status";
    cmytype = "dummy";
    submitted = false;
    public gridOptions: GridOptions | any;
    cmysystemproperties: Systemproperties001mb[] = [];
    lvblockList: Lvblocklist001mb[] = [];

    constructor(private leaveBlockManager: LeaveBlockManager, 
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
        this.leBlockForm = this.formBuilder.group({
            blockName: ['', Validators.required],
            company: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.cmyname, this.cmytype).subscribe(response => {
            this.cmysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.leaveBlockManager.allleaveblock().subscribe((response) => {
            this.lvblockList = deserialize<Lvblocklist001mb[]>(Lvblocklist001mb, response);
            if (this.lvblockList.length > 0) {
                this.gridOptions?.api?.setRowData(this.lvblockList);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.leBlockForm.controls }

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
                field: 'lvblockId',
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
                headerName: 'Block name',
                field: 'blockName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Company',
                field: 'company',
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
        this.lvblockId = params.data.lvblockId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.leBlockForm.patchValue({
            'blockName': params.data.blockName,
            'company': params.data.company
        });
    }

    onDeleteButtonClick(params: any) {
        this.leaveBlockManager.leaveblockdelete(params.data.lvblockId).subscribe((response) => {
            for (let i = 0; i < this.lvblockList.length; i++) {
                if (this.lvblockList[i].lvblockId == params.data.lvblockId) {
                    this.lvblockList?.splice(i, 1);
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
        modalRef.componentInstance.title = "Leave Block";
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

    onOrderClick(event: any, leBlockForm: any) {
        this.markFormGroupTouched(this.leBlockForm);
        this.submitted = true;
        if (this.leBlockForm.invalid) {
            return;
        }
        let lvblocklist001mb = new Lvblocklist001mb();
        lvblocklist001mb.blockName = this.f.blockName.value ? this.f.blockName.value : "";
        lvblocklist001mb.company = this.f.company.value ? this.f.company.value : "";
        if (this.lvblockId) {
            lvblocklist001mb.lvblockId = this.lvblockId;
            lvblocklist001mb.insertUser = this.insertUser;
            lvblocklist001mb.insertDatetime = this.insertDatetime;
            lvblocklist001mb.updatedUser = this.authManager.getcurrentUser.username;
            lvblocklist001mb.updatedDatetime = new Date();
            this.leaveBlockManager.leaveblocksave(lvblocklist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let leave = deserialize<Lvblocklist001mb>(Lvblocklist001mb, response);
                for (let leaveapps of this.lvblockList) {
                    if (leaveapps.lvblockId == leave.lvblockId) {
                        leaveapps.company = leave.company;
                        leaveapps.blockName = leave.blockName;
                        leaveapps.insertUser = this.insertUser;
                        leaveapps.insertDatetime = this.insertDatetime;
                        leaveapps.updatedUser = this.authManager.getcurrentUser.username;
                        leaveapps.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.lvblockList);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.leBlockForm.reset();
                this.submitted = false;
                this.lvblockId = null;
            });
        }
        else {
            lvblocklist001mb.insertUser = this.authManager.getcurrentUser.username;
            lvblocklist001mb.insertDatetime = new Date();
            this.leaveBlockManager.leaveblocksave(lvblocklist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let leave = deserialize<Lvblocklist001mb>(Lvblocklist001mb, response);
                this.lvblockList?.push(leave);
                const newItems = [JSON.parse(JSON.stringify(leave))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.leBlockForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.leBlockForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.leaveBlockManager.leaveBlockPdf().subscribe((response) =>{
            saveAs(response,"LeaveBlockList");

		});
	}

	onGenerateExcelReport(){
		this.leaveBlockManager.leaveBlockExcel().subscribe((response) => {
			saveAs(response,"LeaveBlockList");
        })
	}
}