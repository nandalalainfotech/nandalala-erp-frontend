import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Recruitopening001mb } from "../entities/Recruritopening001mb";


@Injectable()
export class JobOpeningManager extends BaseService {

    private jobOpeningUrl: string = `${environment.apiUrl}/jobopening`

    alljobopening() {
        return this.getCallService(`${this.jobOpeningUrl}`+"/findAll");
    }

    savejobopening(recruitopening001mb: Recruitopening001mb) {
        return this.postCallService(`${this.jobOpeningUrl}`+"/save", {}, recruitopening001mb);
    }

    updatejobopening(recruitopening001mb: Recruitopening001mb) {
        return this.putCallService(`${this.jobOpeningUrl}`+"/update", {}, recruitopening001mb);
    }

    deletejobopening(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.jobOpeningUrl}`+"/delete", data);
    }

    jobOpeningPdf() {
        return this.getCallService1(`${this.jobOpeningUrl}` + "/pdf");
    }

    jobOpeningExcel() {
        return this.getCallService1(`${this.jobOpeningUrl}` + "/excel");
    }


}
