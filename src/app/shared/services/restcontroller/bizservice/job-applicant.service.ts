import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Recruitapplicant001mb } from "../entities/Recruitapplicant001mb";


@Injectable()
export class JobApplicantManager extends BaseService {

    private jobApplicantUrl: string = `${environment.apiUrl}/jobapp`

    alljobapplicant() {
        return this.getCallService(`${this.jobApplicantUrl}`+"/findAll");
    }

    savejobapplicant(recruitapplicant001mb: Recruitapplicant001mb) {
        return this.postCallService(`${this.jobApplicantUrl}`+"/save", {}, recruitapplicant001mb);
    }

    updatejobapplicant(recruitapplicant001mb:Recruitapplicant001mb) {
        return this.putCallService(`${this.jobApplicantUrl}`+"/update", {}, recruitapplicant001mb);
    }

    deletejobapplicant(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.jobApplicantUrl}`+"/delete", data);
    }
    jobApplicantPdf() {
        return this.getCallService1(`${this.jobApplicantUrl}` + "/pdf");
    }

    jobApplicantExcel() {
        return this.getCallService1(`${this.jobApplicantUrl}` + "/excel");
    }

}