import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemdt001mb } from "../entities/Itemdt001mb";

@Injectable()
export class SalesItemManager extends BaseService {

    private salesItemUrl: string = `${environment.apiUrl}/salesitem`
    
    allsalesitem() {
        return this.getCallService(`${this.salesItemUrl}`+"/findAll");
    }
    savesalesitem(itemdt001mb: Itemdt001mb) {
        return this.postCallService(`${this.salesItemUrl}`+"/save", {}, itemdt001mb);
    }
    updatesalesitem(itemdt001mb: Itemdt001mb) {
        return this.putCallService(`${this.salesItemUrl}`+"/update", {}, itemdt001mb);
    }
    deletesalesitem(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesItemUrl}`+"/delete", data);
    }

    salesItemPdf() {
        return this.getCallService1(`${this.salesItemUrl}` + "/pdf");
      }
    
      salesItemExcel() {
        return this.getCallService1(`${this.salesItemUrl}` + "/excel");
      }

}