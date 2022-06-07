import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itempricereport001mb } from "../entities/Itempricereport001mb";

@Injectable()
export class ItemPriceReportManager extends BaseService {

    private itemPriceReportUrl: string = `${environment.apiUrl}/pricereport`

    allpricereport() {
        return this.getCallService(`${this.itemPriceReportUrl}` + "/findAll");
    }
    pricereportsave(itempricereport001mb: Itempricereport001mb) {
        return this.postCallService(`${this.itemPriceReportUrl}` + "/save", {}, itempricereport001mb);
    }
    pricereportupdate(itempricereport001mb: Itempricereport001mb) {
        return this.putCallService(`${this.itemPriceReportUrl}` + "/update", {}, itempricereport001mb);
    }
    pricereportdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemPriceReportUrl}` + "/delete", data);
    }

    itemPriceReportPdf() {
        return this.getCallService1(`${this.itemPriceReportUrl}` + "/pdf");
    }

    itemPriceReportExcel() {
        return this.getCallService1(`${this.itemPriceReportUrl}` + "/excel");
    }

}