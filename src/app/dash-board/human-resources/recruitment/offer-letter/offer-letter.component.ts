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
import { OfferLetterManager } from 'src/app/shared/services/restcontroller/bizservice/offer-letter.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Recruitoffer001mb } from 'src/app/shared/services/restcontroller/entities/Recruitoffer001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-offer-letter',
    templateUrl: './offer-letter.component.html',
    styleUrls: ['./offer-letter.component.css']
})
export class OfferLetterComponent implements OnInit {

    offLetForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    offerId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemname: string = "Name.Prefix";
    itemtype: string = "Prefix";
    applicantNamePrefix: string = "";
    applicantName: string = "";
    companyName: string = "";
    offer: string = "";
    refer: string = "";
    position: string = "";
    grade: string = "";
    ctc: string = "";
    dateOfJoin!: Date | null;
    line1: string = "";
    line2: string = "";
    cityOrVillage: string = "";
    stateOrTerritory: string = "";
    country: string = "";
    postalCode: number | any;
    phoneNo: number | any;
    alternativePhoneNo: number | any;
    offerLetter: string = "";
    itsystemproperties?: Systemproperties001mb[] = [];
    offerLetters: Recruitoffer001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertyServeice: SystemPropertiesService,
        private offerLetterManager: OfferLetterManager,
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

        this.offLetForm = this.formBuilder.group({
            applicantNamePrefix: ['', Validators.required],
            applicantName: ['', Validators.required],
            companyName: ['', Validators.required],
            offer: ['', Validators.required],
            refer: ['', Validators.required],
            position: ['', Validators.required],
            grade: ['', Validators.required],
            ctc: ['', Validators.required],
            dateOfJoin: ['', Validators.required],
            line1: ['', Validators.required],
            line2: ['', Validators.required],
            cityOrVillage: ['', Validators.required],
            stateOrTerritory: ['', Validators.required],
            country: ['', Validators.required],
            postalCode: ['', Validators.required],
            phoneNo: ['', Validators.required],
            alternativePhoneNo: ['', Validators.required],
            offerLetter: ['', Validators.required],

        });

