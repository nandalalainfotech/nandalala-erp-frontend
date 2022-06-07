import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerDetailManager } from 'src/app/shared/services/restcontroller/bizservice/customer-detail.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Customerdetails001mb } from 'src/app/shared/services/restcontroller/entities/Customerdetails001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

    frameworkComponents: any;
    costdetForm: FormGroup | any;
    id: number | any;
    customerid: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
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
    submitted = false;
    dummysystemproperties: Systemproperties001mb[] = [];
    customerDet: Customerdetails001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private customerDetailManager: CustomerDetailManager,
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
        this.costdetForm = this.formBuilder.group({
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
            isprimarycontact: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.customerDetailManager.allcustomerdetail().subscribe((response) => {
            this.customerDet = deserialize<Customerdetails001mb[]>(Customerdetails001mb, response);
            if (this.customerDet.length > 0) {
                this.gridOptions?.api?.setRowData(this.customerDet);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }

        })
    }

    get f() { return this.costdetForm.controls }

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
                headerName: 'Postal Code',
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
                resizable: true,
                suppressSizeToFit: true,
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
                width: 250,
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
                width: 250,
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
        this.costdetForm.patchValue({
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
            'isprimarycontact': params.data.isprimarycontact
        });
    }

    onDeleteButtonClick(params: any) {
        this.customerDetailManager.deletecustomerdetail(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.customerDet.length; i++) {
                if (this.customerDet[i].id == params.data.id) {
                    this.customerDet?.splice(i, 1);
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
        modalRef.componentInstance.title = "Customer Details";
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

    onOrderClick(event: any, costdetForm: any) {
        this.markFormGroupTouched(this.costdetForm);
        this.submitted = true;
        if (this.costdetForm.invalid) {
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
        customerdetails001mb.isprimaryaddress = this.f.isprimaryaddress.value  ? this.f.isprimarycontact.value : null;
        customerdetails001mb.isprimarycontact = this.f.isprimarycontact.value ? this.f.isprimarycontact.value : 0;
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
            this.customerDetailManager.updatecustomerdetail(customerdetails001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let customerdetails001mb = deserialize<Customerdetails001mb>(Customerdetails001mb, response);
                for (let customerDetails of this.customerDet) {
                    if (customerDetails.id == customerdetails001mb.id) {
                        customerDetails.addressline1 = customerdetails001mb.addressline1;
                        customerDetails.addressline2 = customerdetails001mb.addressline2;
                        customerDetails.city = customerdetails001mb.city;
                        customerDetails.country = customerdetails001mb.country;
                        customerDetails.customergroup = customerdetails001mb.customergroup;
                        customerDetails.customername = customerdetails001mb.customername;
                        customerDetails.emailid = customerdetails001mb.emailid;
                        customerDetails.firstname = customerdetails001mb.firstname;
                        customerDetails.isprimaryaddress = customerdetails001mb.isprimaryaddress;
                        customerDetails.isprimarycontact = customerdetails001mb.isprimarycontact;
                        customerDetails.lastname = customerdetails001mb.lastname;
                        customerDetails.mobilenumber = customerdetails001mb.mobilenumber;
                        customerDetails.phone = customerdetails001mb.phone;
                        customerDetails.postalcode = customerdetails001mb.postalcode;
                        customerDetails.state = customerdetails001mb.state;
                        customerDetails.customerid = customerdetails001mb.customerid;
                        customerDetails.insertUser = this.insertUser;
                        customerDetails.insertDatetime = this.insertDatetime;
                        customerDetails.updatedUser = this.authManager.getcurrentUser.username;
                        customerDetails.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.customerDet);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.costdetForm.reset();
                this.submitted = false;
                this.id = null;
            });
        }
        else {
            customerdetails001mb.insertUser = this.authManager.getcurrentUser.username;
            customerdetails001mb.insertDatetime = new Date();
            this.customerDetailManager.savecustomerdetail(customerdetails001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let customerdetails001mb = deserialize<Customerdetails001mb>(Customerdetails001mb, response);
                this.customerDet?.push(customerdetails001mb);
                const newItems = [JSON.parse(JSON.stringify(customerdetails001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.costdetForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.costdetForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.customerDetailManager.customerDetailPdf().subscribe((response) =>{
            saveAs(response,"CustomerDetail");

		});
	}

	onGenerateExcelReport(){
		this.customerDetailManager.customerDetailExcel().subscribe((response) => {
			saveAs(response,"CustomerDetail");
        })
	}

}