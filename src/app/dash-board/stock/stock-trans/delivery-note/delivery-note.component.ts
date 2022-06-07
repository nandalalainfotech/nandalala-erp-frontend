import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DeliveryNoteManager } from 'src/app/shared/services/restcontroller/bizservice/delivery-note.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Stktransdeliver001mb } from 'src/app/shared/services/restcontroller/entities/Stktransdeliver001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-delivery-note',
    templateUrl: './delivery-note.component.html',
    styleUrls: ['./delivery-note.component.css']
})

export class DeliveryNoteComponent implements OnInit {
    delNoteForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    name: string = "ProdOrder.status";
    stdelId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    type: string = "status";
    title: string = "";
    status: string = "";
    grandTotal: number | any;
    delName: string = "";
    delivaryNotes: Stktransdeliver001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private deliveryNoteManager: DeliveryNoteManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.delNoteForm = this.formBuilder.group({
            title: ['', Validators.required],
            status: ['', Validators.required],
            grandTotal: ['', Validators.required],
            delName: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.deliveryNoteManager.alldelnote().subscribe((response) => {
            this.delivaryNotes = deserialize<Stktransdeliver001mb[]>(Stktransdeliver001mb, response)
            if (this.delivaryNotes.length > 0) {
                this.gridOptions?.api?.setRowData(this.delivaryNotes);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.delNoteForm.controls; }

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
                field: 'stdelId',
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
                headerName: 'Title',
                field: 'title',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'status',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Grand Total',
                field: 'grandTotal',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Delivery Note',
                field: 'delName',
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
                width: 80,
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
                width: 85,
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
                width: 85,
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
        this.stdelId = params.data.stdelId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.delNoteForm.patchValue({
            'title': params.data.title,
            'status': params.data.status,
            'grandTotal': params.data.grandTotal,
            'delName': params.data.delName
        });
    }

    onDeleteButtonClick(params: any) {
        this.deliveryNoteManager.deletedelnote(params.data.stdelId).subscribe((responce) => {
            for (let i = 0; i < this.delivaryNotes.length; i++) {
                if (this.delivaryNotes[i].stdelId == params.data.stdelId) {
                    this.delivaryNotes?.splice(i, 1);
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
        modalRef.componentInstance.title = "Delivery Note";
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

    onOrderClick(event: any, delNoteForm: any) {
        this.markFormGroupTouched(this.delNoteForm);
        this.submitted = true;
        if (this.delNoteForm.invalid) {
            return;
        }
        let stktransdeliver001mb = new Stktransdeliver001mb();
        stktransdeliver001mb.title = this.f.title.value ? this.f.title.value : "";
        stktransdeliver001mb.status = this.f.status.value ? this.f.status.value : "";
        stktransdeliver001mb.grandTotal = this.f.grandTotal.value ? this.f.grandTotal.value : null;
        stktransdeliver001mb.delName = this.f.delName.value ? this.f.delName.value : "";
        if (this.stdelId) {
            stktransdeliver001mb.stdelId = this.stdelId;
            stktransdeliver001mb.insertUser = this.insertUser;
            stktransdeliver001mb.insertDatetime = this.insertDatetime;
            stktransdeliver001mb.updatedUser = this.authManager.getcurrentUser.username;
            stktransdeliver001mb.updatedDatetime = new Date();
            this.deliveryNoteManager.updatedelnote(stktransdeliver001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let del = deserialize<Stktransdeliver001mb>(Stktransdeliver001mb, response);
                for (let note of this.delivaryNotes) {
                    if (note.stdelId == del.stdelId) {
                        note.title = del.title;
                        note.status = del.status;
                        note.grandTotal = del.grandTotal;
                        note.delName = del.delName;
                        note.insertUser = this.insertUser;
                        note.insertDatetime = this.insertDatetime;
                        note.updatedUser = this.authManager.getcurrentUser.username;
                        note.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.delivaryNotes);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.delNoteForm.reset();
                this.stdelId = null;
                this.submitted = false;
            })
        }
        else {
            stktransdeliver001mb.insertUser = this.authManager.getcurrentUser.username;
            stktransdeliver001mb.insertDatetime = new Date();
            this.deliveryNoteManager.savedelnote(stktransdeliver001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let del = deserialize<Stktransdeliver001mb>(Stktransdeliver001mb, response);
                this.delivaryNotes.push(del);
                const newItems = [JSON.parse(JSON.stringify(del))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.delNoteForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.delNoteForm.reset();
    }

    onGeneratePdfReport() {
		this.deliveryNoteManager.deliveryNotePdf().subscribe((response) => {
			saveAs(response, "DeliveryNoteList");

		});
	}

	onGenerateExcelReport() {
		this.deliveryNoteManager.deliveryNoteExcel().subscribe((response) => {
			saveAs(response, "DeliveryNoteList");
		});
	}
}