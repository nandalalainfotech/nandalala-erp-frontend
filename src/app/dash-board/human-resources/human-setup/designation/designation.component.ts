import { Component, OnInit } from '@angular/core';
import { Designation001mb } from 'src/app/shared/services/restcontroller/entities/Designation001mb';
import { deserialize } from 'serializer.ts/Serializer';
import { GridOptions } from 'ag-grid-community';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { DesignationManager } from 'src/app/shared/services/restcontroller/bizservice/designation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { saveAs } from 'file-saver';
@Component({
    selector: 'app-designation',
    templateUrl: './designation.component.html',
    styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

    frameworkComponents: any;
    designId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    designation: string = "";
    designations: Designation001mb[] = [];
    public gridOptions: GridOptions | any;
    designtnForm: FormGroup | any;
    submitted = false;

    constructor(private designationManager: DesignationManager, 
        private formBuilder: FormBuilder, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {

        this.designtnForm = this.formBuilder.group({
            designation: ['', Validators.required]
        });
        this.createDataGrid001();
        this.designationManager.alldesingtn().subscribe((response) => {
            this.designations = deserialize<Designation001mb[]>(Designation001mb, response);
            if (this.designations.length > 0) {
                this.gridOptions?.api?.setRowData(this.designations);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() { return this.designtnForm.controls; }
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
                headerName: '#Id',
                field: 'designId',
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
                headerName: 'Designation',
                field: 'designation',
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
                width: 35,
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
                width: 35,
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
        this.designId = params.data.designId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.designtnForm.patchValue({
            'designation': params.data.designation,
        });
    }

    onDeleteButtonClick(params: any) {
        this.designationManager.deletedesingtn(params.data.designId).subscribe((response) => {
            for (let i = 0; i < this.designations.length; i++) {
                if (this.designations[i].designId == params.data.designId) {
                    this.designations?.splice(i, 1);
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
        modalRef.componentInstance.title = "Designation";
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

    onOrderClick(event: any, designtnForm: any) {

        this.markFormGroupTouched(this.designtnForm);
        this.submitted = true;
        if (this.designtnForm.invalid) {
            return;
        }
        let designation001mb = new Designation001mb();
        designation001mb.designation = this.f.designation.value ? this.f.designation.value : "";
        if (this.designId) {
            designation001mb.designId = this.designId;
            designation001mb.insertUser = this.insertUser;
            designation001mb.insertDatetime = this.insertDatetime;
            designation001mb.updatedUser = this.authManager.getcurrentUser.username;
            designation001mb.updatedDatetime = new Date();
            this.designationManager.updatedesingtn(designation001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let designtns = deserialize<Designation001mb>(Designation001mb, response);
                for (let design of this.designations) {
                    if (design.designId == designtns.designId) {
                        design.designation = designtns.designation;
                        design.insertUser = this.insertUser;
                        design.insertDatetime = this.insertDatetime;
                        design.updatedUser = this.authManager.getcurrentUser.username;
                        design.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.designations);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.designtnForm.reset();
                this.submitted = false;
                this.designId = null;
            })
        }
        else {
            designation001mb.insertUser = this.authManager.getcurrentUser.username;
            designation001mb.insertDatetime = new Date();
            this.designationManager.savedesingtn(designation001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let designtns = deserialize<Designation001mb>(Designation001mb, response);
                this.designations.push(designtns);
                const newItems = [JSON.parse(JSON.stringify(designtns))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.designtnForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.designtnForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.designationManager.designationPdf().subscribe((response) => {
			saveAs(response, "DesignationList");

		});
	}

	onGenerateExcelReport() {
		this.designationManager.designationExcel().subscribe((response) => {
			saveAs(response, "DesignationList");
		});
	}

}

