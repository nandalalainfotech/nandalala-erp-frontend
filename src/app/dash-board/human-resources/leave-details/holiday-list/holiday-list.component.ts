import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { HolidayListManager } from 'src/app/shared/services/restcontroller/bizservice/holiday-list.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Holidaylist001mb } from 'src/app/shared/services/restcontroller/entities/Holidaylist001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-holiday-list',
    templateUrl: './holiday-list.component.html',
    styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {


    frameworkComponents: any;
    holistForm: FormGroup | any;
    hlistId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    holidayName: string = "";
    weeklyOff: string | null = "";
    weekname = "Holiday.Week";
    weektype = "Week";
    submitted = false;
    public gridOptions: GridOptions | any;
    weeksystemproperties: Systemproperties001mb[] = [];
    holidayList: Holidaylist001mb[] = [];

    constructor(private holidayListManager: HolidayListManager,
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
        this.holistForm = this.formBuilder.group({
            holidayName: ['', Validators.required],
            weeklyOff: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.weekname, this.weektype).subscribe(response => {
            this.weeksystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.holidayListManager.allholiday().subscribe((response) => {
            this.holidayList = deserialize<Holidaylist001mb[]>(Holidaylist001mb, response);
            if (this.holidayList.length > 0) {
                this.gridOptions?.api?.setRowData(this.holidayList);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.holistForm.controls }

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
                field: 'hlistId',
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
                headerName: 'Holiday Name',
                field: 'holidayName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Weekly_Off',
                field: 'weeklyOff',
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
        this.hlistId = params.data.hlistId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.holistForm.patchValue({
            'holidayName': params.data.holidayName,
            'weeklyOff': params.data.weeklyOff
        });
    }

    onDeleteButtonClick(params: any) {
        this.holidayListManager.holidaydelete(params.data.hlistId).subscribe((response) => {
            for (let i = 0; i < this.holidayList.length; i++) {
                if (this.holidayList[i].hlistId == params.data.hlistId) {
                    this.holidayList?.splice(i, 1);
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
        modalRef.componentInstance.title = "Holiday List";
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

    onOrderClick(event: any, holistForm: any) {
        this.markFormGroupTouched(this.holistForm);
        this.submitted = true;
        if (this.holistForm.invalid) {
            return;
        }
        let holidaylist001mb = new Holidaylist001mb();
        holidaylist001mb.holidayName = this.f.holidayName.value ? this.f.holidayName.value : "";
        holidaylist001mb.weeklyOff = this.f.weeklyOff.value ? this.f.weeklyOff.value : "";
        if (this.hlistId) {
            holidaylist001mb.hlistId = this.hlistId;
            holidaylist001mb.insertUser = this.insertUser;
            holidaylist001mb.insertDatetime = this.insertDatetime;
            holidaylist001mb.updatedUser = this.authManager.getcurrentUser.username;
            holidaylist001mb.updatedDatetime = new Date();
            this.holidayListManager.holidaysave(holidaylist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let holi = deserialize<Holidaylist001mb>(Holidaylist001mb, response);
                for (let holiday of this.holidayList) {
                    if (holiday.hlistId == holi.hlistId) {
                        holiday.holidayName = holi.holidayName;
                        holiday.weeklyOff = holi.weeklyOff;
                        holiday.insertUser = this.insertUser;
                        holiday.insertDatetime = this.insertDatetime;
                        holiday.updatedUser = this.authManager.getcurrentUser.username;
                        holiday.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.holidayList);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.holistForm.reset();
                this.submitted = false;
                this.hlistId = null;
            });
        }
        else {
            holidaylist001mb.insertUser = this.authManager.getcurrentUser.username;
            holidaylist001mb.insertDatetime = new Date();
            this.holidayListManager.holidaysave(holidaylist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let holi = deserialize<Holidaylist001mb>(Holidaylist001mb, response);
                this.holidayList?.push(holi);
                const newItems = [JSON.parse(JSON.stringify(holi))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.holistForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.holistForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.holidayListManager.holidayListPdf().subscribe((response) =>{
            saveAs(response,"AddHolidayList");

		});
	}

	onGenerateExcelReport(){
		this.holidayListManager.holidayListExcel().subscribe((response) => {
			saveAs(response,"AddHolidayList");
        })
	}
}