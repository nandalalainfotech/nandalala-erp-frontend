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
import { ExperienceLetterManager } from 'src/app/shared/services/restcontroller/bizservice/experience-letter.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Recruitworkingexperience001mb } from 'src/app/shared/services/restcontroller/entities/Recruitworkingexperience001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-experience-letter',
	templateUrl: './experience-letter.component.html',
	styleUrls: ['./experience-letter.component.css']
})

export class ExperienceLetterComponent implements OnInit {

	wrkExpForm: FormGroup | any;
	submitted = false;

	workingexperienceId: number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	frameworkComponents: any;
	itemname: string = "Name.Prefix";
	itemtype: string = "Prefix";
	applicantNamePrefix: string = "";
	applicantName: string = "";
	companyName: string = "";
	position: string = "";
	grade: string = "";
	dateOfJoin!: Date | null;
	dateOfRelieve!: Date | null;
	workingexperienceLetter: string = "";
	public gridOptions: GridOptions | any;
	itsystemproperties?: Systemproperties001mb[] = [];
	workExp: Recruitworkingexperience001mb[] = [];

	constructor(private systemPropertyServeice: SystemPropertiesService,
		private experienceLetterManager: ExperienceLetterManager,
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
		this.wrkExpForm = this.formBuilder.group({
			applicantNamePrefix: ['', Validators.required],
			applicantName: ['', Validators.required],
			companyName: ['', Validators.required],
			position: ['', Validators.required],
			grade: ['', Validators.required],
			dateOfJoin: ['', Validators.required],
			dateOfRelieve: ['', Validators.required],
			workingexperienceLetter: ['', Validators.required],
		});

		this.createDataGrid001();
		this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
			this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.experienceLetterManager.allwrkexp().subscribe((response) => {
			this.workExp = deserialize<Recruitworkingexperience001mb[]>(Recruitworkingexperience001mb, response);
			if (this.workExp.length > 0) {
				this.gridOptions?.api?.setRowData(this.workExp);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.wrkExpForm.controls; }

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
				headerName: 'Working Experience Id',
				field: 'workingexperienceId',
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
                    return params.data.dateOfJoin ? this.datePipe.transform(params.data.dateOfJoin, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Working Experience Letter Name',
				field: 'workingexperienceLetter',
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

		this.workingexperienceId = params.data.workingexperienceId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.wrkExpForm.patchValue({
			'applicantNamePrefix': params.data.applicantNamePrefix,
			'applicantName': params.data.applicantName,
			'companyName': params.data.companyName,
			'position': params.data.position,
			'grade': params.data.grade,
			'dateOfJoin': this.datePipe.transform(params.data.dateOfJoin, 'MM/dd/yyyy'),
			'dateOfRelieve': this.datePipe.transform(params.data.dateOfRelieve, 'MM/dd/yyyy'),
			'workingexperienceLetter': params.data.workingexperienceLetter,
		})
	}

	onDeleteButtonClick(params: any) {
		this.experienceLetterManager.deletewrkexp(params.data.workingexperienceId).subscribe((response) => {
			for (let i = 0; i < this.workExp.length; i++) {
				if (this.workExp[i].workingexperienceId == params.data.workingexperienceId) {
					this.workExp?.splice(i, 1);
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
        modalRef.componentInstance.title = "Experience Letter";
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

	onOrderClick(event: any, wrkExpForm: any) {

		this.markFormGroupTouched(this.wrkExpForm);
		this.submitted = true;
		if (this.wrkExpForm.invalid) {
			return;
		}

		let recruitworkingexperience001mb = new Recruitworkingexperience001mb();
		recruitworkingexperience001mb.dateOfJoin =  new Date(this.f.dateOfJoin.value);
		recruitworkingexperience001mb.dateOfRelieve =  new Date(this.f.dateOfRelieve.value);
		recruitworkingexperience001mb.applicantNamePrefix = this.f.applicantNamePrefix.value ? this.f.applicantNamePrefix.value : "";
		recruitworkingexperience001mb.applicantName = this.f.applicantName.value ? this.f.applicantName.value : "";
		recruitworkingexperience001mb.companyName = this.f.companyName.value ? this.f.companyName.value : "";
		recruitworkingexperience001mb.position = this.f.position.value ? this.f.position.value : "";
		recruitworkingexperience001mb.grade = this.f.grade.value ? this.f.grade.value : "";
		recruitworkingexperience001mb.workingexperienceLetter = this.f.workingexperienceLetter.value ? this.f.workingexperienceLetter.value : "";

		if (this.workingexperienceId) {
			recruitworkingexperience001mb.workingexperienceId = this.workingexperienceId;
			recruitworkingexperience001mb.insertUser = this.insertUser;
            recruitworkingexperience001mb.insertDatetime = this.insertDatetime;
            recruitworkingexperience001mb.updatedUser = this.authManager.getcurrentUser.username;
            recruitworkingexperience001mb.updatedDatetime = new Date();
			this.experienceLetterManager.updatewrkexp(recruitworkingexperience001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let recruitworkingexperience001mb = deserialize<Recruitworkingexperience001mb>(Recruitworkingexperience001mb, response);
				for (let wrkexps of this.workExp) {
					if (wrkexps.workingexperienceId == recruitworkingexperience001mb.workingexperienceId) {
						wrkexps.applicantNamePrefix = recruitworkingexperience001mb.applicantNamePrefix;
						wrkexps.applicantName = recruitworkingexperience001mb.applicantName;
						wrkexps.companyName = recruitworkingexperience001mb.companyName;
						wrkexps.position = recruitworkingexperience001mb.position;
						wrkexps.grade = recruitworkingexperience001mb.grade;
						wrkexps.dateOfJoin = recruitworkingexperience001mb.dateOfJoin;
						wrkexps.dateOfRelieve = recruitworkingexperience001mb.dateOfRelieve;
						wrkexps.workingexperienceLetter = recruitworkingexperience001mb.workingexperienceLetter;
						wrkexps.insertUser = this.insertUser;
						wrkexps.insertDatetime = this.insertDatetime;
						wrkexps.updatedUser = this.authManager.getcurrentUser.username;
						wrkexps.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.workExp);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.wrkExpForm.reset();
				this.workingexperienceId =null;
				this.submitted = false;
			});
		} else {
			recruitworkingexperience001mb.insertUser = this.authManager.getcurrentUser.username;
            recruitworkingexperience001mb.insertDatetime = new Date();
			this.experienceLetterManager.savewrkexp(recruitworkingexperience001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let wrkexps = deserialize<Recruitworkingexperience001mb>(Recruitworkingexperience001mb, response);
				this.workExp?.push(wrkexps);
				const newItems = [JSON.parse(JSON.stringify(wrkexps))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.wrkExpForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.wrkExpForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.experienceLetterManager.experienceLetterPdf().subscribe((response) =>{
            saveAs(response,"AddWorkingExperienceDetails");

		});
	}

	onGenerateExcelReport(){
		this.experienceLetterManager.experienceLetterExcel().subscribe((response) => {
			saveAs(response,"AddWorkingExperienceDetails");
        })
	}

}
