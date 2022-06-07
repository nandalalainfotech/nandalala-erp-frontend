import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/crm-lead-det.service';
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Leaddetail001mb } from 'src/app/shared/services/restcontroller/entities/Leaddetail001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Territory001mb } from 'src/app/shared/services/restcontroller/entities/Territory001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-crm-lead-details',
	templateUrl: './crm-lead-details.component.html',
	styleUrls: ['./crm-lead-details.component.css']
})
export class CrmLeadDetailsComponent implements OnInit {

	frameworkComponents: any;
	leadDetForm: FormGroup | any;
	submitted = false;
	leadId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	leadName: string = "";
	companyName: string = "";
	status: string = "";
	address: string = "";
	state: string = "";
	pinCode: number | any;
	country: string = "";
	phone: number | any;
	mobileNo: number | any;
	email: string = "";
	leadOwner: string = "";
	terName: string = "";
	leadDetail: Leaddetail001mb[] = [];
	stname = "crms.status";
	sttype = "status";
	public gridOptions: GridOptions | any;
	tersystemproperties: Systemproperties001mb[] = [];
	statussystemproperties: Systemproperties001mb[] = [];
	territorys: Territory001mb[] = [];

	constructor(private leadDetailsManager: LeadDetailsManager, 
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

		this.leadDetForm = this.formBuilder.group({
			leadName: ['', Validators.required],
			companyName: ['', Validators.required],
			status: ['', Validators.required],
			address: ['', Validators.required],
			state: ['', Validators.required],
			pinCode: ['', Validators.required],
			country: ['', Validators.required],
			phone: ['', Validators.required],
			mobileNo: ['', Validators.required],
			email: ['', Validators.required],
			leadOwner: ['', Validators.required],
			terName: ['', Validators.required]
		})
		this.createDataGrid001();
		this.crmTerritoryManager.allterritory().subscribe((response) => {
			this.territorys = deserialize<Territory001mb[]>(Territory001mb, response);
		})
		this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
			this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.leadDetailsManager.allleadde().subscribe((response) => {
			this.leadDetail = deserialize<[]>(Leaddetail001mb, response);
			if (this.leadDetail.length > 0) {
				this.gridOptions?.api?.setRowData(this.leadDetail);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.leadDetForm.controls; }
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
				field: 'leadId',
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
				headerName: 'Lead Name',
				field: 'leadName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Company',
				field: 'companyName',
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
				headerName: 'Address',
				field: 'address',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'State',
				field: 'state',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'PinCode',
				field: 'pinCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Country',
				field: 'country',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Phone',
				field: 'phone',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Mobile No',
				field: 'mobileNo',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Email',
				field: 'email',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Lead Owner',
				field: 'leadOwner',
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
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 200,
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
				width: 255,
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
                width: 200,
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
		this.leadId = params.data.leadId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.leadDetForm.patchValue({
			'leadName': params.data.leadName,
			'companyName': params.data.companyName,
			'status': params.data.status,
			'address': params.data.address,
			'state': params.data.state,
			'pinCode': params.data.pinCode,
			'country': params.data.country,
			'phone': params.data.phone,
			'mobileNo': params.data.mobileNo,
			'email': params.data.email,
			'leadOwner': params.data.leadOwner,
			'terName': params.data.terName,
		});
	}

	onDeleteButtonClick(params: any) {
		this.leadDetailsManager.leaddedelete(params.data.leadId).subscribe((response) => {
			for (let i = 0; i < this.leadDetail.length; i++) {
				if (this.leadDetail[i].leadId == params.data.leadId) {
					this.leadDetail?.splice(i, 1);
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
        modalRef.componentInstance.title = "Lead Details";
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


	onOrderClick(event: any, leadDetForm: any) {
		this.markFormGroupTouched(this.leadDetForm);
		this.submitted = true;

		// stop here if form is invalid
		if (this.leadDetForm.invalid) {
			return;
		}
		let leaddetail001mb = new Leaddetail001mb();
		leaddetail001mb.address = this.f.address.value ? this.f.address.value : "";
		leaddetail001mb.companyName = this.f.companyName.value ? this.f.companyName.value : "";
		leaddetail001mb.country = this.f.country.value ? this.f.country.value : "";
		leaddetail001mb.email = this.f.email.value ? this.f.email.value : "";
		leaddetail001mb.leadName = this.f.leadName.value ? this.f.leadName.value : "";
		leaddetail001mb.leadOwner = this.f.leadOwner.value ? this.f.leadOwner.value : "";
		leaddetail001mb.mobileNo = this.f.mobileNo.value ? this.f.mobileNo.value : 0;
		leaddetail001mb.phone = this.f.phone.value ? this.f.phone.value : 0;
		leaddetail001mb.pinCode = this.f.pinCode.value ? this.f.pinCode.value : 0;
		leaddetail001mb.state = this.f.state.value ? this.f.state.value : "";
		leaddetail001mb.status = this.f.status.value ? this.f.status.value : "";
		leaddetail001mb.terName = this.f.terName.value ? this.f.terName.value : "";
		if (this.leadId) {
			leaddetail001mb.leadId = this.leadId;
			leaddetail001mb.insertUser = this.insertUser;
            leaddetail001mb.insertDatetime = this.insertDatetime;
            leaddetail001mb.updatedUser = this.authManager.getcurrentUser.username;
            leaddetail001mb.updatedDatetime = new Date();
			this.leadDetailsManager.leaddeupdate(leaddetail001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let leaddetres = deserialize<Leaddetail001mb>(Leaddetail001mb, response);
				for (let leaddet of this.leadDetail) {
					if (leaddet.leadId == leaddetres.leadId) {
						leaddet.address = leaddetres.address;
						leaddet.companyName = leaddetres.companyName;
						leaddet.country = leaddetres.country;
						leaddet.email = leaddetres.email;
						leaddet.leadName = leaddetres.leadName;
						leaddet.leadOwner = leaddetres.leadOwner;
						leaddet.mobileNo = leaddetres.mobileNo;
						leaddet.phone = leaddetres.phone;
						leaddet.pinCode = leaddetres.pinCode;
						leaddet.state = leaddetres.state;
						leaddet.status = leaddetres.status;
						leaddet.terName = leaddetres.terName;
					}
				}
				this.gridOptions.api.setRowData(this.leadDetail);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.leadDetForm.reset();
				this.submitted = false;
				this.leadId = null;
			})
		}
		else {
			leaddetail001mb.insertUser = this.authManager.getcurrentUser.username;
            leaddetail001mb.insertDatetime = new Date();
			this.leadDetailsManager.leaddesave(leaddetail001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let lead = deserialize<Leaddetail001mb>(Leaddetail001mb, response);
				this.leadDetail.push(lead);
				const newItems = [JSON.parse(JSON.stringify(lead))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.leadDetForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.leadDetForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.leadDetailsManager.leadDetailsPdf().subscribe((response) =>{
            saveAs(response,"LeadDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.leadDetailsManager.leadDetailsExcel().subscribe((response) => {
			saveAs(response,"LeadDetailsList");
        })
	}
}
