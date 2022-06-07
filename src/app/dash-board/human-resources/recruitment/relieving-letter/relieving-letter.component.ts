import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { RelievingLetterManager } from 'src/app/shared/services/restcontroller/bizservice/relieving-letter.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Recruitrelieving001mb } from 'src/app/shared/services/restcontroller/entities/Recruitrelieving001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-relieving-letter',
	templateUrl: './relieving-letter.component.html',
	styleUrls: ['./relieving-letter.component.css']
})
export class RelievingLetterComponent implements OnInit {

	relievForm: FormGroup | any;
	submitted = false;

	frameworkComponents: any;
	relievingId: number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itemname: string = "Name.Prefix";
	itemtype: string = "Prefix";
	applicantNamePrefix: string = "";
	applicantName: string = "";
	companyName: string = "";
	position: string = "";
	grade: string = "";
	dateOfJoin!: Date | null;
	dateOfRelieve!: Date | null;
	line1: string = "";
	line2: string = "";
	cityOrVillage: string = "";
	stateOrTerritory: string = "";
	country: string = "";
	postalCode:number|any;
	phoneNo: number|any;
	alternativePhoneNo: number|any;
	relievingLetter: string = "";
	itsystemproperties?: Systemproperties001mb[] = [];
	relievinglLetters: Recruitrelieving001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private systemPropertyServeice: SystemPropertiesService,
		private relievingLetterManager: RelievingLetterManager,
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

		this.relievForm = this.formBuilder.group({
			applicantNamePrefix: ['', Validators.required],
			applicantName: ['', Validators.required],
			companyName: ['', Validators.required],
			position: ['', Validators.required],
			grade: ['', Validators.required],
			dateOfJoin: ['', Validators.required],
			dateOfRelieve: ['', Validators.required],
			line1: ['', Validators.required],
			line2: ['', Validators.required],
			cityOrVillage: ['', Validators.required],
			stateOrTerritory: ['', Validators.required],
			country: ['', Validators.required],
			postalCode: ['', Validators.required],
			phoneNo: ['', Validators.required],
			alternativePhoneNo: ['', Validators.required],
			relievingLetter: ['', Validators.required],

		});

