import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { InactiveCustomerManager } from 'src/app/shared/services/restcontroller/bizservice/crm-rep-inactivecust.service';
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Inactivecust001mb } from 'src/app/shared/services/restcontroller/entities/Inactivecust001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Territory001mb } from 'src/app/shared/services/restcontroller/entities/Territory001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-inactive-customers',
	templateUrl: './inactive-customers.component.html',
	styleUrls: ['./inactive-customers.component.css']
})
export class InactiveCustomersComponent implements OnInit {

	frameworkComponents: any;
	inActForm: FormGroup | any;
	submitted = false;
	inactcustId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	custType: string = "";
	customername: string = "";
	terName: string = "";
	customergroup: string = "";
	numoforder: string = "";
	totalordval: string | null = "";
	totalordcons: string | null = "";
	lastordamt: string | null = "";
	lastorddate!: Date | null;
	daysinlstord: string | null = "";
	inactive: Inactivecust001mb[] = [];
	custname = "Inactivecust.Type";
	custtype = "Type";
	cusnname = "Dummy.status";
	cusntype = "dummy";
	tername = "Dummy.status";
	tertype = "dummy";
	grpname = "Dummy.status";
	grptype = "dummy";
	public gridOptions: GridOptions | any;
	cusnamesystemproperties: Systemproperties001mb[] = [];
	custypesystemproperties: Systemproperties001mb[] = [];
	tersystemproperties: Systemproperties001mb[] = [];
	grpsystemproperties: Systemproperties001mb[] = [];
	territorys: Territory001mb[] = [];

