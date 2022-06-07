import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { JobOpeningComponent } from './job-opening/job-opening.component';
import { JobApplicantComponent } from './job-applicant/job-applicant.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { RelievingLetterComponent } from './relieving-letter/relieving-letter.component';
import { ExperienceLetterComponent } from './experience-letter/experience-letter.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruitmentComponent } from './recruitment.component';
import { AgGridModule } from 'ag-grid-angular';
import { ExperienceLetterManager } from 'src/app/shared/services/restcontroller/bizservice/experience-letter.service';
import { JobApplicantManager } from 'src/app/shared/services/restcontroller/bizservice/job-applicant.service';
import { JobOpeningManager } from 'src/app/shared/services/restcontroller/bizservice/job-opening.service';
import { RelievingLetterManager } from 'src/app/shared/services/restcontroller/bizservice/relieving-letter.service';
import { OfferLetterManager } from 'src/app/shared/services/restcontroller/bizservice/offer-letter.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        RecruitmentComponent,
        JobOpeningComponent,
        JobApplicantComponent,
        OfferLetterComponent,
        RelievingLetterComponent,
        ExperienceLetterComponent
    ],
    imports: [
        CommonModule,
        RecruitmentRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot()
        ,MatTabsModule
    ],
    providers: [
        ExperienceLetterManager,
        JobApplicantManager,
        JobOpeningManager,
        RelievingLetterManager,
        OfferLetterManager,
        DatePipe

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RecruitmentModule { }
