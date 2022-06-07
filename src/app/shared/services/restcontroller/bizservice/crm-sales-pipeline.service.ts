import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Crmsplead001mb } from "../entities/Crmsplead001mb";

@Injectable()

export class CrmSalesPipelineManager extends BaseService {

    private crmSalesPipelineUrl: string = `${environment.apiUrl}/salespipe`;
    
    allslpipe() {
        return this.getCallService(`${this.crmSalesPipelineUrl}`+"/findAll");
    }

    savesalespipeline(crmsplead001mb: Crmsplead001mb) {
        return this.postCallService(`${this.crmSalesPipelineUrl}`+"/save", {}, crmsplead001mb);
    }

    updatesalespipeline(crmsplead001mb: Crmsplead001mb) {
        return this.putCallService(`${this.crmSalesPipelineUrl}`+"/update", {}, crmsplead001mb);
    }

    deletesalespipeline(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.crmSalesPipelineUrl}`+"/delete", data);
    }

    crmSalesPipelinePdf() {
        return this.getCallService1(`${this.crmSalesPipelineUrl}` + "/pdf");
    }

    customerBalanceExcel() {
        return this.getCallService1(`${this.crmSalesPipelineUrl}` + "/excel");
    }

}