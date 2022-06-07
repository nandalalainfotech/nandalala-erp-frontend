import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Lead001mb } from "../entities/Lead001mb";

@Injectable()

export class LeadDetailsManager extends BaseService {

    private leadDetailsUrl: string = `${environment.apiUrl}/lead`

    alllead() {
        return this.getCallService(`${this.leadDetailsUrl}` + "/findAll");
    }

    savelead(lead001mb: Lead001mb) {
        return this.postCallService(`${this.leadDetailsUrl}` + "/save", {}, lead001mb);
    }

    leadupdate(lead001mb: Lead001mb) {
        return this.putCallService(`${this.leadDetailsUrl}` + "/update", {}, lead001mb);
    }

    deletelead(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.leadDetailsUrl}` + "/delete", data);
    }

    leadDetailsPdf() {
        return this.getCallService1(`${this.leadDetailsUrl}` + "/pdf");
    }

    leadDetailsExcel() {
        return this.getCallService1(`${this.leadDetailsUrl}` + "/excel");
    }
}