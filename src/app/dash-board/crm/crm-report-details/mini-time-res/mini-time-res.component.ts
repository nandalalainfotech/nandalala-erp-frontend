import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MiniTimeresManager } from 'src/app/shared/services/restcontroller/bizservice/crm-rep-minitimeres.service';
import { Crmmintoresp001mb } from 'src/app/shared/services/restcontroller/entities/Crmmintoresp001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-mini-time-res',
	templateUrl: './mini-time-res.component.html',
	styleUrls: ['./mini-time-res.component.css']
})
export class MiniTimeResComponent implements OnInit {
	@ViewChild('miniTime') miniTime: NgForm | any;

	frameworkComponents: any;
	miniTimeForm: FormGroup | any;
	submitted = false;
	mrpId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	date!: Date | null;
	mintoresp: string = "";
	crmmintoresp: Crmmintoresp001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private minitimeresManager: MiniTimeresManager, 
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
		this.miniTimeForm = this.formBuilder.group({
			date: ['', Validators.required],
			mintoresp: ['', Validators.required],
		})

		this.createDataGrid001();
		this.minitimeresManager.allminitime().subscribe((response) => {
			this.crmmintoresp = deserialize<Crmmintoresp001mb[]>(Crmmintoresp001mb, response);
			if (this.crmmintoresp.length > 0) {
				this.gridOptions?.api?.setRowData(this.crmmintoresp);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.miniTimeForm.controls; }

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
				field: 'mrpId',
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
				headerName: 'Date',
				field: 'date',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.date ? this.datePipe.transform(params.data.date, 'MM/dd/yyyy') : '';
				}

			},
			{
				headerName: 'Minimal Time Response(Minutes)',
				field: 'mintoresp',
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
		this.mrpId = params.data.mrpId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.miniTimeForm.patchValue({
			'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
			'mintoresp': params.data.mintoresp,
		});
	}

	onDeleteButtonClick(params: any) {
		this.minitimeresManager.minitimedelete(params.data.mrpId).subscribe((response) => {
			for (let i = 0; i < this.crmmintoresp.length; i++) {
				if (this.crmmintoresp[i].mrpId == params.data.mrpId) {
					this.crmmintoresp?.splice(i, 1);
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
        modalRef.componentInstance.title = "Minimum Time Response";
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

	onOrderClick(event: any, miniTimeForm: any) {
		this.markFormGroupTouched(this.miniTimeForm);
		this.submitted = true;
		if (this.miniTimeForm.invalid) {
			return;
		}
		let crmmintoresp001 = new Crmmintoresp001mb();
		crmmintoresp001.date = new Date(this.f.date.value);
		crmmintoresp001.mintoresp = this.f.mintoresp.value ? this.f.mintoresp.value : "";
		if (this.mrpId) {
			crmmintoresp001.mrpId = this.mrpId;
			crmmintoresp001.insertUser = this.insertUser;
            crmmintoresp001.insertDatetime = this.insertDatetime;
            crmmintoresp001.updatedUser = this.authManager.getcurrentUser.username;
            crmmintoresp001.updatedDatetime = new Date();
			this.minitimeresManager.minitimeupdate(crmmintoresp001).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let mintimeres = deserialize<Crmmintoresp001mb>(Crmmintoresp001mb, response);
				for (let mintime of this.crmmintoresp) {
					if (mintime.mrpId == mintimeres.mrpId) {
						mintime.date = mintimeres.date;
						mintime.mintoresp = mintimeres.mintoresp;
						mintime.insertUser = this.insertUser;
						mintime.insertDatetime = this.insertDatetime;
						mintime.updatedUser = this.authManager.getcurrentUser.username;
						mintime.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.crmmintoresp);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.miniTimeForm.reset();
				this.submitted = false;
				this.mrpId = " ";
			})
		}
		else {
			crmmintoresp001.insertUser = this.authManager.getcurrentUser.username;
            crmmintoresp001.insertDatetime = new Date();
			this.minitimeresManager.minitimesave(crmmintoresp001).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let mini = deserialize<Crmmintoresp001mb>(Crmmintoresp001mb, response);
				this.crmmintoresp.push(mini);
				const newItems = [JSON.parse(JSON.stringify(mini))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.miniTimeForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.miniTimeForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.minitimeresManager.minitimeresPdf().subscribe((response) =>{
            saveAs(response,"MinimalTimeResponseList");

		});
	}

	onGenerateExcelReport(){
		this.minitimeresManager.minitimeresExcel().subscribe((response) => {
			saveAs(response,"MinimalTimeResponseList");
        })
	}

}