	constructor(private inactiveCustomerManager: InactiveCustomerManager, 
		private crmTerritoryManager: CrmTerritoryManager, 
		private systemPropertiesService: SystemPropertiesService, 
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder, 
		private datePipe: DatePipe,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.inActForm = this.formBuilder.group({
			custType: ['', Validators.required],
			customername: ['', Validators.required],
			terName: ['', Validators.required],
			customergroup: ['', Validators.required],
			numoforder: ['', Validators.required],
			totalordval: ['', Validators.required],
			totalordcons: ['', Validators.required],
			lastordamt: ['', Validators.required],
			lastorddate: ['', Validators.required],
			daysinlstord: ['', Validators.required],
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.custname, this.custtype).subscribe(response => {
			this.custypesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.cusnname, this.cusntype).subscribe(response => {
			this.cusnamesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.crmTerritoryManager.allterritory().subscribe((response) => {
			this.territorys = deserialize<Territory001mb[]>(Territory001mb, response);
		})
		this.systemPropertiesService.system(this.grpname, this.grptype).subscribe(response => {
			this.grpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.inactiveCustomerManager.allinact().subscribe((response) => {
			this.inactive = deserialize<Inactivecust001mb[]>(Inactivecust001mb, response);
			if (this.inactive.length > 0) {
				this.gridOptions?.api?.setRowData(this.inactive);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.inActForm.controls; }

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
				field: 'inactcustId',
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
				headerName: 'Customer Type',
				field: 'custType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Customer',
				field: 'customername',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Territory',
				field: 'terName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Customer Group',
				field: 'customergroup',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Number of Order',
				field: 'numoforder',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Order Value',
				field: 'totalordval',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Order Considered',
				field: 'totalordcons',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Last Ordered Amount',
				field: 'lastordamt',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Last Ordered Date',
				field: 'lastorddate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.lastorddate ? this.datePipe.transform(params.data.lastorddate, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'Days Last Ordered',
				field: 'daysinlstord',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.daysinlstord ? this.datePipe.transform(params.data.daysinlstord, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 150,
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
				width: 185,
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
                width: 155,
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
		this.inactcustId = params.data.inactcustId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.inActForm.patchValue({
			'custType': params.data.custType,
			'customername': params.data.customername,
			'terName': params.data.terName,
			'customergroup': params.data.customergroup,
			'numoforder': params.data.numoforder,
			'totalordval': params.data.totalordval,
			'totalordcons': params.data.totalordcons,
			'lastordamt': params.data.lastordamt,
			'lastorddate': this.datePipe.transform(params.data.lastorddate, 'MM/dd/yyyy'),
			'daysinlstord':this.datePipe.transform(params.data.daysinlstord, 'MM/dd/yyyy'),
		});

	}

	onDeleteButtonClick(params: any) {
		this.inactiveCustomerManager.inactdelete(params.data.inactcustId).subscribe((response) => {
			for (let i = 0; i < this.inactive.length; i++) {
				if (this.inactive[i].inactcustId == params.data.inactcustId) {
					this.inactive?.splice(i, 1);
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
        modalRef.componentInstance.title = "Inactive Customer";
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

	onOrderClick(event: any, inActForm: any) {
		this.markFormGroupTouched(this.inActForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.inActForm.invalid) {
			return;
		}
		let inactivecust = new Inactivecust001mb();
		inactivecust.custType = this.f.custType.value ? this.f.custType.value : "";
		inactivecust.customergroup = this.f.customergroup.value ? this.f.customergroup.value : "";
		inactivecust.customername = this.f.customername.value ? this.f.customername.value : "";
		inactivecust.daysinlstord = new Date(this.f.daysinlstord.value);
		inactivecust.lastordamt = this.f.lastordamt.value ? this.f.lastordamt.value : "";
		inactivecust.lastorddate = new Date(this.f.lastorddate.value);
		inactivecust.numoforder = this.f.numoforder.value ? this.f.numoforder.value : "";
		inactivecust.terName = this.f.terName.value ? this.f.terName.value : "";
		inactivecust.totalordcons = this.f.totalordcons.value ? this.f.totalordcons.value : "";
		inactivecust.totalordval = this.f.totalordval.value ? this.f.totalordval.value : "";
		if (this.inactcustId) {
			inactivecust.inactcustId = this.inactcustId;
			inactivecust.insertUser = this.insertUser;
            inactivecust.insertDatetime = this.insertDatetime;
            inactivecust.updatedUser = this.authManager.getcurrentUser.username;
            inactivecust.updatedDatetime = new Date();
			this.inactiveCustomerManager.inactupdate(inactivecust).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let inactivecusres = deserialize<Inactivecust001mb>(Inactivecust001mb, response);
				for (let inactcustomer of this.inactive) {
					if (inactcustomer.inactcustId == inactivecusres.inactcustId) {
						inactcustomer.custType = inactivecusres.custType;
						inactcustomer.customergroup = inactivecusres.customergroup;
						inactcustomer.customername = inactivecusres.customername;
						inactcustomer.daysinlstord = inactivecusres.daysinlstord;
						inactcustomer.lastordamt = inactivecusres.lastordamt;
						inactcustomer.lastorddate = inactivecusres.lastorddate;
						inactcustomer.numoforder = inactivecusres.numoforder;
						inactcustomer.terName = inactivecusres.terName;
						inactcustomer.totalordcons = inactivecusres.totalordcons;
						inactcustomer.totalordval = inactivecusres.totalordval;
						inactcustomer.insertUser = this.insertUser;
						inactcustomer.insertDatetime = this.insertDatetime;
						inactcustomer.updatedUser = this.authManager.getcurrentUser.username;
						inactcustomer.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.inactive);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.inActForm.reset();
				this.submitted = false;
				this.inactcustId = null;
			})
		}
		else {
			inactivecust.insertUser = this.authManager.getcurrentUser.username;
            inactivecust.insertDatetime = new Date();
			this.inactiveCustomerManager.inactsave(inactivecust).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let act = deserialize<Inactivecust001mb>(Inactivecust001mb, response);
				this.inactive.push(act);
				const newItems = [JSON.parse(JSON.stringify(act))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.inActForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.inActForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.inactiveCustomerManager.inactiveCustomerPdf().subscribe((response) =>{
            saveAs(response,"InactiveCustomersList");

		});
	}

	onGenerateExcelReport(){
		this.inactiveCustomerManager.inactiveCustomerExcel().subscribe((response) => {
			saveAs(response,"InactiveCustomersList");
        })
	}
}
