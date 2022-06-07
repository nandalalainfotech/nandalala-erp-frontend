import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceLetterComponent } from './experience-letter/experience-letter.component';
import { JobApplicantComponent } from './job-applicant/job-applicant.component';
import { JobOpeningComponent } from './job-opening/job-opening.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { RecruitmentComponent } from './recruitment.component';
import { RelievingLetterComponent } from './relieving-letter/relieving-letter.component';

const routes: Routes = [
    {
        path: "",
        component: RecruitmentComponent,
        children: [
            {
                path: "app-job-opening",
                component: JobOpeningComponent
            },
            {
                path: "app-job-applicant",
                component: JobApplicantComponent
            },
            {
                path: "app-offer-letter",
                component: OfferLetterComponent
            },
            {
                path: "app-relieving-letter",
                component: RelievingLetterComponent
            },
            {
                path: "app-experience-letter",
                component: ExperienceLetterComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