        this.createDataGrid001();
        this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.offerLetterManager.allofferletter().subscribe((response) => {
            this.offerLetters = deserialize<Recruitoffer001mb[]>(Recruitoffer001mb, response);
            this.gridOptions?.api?.setRowData(this.offerLetters);

            if (this.offerLetters.length > 0) {
                this.gridOptions?.api?.setRowData(this.offerLetters);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.offLetForm.controls; }

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
                headerName: 'Offer Id',
                field: 'offerId',
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
                headerName: 'Offer',
                field: 'offer',
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
                headerName: 'Refer',
                field: 'refer',
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
                headerName: 'CTC',
                field: 'ctc',
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
                headerName: 'Offer Letter Name',
                field: 'offerLetter',
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
                width: 150,
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
                width: 155,
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

        this.offerId = params.data.offerId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.offLetForm.patchValue({

            'applicantNamePrefix': params.data.applicantNamePrefix,
            'applicantName': params.data.applicantName,
            'companyName': params.data.companyName,
            'offer': params.data.offer,
            'refer': params.data.refer,
            'position': params.data.position,
            'grade': params.data.grade,
            'ctc': params.data.ctc,
            'dateOfJoin': this.datePipe.transform(params.data.dateOfJoin, 'MM/dd/yyyy'),
            'line1': params.data.line1,
            'line2': params.data.line2,
            'cityOrVillage': params.data.cityOrVillage,
            'stateOrTerritory': params.data.stateOrTerritory,
            'country': params.data.country,
            'postalCode': params.data.postalCode,
            'phoneNo': params.data.phoneNo,
            'alternativePhoneNo': params.data.alternativePhoneNo,
            'offerLetter': params.data.offerLetter,
        })
    }


    onDeleteButtonClick(params: any) {
        this.offerLetterManager.deleteofferletter(params.data.offerId).subscribe((response) => {
            for (let i = 0; i < this.offerLetters.length; i++) {
                if (this.offerLetters[i].offerId == params.data.offerId) {
                    this.offerLetters?.splice(i, 1);
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
        modalRef.componentInstance.title = "Offer Letter";
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

    onOrderClick(event: any, offLetForm: any) {

        this.markFormGroupTouched(this.offLetForm);
        this.submitted = true;
        if (this.offLetForm.invalid) {
            return;
        }

        let recruitoffer001mb = new Recruitoffer001mb();

        recruitoffer001mb.dateOfJoin = new Date(this.f.dateOfJoin.value);
        recruitoffer001mb.applicantNamePrefix = this.f.applicantNamePrefix.value ? this.f.applicantNamePrefix.value : "";
        recruitoffer001mb.applicantName = this.f.applicantName.value ? this.f.applicantName.value : "";
        recruitoffer001mb.companyName = this.f.companyName.value ? this.f.companyName.value : "";
        recruitoffer001mb.offer = this.f.offer.value ? this.f.offer.value : "";
        recruitoffer001mb.refer = this.f.refer.value ? this.f.refer.value : "";
        recruitoffer001mb.position = this.f.position.value ? this.f.position.value : "";
        recruitoffer001mb.grade = this.f.grade.value ? this.f.grade.value : "";
        recruitoffer001mb.ctc = this.f.ctc.value ? this.f.ctc.value : "";
        recruitoffer001mb.line1 = this.f.line1.value ? this.f.line1.value : "";
        recruitoffer001mb.line2 = this.f.line2.value ? this.f.line2.value : "";
        recruitoffer001mb.cityOrVillage = this.f.cityOrVillage.value ? this.f.cityOrVillage.value : "";
        recruitoffer001mb.stateOrTerritory = this.f.stateOrTerritory.value ? this.f.stateOrTerritory.value : "";
        recruitoffer001mb.country = this.f.country.value ? this.f.country.value : "";
        recruitoffer001mb.postalCode = this.f.postalCode.value ? this.f.postalCode.value : 0;
        recruitoffer001mb.phoneNo = this.f.phoneNo.value ? this.f.phoneNo.value : 0;
        recruitoffer001mb.alternativePhoneNo = this.f.alternativePhoneNo.value ? this.f.alternativePhoneNo.value : 0;
        recruitoffer001mb.offerLetter = this.f.offerLetter.value ? this.f.offerLetter.value : "";

        if (this.offerId) {
            recruitoffer001mb.offerId = this.offerId;
            recruitoffer001mb.insertUser = this.insertUser;
            recruitoffer001mb.insertDatetime = this.insertDatetime;
            recruitoffer001mb.updatedUser = this.authManager.getcurrentUser.username;
            recruitoffer001mb.updatedDatetime = new Date();
            this.offerLetterManager.updateofferletter(recruitoffer001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let offlets = deserialize<Recruitoffer001mb>(Recruitoffer001mb, response);
                for (let offerletterss of this.offerLetters) {
                    if (offerletterss.offerId == offlets.offerId) {
                        offerletterss.applicantNamePrefix = offlets.applicantNamePrefix;
                        offerletterss.applicantName = offlets.applicantName;
                        offerletterss.companyName = offlets.companyName;
                        offerletterss.offer = offlets.offer;
                        offerletterss.refer = offlets.refer;
                        offerletterss.position = offlets.position;
                        offerletterss.grade = offlets.grade;
                        offerletterss.ctc = offlets.ctc;
                        offerletterss.dateOfJoin = offlets.dateOfJoin;
                        offerletterss.line1 = offlets.line1;
                        offerletterss.line2 = offlets.line2;
                        offerletterss.cityOrVillage = offlets.cityOrVillage;
                        offerletterss.stateOrTerritory = offlets.stateOrTerritory;
                        offerletterss.country = offlets.country;
                        offerletterss.postalCode = offlets.postalCode;
                        offerletterss.phoneNo = offlets.phoneNo;
                        offerletterss.alternativePhoneNo = offlets.alternativePhoneNo;
                        offerletterss.offerLetter = offlets.offerLetter;
                        offerletterss.insertUser = this.insertUser;
                        offerletterss.insertDatetime = this.insertDatetime;
                        offerletterss.updatedUser = this.authManager.getcurrentUser.username;
                        offerletterss.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.offerLetters);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.offLetForm.reset();
                this.offerId = null;
                this.submitted = false;
            });
        } else {
            recruitoffer001mb.insertUser = this.authManager.getcurrentUser.username;
            recruitoffer001mb.insertDatetime = new Date();
            this.offerLetterManager.saveofferletter(recruitoffer001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let offlets = deserialize<Recruitoffer001mb>(Recruitoffer001mb, response);
                this.offerLetters?.push(offlets);
                const newItems = [JSON.parse(JSON.stringify(offlets))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.offLetForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.offLetForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.offerLetterManager.offerLetterPdf().subscribe((response) =>{
            saveAs(response,"AddOfferDetails");

		});
	}

	onGenerateExcelReport(){
		this.offerLetterManager.offerLetterExcel().subscribe((response) => {
			saveAs(response,"AddOfferDetails");
        })
	}


}
