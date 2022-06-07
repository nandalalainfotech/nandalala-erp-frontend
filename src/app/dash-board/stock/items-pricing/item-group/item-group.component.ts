import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemGroupManager } from 'src/app/shared/services/restcontroller/bizservice/item-group.service';
import { Itemgroup001mb } from 'src/app/shared/services/restcontroller/entities/Itemgroup001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-item-group',
    templateUrl: './item-group.component.html',
    styleUrls: ['./item-group.component.css']
})
export class ItemGroupComponent implements OnInit {

    itemsForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    igId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemGroup: string = "";
    itemGroups: Itemgroup001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private itemGroupManager: ItemGroupManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {

        this.itemsForm = this.formBuilder.group({
            itemGroup: ['', Validators.required],
        })

        this.createDataGrid001();
        this.itemGroupManager.allitemgroup().subscribe((response) => {
            this.itemGroups = deserialize<Itemgroup001mb[]>(Itemgroup001mb, response);
            if (this.itemGroups.length > 0) {
                this.gridOptions?.api?.setRowData(this.itemGroups);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.itemsForm.controls; }

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
                field: 'igId',
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
                headerName: 'Item Group',
                field: 'itemGroup',
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

        this.igId = params.data.igId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.itemsForm.patchValue({
            'itemGroup': params.data.itemGroup,
        })
    }

    onDeleteButtonClick(params: any) {
        this.itemGroupManager.deleteitemgroup(params.data.igId).subscribe((response) => {
            for (let i = 0; i < this.itemGroups.length; i++) {
                if (this.itemGroups[i].igId == params.data.igId) {
                    this.itemGroups?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item Group";
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

    onOrderClick(event: any, itemsForm: any) {

        this.markFormGroupTouched(this.itemsForm);
        this.submitted = true;
        if (this.itemsForm.invalid) {
            return;
        }

        let itemgroup001mb = new Itemgroup001mb();
        itemgroup001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
        if (this.igId) {
            itemgroup001mb.igId = this.igId;
            itemgroup001mb.insertUser = this.insertUser;
            itemgroup001mb.insertDatetime = this.insertDatetime;
            itemgroup001mb.updatedUser = this.authManager.getcurrentUser.username;
            itemgroup001mb.updatedDatetime = new Date();
            this.itemGroupManager.updateitemgroup(itemgroup001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let groups = deserialize<Itemgroup001mb>(Itemgroup001mb, response);
                for (let grp of this.itemGroups) {
                    if (grp.igId == groups.igId) {
                        grp.itemGroup = groups.itemGroup;
                        grp.insertUser = this.insertUser;
                        grp.insertDatetime = this.insertDatetime;
                        grp.updatedUser = this.authManager.getcurrentUser.username;
                        grp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.itemGroups);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.itemsForm.reset();
                this.igId = null;
                this.submitted = false;
            })
        }
        else {
            itemgroup001mb.insertUser = this.authManager.getcurrentUser.username;
            itemgroup001mb.insertDatetime = new Date();
            this.itemGroupManager.saveitemgroup(itemgroup001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let groups = deserialize<Itemgroup001mb>(Itemgroup001mb, response);
                this.itemGroups.push(groups);
                const newItems = [JSON.parse(JSON.stringify(groups))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.itemsForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.itemsForm.reset();
        this.submitted = false;
    }


    onGeneratePdfReport() {
		this.itemGroupManager.itemGroupPdf().subscribe((response) => {
			saveAs(response, "ItemGroupList");

		});
	}

	onGenerateExcelReport() {
		this.itemGroupManager.itemGroupExcel().subscribe((response) => {
			saveAs(response, "ItemGroupList");
		});
	}
}