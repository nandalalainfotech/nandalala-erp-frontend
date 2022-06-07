import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DelNoteTrendManager } from 'src/app/shared/services/restcontroller/bizservice/del-note-trend.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Delnotetrends001mb } from 'src/app/shared/services/restcontroller/entities/Delnotetrends001mb';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-del-note-trend',
    templateUrl: './del-note-trend.component.html',
    styleUrls: ['./del-note-trend.component.css']
})

export class DelNoteTrendComponent implements OnInit {

    noteForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    dntrendId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itmname: string = "Dummy.status";
    itmtype: string = "dummy";
    periodname: string = "range.type";
    periodtype: string = "type";
    basename: string = "supplier.type";
    basetype: string = "type";
    fiscalname: string = "Year.status";
    fiscaltype: string = "year";
    itemCode: string = "";
    period: string = "";
    basedOn: string = "";
    fiscalYear: number | any;
    company: string = "";
    janQty: string | null = "";
    janAmt: string | null = "";
    febQty: string | null = "";
    febAmt: string | null = "";
    marQty: string | null = "";
    marAmt: string | null = "";
    aprQty: string = "";
    aprAmt: string | null = "";
    mayQty: string | null = "";
    mayAmt: string | null = "";
    junQty: string | null = "";
    junAmt: string | null = "";
    julQty: string | null = "";
    julAmt: string | null = "";
    augQty: string | null = "";
    augAmt: string | null = "";
    sepQty: string | null = "";
    sepAmt: string | null = "";
    octQty: string | null = "";
    octAmt: string | null = "";
    novQty: string | null = "";
    novAmt: string | null = "";
    decQty: string | null = "";
    decAmt: string | null = "";
    totalQty: string | null = "";
    totalAmt: string | null = "";
    augQtyt: string | null = "";
    delNotes: Delnotetrends001mb[] = [];
    itmsystemproperties?: Systemproperties001mb[] = [];
    periodsystemproperties?: Systemproperties001mb[] = [];
    basesystemproperties?: Systemproperties001mb[] = [];
    fiscalsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    stkitems: Itemdt001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private salesItemManager: SalesItemManager,
        private delNoteTrendManager: DelNoteTrendManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.noteForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            period: ['', Validators.required],
            basedOn: ['', Validators.required],
            fiscalYear: ['', Validators.required],
            company: ['', Validators.required],
            janQty: ['', Validators.required],
            janAmt: ['', Validators.required],
            febQty: ['', Validators.required],
            febAmt: ['', Validators.required],
            marQty: ['', Validators.required],
            marAmt: ['', Validators.required],
            aprQty: ['', Validators.required],
            aprAmt: ['', Validators.required],
            mayQty: ['', Validators.required],
            mayAmt: ['', Validators.required],
            junQty: ['', Validators.required],
            junAmt: ['', Validators.required],
            julQty: ['', Validators.required],
            julAmt: ['', Validators.required],
            augQty: ['', Validators.required],
            augAmt: ['', Validators.required],
            sepQty: ['', Validators.required],
            sepAmt: ['', Validators.required],
            octQty: ['', Validators.required],
            octAmt: ['', Validators.required],
            novQty: ['', Validators.required],
            novAmt: ['', Validators.required],
            decQty: ['', Validators.required],
            decAmt: ['', Validators.required],
            totalQty: ['', Validators.required],
            totalAmt: ['', Validators.required],
            augQtyt: ['', Validators.required],
        })

        this.createDataGrid001();
        this.systemPropertiesService.system(this.itmname, this.itmtype).subscribe(response => {
            this.itmsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.periodname, this.periodtype).subscribe(response => {
            this.periodsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.basename, this.basetype).subscribe(response => {
            this.basesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.fiscalname, this.fiscaltype).subscribe(response => {
            this.fiscalsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salesItemManager.allsalesitem().subscribe((response) => {
            this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.delNoteTrendManager.alldelnotetrend().subscribe(response => {
            this.delNotes = deserialize<Delnotetrends001mb[]>(Delnotetrends001mb, response);
            if (this.delNotes.length > 0) {
                this.gridOptions?.api?.setRowData(this.delNotes);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.noteForm.controls; }

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
                field: 'dntrendId',
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
                headerName: 'Item',
                field: 'itemCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Period',
                field: 'period',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Based On',
                field: 'basedOn',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Fiscal Year',
                field: 'fiscalYear',
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
                headerName: 'JanQty',
                field: 'janQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JanAmt',
                field: 'janAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'FebQty',
                field: 'febQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'FebAmt',
                field: 'febAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MarQty',
                field: 'marQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MarAmt',
                field: 'marAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'AprQty',
                field: 'aprQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            }, 
            {
                headerName: 'AprAmt',
                field: 'aprAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MayQty',
                field: 'mayQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MayAmt',
                field: 'mayAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JunQty',
                field: 'junQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JunAmt',
                field: 'junAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JulQty',
                field: 'julQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JulAmt',
                field: 'julAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'AugQty',
                field: 'augQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'AugAmt',
                field: 'augAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'SepQty',
                field: 'sepQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'SepAmt',
                field: 'sepAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'OctQty',
                field: 'octQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'OctAmt',
                field: 'octAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'NovQty',
                field: 'novQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'NovAmt',
                field: 'novAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'DecQty',
                field: 'decQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'DecAmt',
                field: 'decAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'TotalQty',
                field: 'totalQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'TotalAmt',
                field: 'totalAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'AugQtyt',
                field: 'augQtyt',
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

        this.dntrendId = params.data.dntrendId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.noteForm.patchValue({

            'itemCode': params.data.itemCode,
            'period': params.data.period,
            'basedOn': params.data.basedOn,
            'fiscalYear': params.data.fiscalYear,
            'company': params.data.company,
            'janAmt': params.data.janAmt,
            'janQty': params.data.janQty,
            'febAmt': params.data.febAmt,
            'febQty': params.data.febQty,
            'marAmt': params.data.marAmt,
            'marQty': params.data.marQty,
            'aprAmt': params.data.aprAmt,
            'aprQty': params.data.aprQty,
            'mayAmt': params.data.mayAmt,
            'mayQty': params.data.mayQty,
            'junAmt': params.data.junAmt,
            'junQty': params.data.junQty,
            'julAmt': params.data.julAmt,
            'julQty': params.data.julQty,
            'augAmt': params.data.augAmt,
            'augQty': params.data.augQty,
            'sepAmt': params.data.sepAmt,
            'sepQty': params.data.sepQty,
            'octAmt': params.data.octAmt,
            'octQty': params.data.octQty,
            'novAmt': params.data.novAmt,
            'novQty': params.data.novQty,
            'decAmt': params.data.decAmt,
            'decQty': params.data.decQty,
            'totalAmt': params.data.totalAmt,
            'totalQty': params.data.totalQty,
            'augQtyt': params.data.augQtyt,
        })
    }

    onDeleteButtonClick(params: any) {
        this.delNoteTrendManager.deletedelnotetrend(params.data.dntrendId).subscribe((response) => {
            for (let i = 0; i < this.delNotes.length; i++) {
                if (this.delNotes[i].dntrendId == params.data.dntrendId) {
                    this.delNotes?.splice(i, 1);
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
        modalRef.componentInstance.title = "Delivery Note Trend";
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

    onOrderClick(event: any, noteForm: any) {

        this.markFormGroupTouched(this.noteForm);
        this.submitted = true;
        if (this.noteForm.invalid) {
            return;
        }

        let delnotetrends001mb = new Delnotetrends001mb();
        delnotetrends001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        delnotetrends001mb.period = this.f.period.value ? this.f.period.value : "";
        delnotetrends001mb.basedOn = this.f.basedOn.value ? this.f.basedOn.value : "";
        delnotetrends001mb.fiscalYear = this.f.fiscalYear.value ? this.f.fiscalYear.value : null;
        delnotetrends001mb.company = this.f.company.value ? this.f.company.value : "";
        delnotetrends001mb.janAmt = this.f.janAmt.value ? this.f.janAmt.value : "";
        delnotetrends001mb.janQty = this.f.janQty.value ? this.f.janQty.value : "";
        delnotetrends001mb.febAmt = this.f.febAmt.value ? this.f.febAmt.value : "";
        delnotetrends001mb.febQty = this.f.febQty.value ? this.f.febQty.value : "";
        delnotetrends001mb.marAmt = this.f.marAmt.value ? this.f.marAmt.value : "";
        delnotetrends001mb.marQty = this.f.marQty.value ? this.f.marQty.value : "";
        delnotetrends001mb.aprAmt = this.f.aprAmt.value ? this.f.aprAmt.value : "";
        delnotetrends001mb.aprQty = this.f.aprQty.value ? this.f.aprQty.value : "";
        delnotetrends001mb.mayAmt = this.f.mayAmt.value ? this.f.mayAmt.value : "";
        delnotetrends001mb.mayQty = this.f.mayQty.value ? this.f.mayQty.value : "";
        delnotetrends001mb.junAmt = this.f.junAmt.value ? this.f.junAmt.value : "";
        delnotetrends001mb.junQty = this.f.junQty.value ? this.f.junQty.value : "";
        delnotetrends001mb.julAmt = this.f.julAmt.value ? this.f.julAmt.value : "";
        delnotetrends001mb.julQty = this.f.julQty.value ? this.f.julQty.value : "";
        delnotetrends001mb.augAmt = this.f.augAmt.value ? this.f.augAmt.value : "";
        delnotetrends001mb.augQty = this.f.augQty.value ? this.f.augQty.value : "";
        delnotetrends001mb.sepAmt = this.f.sepAmt.value ? this.f.sepAmt.value : "";
        delnotetrends001mb.sepQty = this.f.sepQty.value ? this.f.sepQty.value : "";
        delnotetrends001mb.octAmt = this.f.octAmt.value ? this.f.octAmt.value : "";
        delnotetrends001mb.octQty = this.f.octQty.value ? this.f.octQty.value : "";
        delnotetrends001mb.novAmt = this.f.novAmt.value ? this.f.novAmt.value : "";
        delnotetrends001mb.novQty = this.f.novQty.value ? this.f.novQty.value : "";
        delnotetrends001mb.decAmt = this.f.decAmt.value ? this.f.decAmt.value : "";
        delnotetrends001mb.decQty = this.f.decQty.value ? this.f.decQty.value : "";
        delnotetrends001mb.totalAmt = this.f.totalAmt.value ? this.f.totalAmt.value : "";
        delnotetrends001mb.totalQty = this.f.totalQty.value ? this.f.totalQty.value : "";
        delnotetrends001mb.augQtyt = this.f.augQtyt.value ? this.f.augQtyt.value : "";
        if (this.dntrendId) {
            delnotetrends001mb.dntrendId = this.dntrendId;
            delnotetrends001mb.insertUser = this.insertUser;
            delnotetrends001mb.insertDatetime = this.insertDatetime;
            delnotetrends001mb.updatedUser = this.authManager.getcurrentUser.username;
            delnotetrends001mb.updatedDatetime = new Date();
            this.delNoteTrendManager.updatedelnotetrend(delnotetrends001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let notes = deserialize<Delnotetrends001mb>(Delnotetrends001mb, response);
                for (let note of this.delNotes) {
                    if (note.dntrendId == notes.dntrendId) {
                        note.itemCode = notes.itemCode;
                        note.period = notes.period;
                        note.basedOn = notes.basedOn;
                        note.fiscalYear = notes.fiscalYear;
                        note.company = notes.company;
                        note.janAmt = notes.janAmt;
                        note.janQty = notes.janQty;
                        note.febAmt = notes.febAmt;
                        note.febQty = notes.febQty;
                        note.marAmt = notes.marAmt;
                        note.marQty = notes.marQty;
                        note.aprAmt = notes.aprAmt;
                        note.aprQty = notes.aprQty;
                        note.mayAmt = notes.mayAmt;
                        note.mayQty = notes.mayQty;
                        note.junAmt = notes.junAmt;
                        note.junQty = notes.junQty;
                        note.julAmt = notes.julAmt;
                        note.julQty = notes.julQty;
                        note.augAmt = notes.augAmt;
                        note.augQty = notes.augQty;
                        note.sepAmt = notes.sepAmt;
                        note.sepQty = notes.sepQty;
                        note.octAmt = notes.octAmt;
                        note.octQty = notes.octQty;
                        note.novAmt = notes.novAmt;
                        note.novQty = notes.novQty;
                        note.decAmt = notes.decAmt;
                        note.decQty = notes.decQty;
                        note.totalAmt = notes.totalAmt;
                        note.totalQty = notes.totalQty;
                        note.augQtyt = notes.augQtyt;
                        note.insertUser = this.insertUser;
                        note.insertDatetime = this.insertDatetime;
                        note.updatedUser = this.authManager.getcurrentUser.username;
                        note.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.delNotes);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.noteForm.reset();
                this.dntrendId = null;
                this.submitted = false;
            })
        }
        else {
            delnotetrends001mb.insertUser = this.authManager.getcurrentUser.username;
            delnotetrends001mb.insertDatetime = new Date();
            this.delNoteTrendManager.savedelnotetrend(delnotetrends001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let notes = deserialize<Delnotetrends001mb>(Delnotetrends001mb, response);
                this.delNotes.push(notes);
                const newItems = [JSON.parse(JSON.stringify(notes))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.noteForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.noteForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.delNoteTrendManager.delNoteTrendPdf().subscribe((response) => {
			saveAs(response, "DeliveryTrendList");

		});
	}

	onGenerateExcelReport() {
		this.delNoteTrendManager.delNoteTrendExcel().subscribe((response) => {
			saveAs(response, "DeliveryTrendList");
		});
	}
}