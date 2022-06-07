import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Customerdetails001mb } from 'src/app/shared/services/restcontroller/entities/Customerdetails001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
	//  THIS REFER BY MASTER-CUSTOMER 

	frameworkComponents: any;
	customersForm: FormGroup | any;
	submitted = false;
	id: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	customerid: string = "";
	customername: string = "";
	customergroup: string = "";
	addressline1: string = "";
	addressline2: string = "";
	city: string = "";
	state: string = "";
	postalcode: number | any;
	country: string = "";
	isprimaryaddress: boolean | undefined;
	firstname: string = "";
	lastname: string = "";
	phone: number | any;
	mobilenumber: number | any;
	emailid: string = "";
	isprimarycontact: number | any;
	dummyname = "Dummy.status";
	dummytype = "dummy";
	public gridOptions: GridOptions | any;
	dummysystemproperties: Systemproperties001mb[] = [];
	customer: Customerdetails001mb[] = [];

	constructor(private customerManager: CustomerManager, 
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
		this.customersForm = this.formBuilder.group({
			customerid: ['', Validators.required],
			customername: ['', Validators.required],
			customergroup: ['', Validators.required],
			addressline1: ['', Validators.required],
			addressline2: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			postalcode: ['', Validators.required],
			country: ['', Validators.required],
			isprimaryaddress: ['', Validators.required],
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			phone: ['', Validators.required],
			mobilenumber: ['', Validators.required],
			emailid: ['', Validators.required],
			isprimarycontact: ['', Validators.required],
		})
		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.customerManager.allcustomer().subscribe((response) => {
			this.customer = deserialize<Customerdetails001mb[]>(Customerdetails001mb, response);
			if (this.customer.length > 0) {
				this.gridOptions?.api?.setRowData(this.customer);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.customersForm.controls; }

	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single', onFirstDataRendered: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: 'ID',
				field: 'id',
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
				headerName: 'Customer ID',
				field: 'customerid',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Customer Name',
				field: 'customername',
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
				headerName: 'Address Line 1',
				field: 'addressline1',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Address Line 2',
				field: 'addressline2',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'City',
				field: 'city',
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
				headerName: 'Postal',
				field: 'postalcode',
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
				headerName: 'Is Primary Address',
				field: 'isprimaryaddress',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				suppressSizeToFit: true,
				resizable: true,
				valueGetter: (param: any) => {
					return param.data.isprimaryaddress == 1 ? true : false;
				}
			},
			{
				headerName: 'First Name',
				field: 'firstname',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Last Name',
				field: 'lastname',
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
				headerName: 'Mobile Number',
				field: 'mobilenumber',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'EMail ID',
				field: 'emailid',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Is Primary Contact',
				field: 'isprimarycontact',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (param: any) => {
					return param.data.isprimarycontact == 1 ? true : false;
				}
			},
			{
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 250,
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
                width: 255,
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
		this.id = params.data.id;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.customersForm.patchValue({
			'customerid': params.data.customerid,
			'customername': params.data.customername,
			'customergroup': params.data.customergroup,
			'addressline1': params.data.addressline1,
			'addressline2': params.data.addressline2,
			'city': params.data.city,
			'state': params.data.state,
			'postalcode': params.data.postalcode,
			'country': params.data.country,
			'isprimaryaddress': params.data.isprimaryaddress,
			'firstname': params.data.firstname,
			'lastname': params.data.lastname,
			'phone': params.data.phone,
			'mobilenumber': params.data.mobilenumber,
			'emailid': params.data.emailid,
			'isprimarycontact': params.data.isprimarycontact,
		});
	}

	onDeleteButtonClick(params: any) {
		this.customerManager.customerdelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.customer.length; i++) {
				if (this.customer[i].customerid == params.data.id) {
					this.customer?.splice(i, 1);
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
        modalRef.componentInstance.title = "Customer";
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

	onOrderClick(event: any, customersForm: any) {
		this.markFormGroupTouched(this.customersForm);
		this.submitted = true;
		if (this.customersForm.invalid) {
			return;
		}
		let customerdetails001mb = new Customerdetails001mb();
		customerdetails001mb.addressline1 = this.f.addressline1.value ? this.f.addressline1.value : "";
		customerdetails001mb.addressline2 = this.f.addressline2.value ? this.f.addressline2.value : "";
		customerdetails001mb.city = this.f.city.value ? this.f.city.value : "";
		customerdetails001mb.country = this.f.country.value ? this.f.country.value : "";
		customerdetails001mb.customergroup = this.f.customergroup.value ? this.f.customergroup.value : "";
		customerdetails001mb.customername = this.f.customername.value ? this.f.customername.value : "";
		customerdetails001mb.emailid = this.f.emailid.value ? this.f.emailid.value : "";
		customerdetails001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
		customerdetails001mb.isprimaryaddress = this.f.isprimaryaddress.value ? this.f.isprimarycontact.value : null;
		customerdetails001mb.isprimarycontact = this.f.isprimarycontact.value ? this.f.isprimarycontact.value : null;
		customerdetails001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
		customerdetails001mb.mobilenumber = this.f.mobilenumber.value ? this.f.mobilenumber.value : null;
		customerdetails001mb.phone = this.f.phone.value ? this.f.phone.value : null;
		customerdetails001mb.postalcode = this.f.postalcode.value ? this.f.postalcode.value : null;
		customerdetails001mb.state = this.f.state.value ? this.f.state.value : "";
		customerdetails001mb.customerid = this.f.customerid.value ? this.f.customerid.value : "";
		if (this.id) {
			customerdetails001mb.id = this.id;
			customerdetails001mb.insertUser = this.insertUser;
            customerdetails001mb.insertDatetime = this.insertDatetime;
            customerdetails001mb.updatedUser = this.authManager.getcurrentUser.username;
            customerdetails001mb.updatedDatetime = new Date();
			this.customerManager.customerupdate(customerdetails001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let customerres = deserialize<Customerdetails001mb>(Customerdetails001mb, response);
				for (let crmcustomer of this.customer) {
					if (crmcustomer.id == customerres.id) {
						crmcustomer.addressline1 = customerres.addressline1;
						crmcustomer.addressline2 = customerres.addressline2;
						crmcustomer.city = customerres.city;
						crmcustomer.country = customerres.country;
						crmcustomer.customergroup = customerres.customergroup;
						crmcustomer.customername = customerres.customername;
						crmcustomer.customerid == customerres.customerid
						crmcustomer.emailid = customerres.emailid;
						crmcustomer.firstname = customerres.firstname;
						crmcustomer.isprimaryaddress = customerres.isprimaryaddress;
						crmcustomer.isprimarycontact = customerres.isprimarycontact;
						crmcustomer.lastname = customerres.lastname;
						crmcustomer.mobilenumber = customerres.mobilenumber;
						crmcustomer.phone = customerres.phone;
						crmcustomer.postalcode = customerres.postalcode;
						crmcustomer.state = customerres.state;
						crmcustomer.insertUser = this.insertUser;
						crmcustomer.insertDatetime = this.insertDatetime;
						crmcustomer.updatedUser = this.authManager.getcurrentUser.username;
						crmcustomer.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.customer);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.customersForm.reset();
				this.submitted = false;
				this.id = null;
			})
		}
		else {
			customerdetails001mb.insertUser = this.authManager.getcurrentUser.username;
            customerdetails001mb.insertDatetime = new Date();
			this.customerManager.customersave(customerdetails001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let customerdetails = deserialize<Customerdetails001mb>(Customerdetails001mb, response);
				this.customer.push(customerdetails);
				const newItems = [JSON.parse(JSON.stringify(customerdetails))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.customersForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.customersForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.customerManager.customerPdf().subscribe((response) =>{
            saveAs(response,"CustomerDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.customerManager.customerExcel().subscribe((response) => {
			saveAs(response,"CustomerDetailsList");
        })
	}
}
