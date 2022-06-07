import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Communication001mb } from "../entities/Communication001mb";

@Injectable()
export class CrmCommunicationManager extends BaseService {

    private crmCommunicationUrl: string = `${environment.apiUrl}/crmcommunication`;

    allcrmcommunication() {
        return this.getCallService(`${this.crmCommunicationUrl}` + "/findAll");
    }
    crmcommunicationsave(communication001: Communication001mb) {
        return this.postCallService(`${this.crmCommunicationUrl}` + "/save", {}, communication001);
    }
    crmcommunicationupdate(communication001: Communication001mb) {
        return this.putCallService(`${this.crmCommunicationUrl}` + "/update", {}, communication001);
    }
    crmcommunicationdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.crmCommunicationUrl}` + "/delete", data);
    }

    crmCommunicationPdf() {
        return this.getCallService1(`${this.crmCommunicationUrl}` + "/pdf");
    }

    crmCommunicationExcel() {
        return this.getCallService1(`${this.crmCommunicationUrl}` + "/excel");
    }
}