		this.createDataGrid001();
		this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
			this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.relievingLetterManager.allrelievingletter().subscribe((Response) => {
			this.relievinglLetters = deserialize<Recruitrelieving001mb[]>(Recruitrelieving001mb, Response);

			if (this.relievinglLetters.length > 0) {
				this.gridOptions?.api?.setRowData(this.relievinglLetters);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.relievForm.controls; }

	createDataGrid001(): void {

		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRenderer: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: 'Relieving Id',
				field: 'relievingId',
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
				headerName: 'Prefix',
				field: 'applicantNamePrefix',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Applicant Name',
				field: 'applicantName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Company Name',
				field: 'companyName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Position',
				field: 'position',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Grade',
				field: 'grade',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Joining Date',
				field: 'dateOfJoin',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.dateOfJoin ? this.datePipe.transform(params.data.dateOfJoin, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Relieving Date',
				field: 'dateOfRelieve',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.dateOfRelieve ? this.datePipe.transform(params.data.dateOfRelieve, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Line 1',
				field: 'line1',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Line 2',
				field: 'line2',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'City/Village',
				field: 'cityOrVillage',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'State/Territory',
				field: 'stateOrTerritory',
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
				headerName: 'Postal Code',
				field: 'postalCode',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Phone No',
				field: 'phoneNo',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Alternative Phone No',
				field: 'alternativePhoneNo',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Relieving Letter Name',
				field: 'relievingLetter',
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
				}
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
				}
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

		this.relievingId = params.data.relievingId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.relievForm.patchValue({

			'applicantNamePrefix': params.data.applicantNamePrefix,
			'applicantName': params.data.applicantName,
			'companyName': params.data.companyName,
			'position': params.data.position,
			'grade': params.data.grade,
			'dateOfJoin': this.datePipe.transform(params.data.dateOfJoin, 'MM/dd/yyyy'),
			'dateOfRelieve': this.datePipe.transform(params.data.dateOfRelieve, 'MM/dd/yyyy'),
			'line1': params.data.line1,
			'line2': params.data.line2,
			'cityOrVillage': params.data.cityOrVillage,
			'stateOrTerritory': params.data.stateOrTerritory,
			'country': params.data.country,
			'postalCode': params.data.postalCode,
			'phoneNo': params.data.phoneNo,
			'alternativePhoneNo': params.data.alternativePhoneNo,
			'relievingLetter': params.data.relievingLetter,
		})
	}

	onDeleteButtonClick(params: any) {
		this.relievingLetterManager.deleterelievingletter(params.data.relievingId).subscribe((Responce) => {
			for (let i = 0; i < this.relievinglLetters.length; i++) {
				if (this.relievinglLetters[i].relievingId == params.data.relievingId) {
					this.relievinglLetters?.splice(i, 1);
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
        modalRef.componentInstance.title = "Relieving Letter";
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

	onOrderClick(event: any, relievForm: any) {

		this.markFormGroupTouched(this.relievForm);
		this.submitted = true;
		if (this.relievForm.invalid) {
			return;
		}

		let recruitrelieving001mb = new Recruitrelieving001mb();
		recruitrelieving001mb.dateOfJoin = new Date(this.f.dateOfJoin.value);
		recruitrelieving001mb.dateOfRelieve = new Date(this.f.dateOfRelieve.value);
		recruitrelieving001mb.applicantNamePrefix = this.f.applicantNamePrefix.value ? this.f.applicantNamePrefix.value : "";
		recruitrelieving001mb.applicantName = this.f.applicantName.value ? this.f.applicantName.value : "";
		recruitrelieving001mb.companyName = this.f.companyName.value ? this.f.companyName.value : "";
		recruitrelieving001mb.position = this.f.position.value ? this.f.position.value : "";
		recruitrelieving001mb.grade = this.f.grade.value ? this.f.grade.value : "";
		recruitrelieving001mb.line1 = this.f.line1.value ? this.f.line1.value : "";
		recruitrelieving001mb.line2 = this.f.line2.value ? this.f.line2.value : "";
		recruitrelieving001mb.cityOrVillage = this.f.cityOrVillage.value ? this.f.cityOrVillage.value : "";
		recruitrelieving001mb.stateOrTerritory = this.f.stateOrTerritory.value ? this.f.stateOrTerritory.value : "";
		recruitrelieving001mb.country = this.f.country.value ? this.f.country.value : "";
		recruitrelieving001mb.postalCode = this.f.postalCode.value ? this.f.postalCode.value : 0;
		recruitrelieving001mb.phoneNo = this.f.phoneNo.value ? this.f.phoneNo.value : 0;
		recruitrelieving001mb.alternativePhoneNo = this.f.alternativePhoneNo.value ? this.f.alternativePhoneNo.value : 0;
		recruitrelieving001mb.relievingLetter = this.f.relievingLetter.value ? this.f.relievingLetter.value : "";

		if (this.relievingId) {
			recruitrelieving001mb.relievingId = this.relievingId;
			recruitrelieving001mb.insertUser = this.insertUser;
            recruitrelieving001mb.insertDatetime = this.insertDatetime;
            recruitrelieving001mb.updatedUser = this.authManager.getcurrentUser.username;
            recruitrelieving001mb.updatedDatetime = new Date();
			this.relievingLetterManager.updaterelievingletter(recruitrelieving001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let relievs = deserialize<Recruitrelieving001mb>(Recruitrelieving001mb, response);
				for (let relievletterss of this.relievinglLetters) {
					if (relievletterss.relievingId == relievs.relievingId) {
						relievletterss.applicantNamePrefix = relievs.applicantNamePrefix;
						relievletterss.applicantName = relievs.applicantName;
						relievletterss.companyName = relievs.companyName;
						relievletterss.position = relievs.position;
						relievletterss.grade = relievs.grade;
						relievletterss.position = relievs.position;
						relievletterss.grade = relievs.grade;
						relievletterss.dateOfJoin = relievs.dateOfJoin;
						relievletterss.dateOfRelieve = relievs.dateOfRelieve;
						relievletterss.line1 = relievs.line1;
						relievletterss.line2 = relievs.line2;
						relievletterss.cityOrVillage = relievs.cityOrVillage;
						relievletterss.stateOrTerritory = relievs.stateOrTerritory;
						relievletterss.country = relievs.country;
						relievletterss.postalCode = relievs.postalCode;
						relievletterss.phoneNo = relievs.phoneNo;
						relievletterss.alternativePhoneNo = relievs.alternativePhoneNo;
						relievletterss.relievingLetter = relievs.relievingLetter;
						relievletterss.insertUser = this.insertUser;
						relievletterss.insertDatetime = this.insertDatetime;
						relievletterss.updatedUser = this.authManager.getcurrentUser.username;
						relievletterss.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.relievinglLetters);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.relievForm.reset();
				this.relievingId = null;
				this.submitted = false;
			});

		} else {
			recruitrelieving001mb.insertUser = this.authManager.getcurrentUser.username;
            recruitrelieving001mb.insertDatetime = new Date();
			this.relievingLetterManager.saverelievingletter(recruitrelieving001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let relievs = deserialize<Recruitrelieving001mb>(Recruitrelieving001mb, response);
				this.relievinglLetters?.push(relievs);
				const newItems = [JSON.parse(JSON.stringify(relievs))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.relievForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.relievForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.relievingLetterManager.offerLetterPdf().subscribe((response) =>{
            saveAs(response,"AddRelievingDetails");

		});
	}

	onGenerateExcelReport(){
		this.relievingLetterManager.offerLetterExcel().subscribe((response) => {
			saveAs(response,"AddRelievingDetails");
        })
	}

}