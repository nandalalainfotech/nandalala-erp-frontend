import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BomTypeManager } from 'src/app/shared/services/restcontroller/bizservice/bom-type.service';
import { Bomtype001mb } from 'src/app/shared/services/restcontroller/entities/Bomtype001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-bom-type',
    templateUrl: './bom-type.component.html',
    styleUrls: ['./bom-type.component.css']
})

export class BomTypeComponent implements OnInit {
    bomForm: FormGroup | any;
    submitted = false;
    bomId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    bomName: string = "";
    bomType: string | null = "";
    name: string = "";
    type: string = "";
    bomtType: Bomtype001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private bomTypeManager: BomTypeManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.bomForm = this.formBuilder.group({
            bomName: ['', Validators.required],
            bomType: ['', Validators.required],
        });

        this.createDataGrid001();
        this.bomTypeManager.allbomtype().subscribe((response => {
            this.bomtType = deserialize<Bomtype001mb[]>(Bomtype001mb, response);
            if (this.bomtType.length > 0) {
                this.gridOptions?.api?.setRowData(this.bomtType);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        }))
    }

    get f() { return this.bomForm.controls; }

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
                field: 'bomId',
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
                headerName: 'BOM Name',
                field: 'bomName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Type',
                field: 'bomType',
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
        this.bomId = params.data.bomId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.bomForm.patchValue({
            'bomName': params.data.bomName,
            'bomType': params.data.bomType,
        })
    }

    onDeleteButtonClick(params: any) {
        this.bomTypeManager.bomtypedelete(params.data.bomId).subscribe((response) => {
            for (let i = 0; i < this.bomtType.length; i++) {
                if (this.bomtType[i].bomId == params.data.bomId) {
                    this.bomtType?.splice(i, 1);
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
        modalRef.componentInstance.title = "BOM Type";
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

    onOrderClick(event: any, bomForm: any) {

        this.markFormGroupTouched(this.bomForm);
        this.submitted = true;
        if (this.bomForm.invalid) {
            return;
        }

        let bomtype = new Bomtype001mb();
        bomtype.bomName = this.f.bomName.value ? this.f.bomName.value : "";
        bomtype.bomType = this.f.bomType.value ? this.f.bomType.value : "";
        if (this.bomId) {
            bomtype.bomId = this.bomId;
            bomtype.insertUser = this.insertUser;
			bomtype.insertDatetime = this.insertDatetime;
            bomtype.updatedUser = this.authManager.getcurrentUser.username;
			bomtype.updatedDatetime = new Date();
            this.bomTypeManager.bomtypeupdate(bomtype).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let bomtyp = deserialize<Bomtype001mb>(Bomtype001mb, response);
                for (let boms of this.bomtType) {
                    if (boms.bomId == bomtyp.bomId) {
                        boms.bomName = bomtyp.bomName;
                        boms.bomType = bomtyp.bomType;
                        boms.insertUser = this.insertUser;
                        boms.insertDatetime = this.insertDatetime;
                        boms.updatedUser = this.authManager.getcurrentUser.username;
                        boms.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.bomtType);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.bomForm.reset();
                this.bomId = null;
                this.submitted = false;
            })
        }
        else {
            bomtype.insertUser = this.authManager.getcurrentUser.username;
			bomtype.insertDatetime = new Date();
            this.bomTypeManager.bomtypesave(bomtype).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let bomtype = deserialize<Bomtype001mb>(Bomtype001mb, response);
                this.bomtType.push(bomtype);
                const newItems = [JSON.parse(JSON.stringify(bomtype))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.bomForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.bomForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.bomTypeManager.bomTypePdf().subscribe((response) =>{
			saveAs(response,'BOMTypeList');

		});
	}

	onGenerateExcelReport(){
		this.bomTypeManager.bomTypeExcel().subscribe((response) => {
			saveAs(response,'BOMTypeList');
        })
	}

}
