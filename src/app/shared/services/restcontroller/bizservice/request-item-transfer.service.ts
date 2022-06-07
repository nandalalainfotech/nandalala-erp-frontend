import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Reqitemtransfer001mb } from "../entities/Reqitemtransfer001mb";

@Injectable()
export class RequestItemTransferManager extends BaseService {

    private requestItemTransferUrl: string = `${environment.apiUrl}/reqtransfer`

    allreqtransfer() {
        return this.getCallService(`${this.requestItemTransferUrl}` + "/findAll");
    }
    reqtransfersave(reqitemtransfer001mb: Reqitemtransfer001mb) {
        return this.postCallService(`${this.requestItemTransferUrl}` + "/save", {}, reqitemtransfer001mb);
    }
    reqtransferupdate(reqitemtransfer001mb: Reqitemtransfer001mb) {
        return this.putCallService(`${this.requestItemTransferUrl}` + "/update", {}, reqitemtransfer001mb);
    }
    reqtransferdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.requestItemTransferUrl}` + "/delete", data);
    }

    requestItemTransferPdf() {
        return this.getCallService1(`${this.requestItemTransferUrl}` + "/pdf");
    }

    requestItemTransferExcel() {
        return this.getCallService1(`${this.requestItemTransferUrl}` + "/excel");
    }

}