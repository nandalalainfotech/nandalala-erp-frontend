import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemst001mb } from "../entities/Itemst001mb";

@Injectable()

export class ItemStatusManager extends BaseService {

    private itemStatusUrl: string = `${environment.apiUrl}/itemstatus`
    
    allitems() {
        return this.getCallService(`${this.itemStatusUrl}`+"/findAll");
    }

    itemsave(itemst001mb: Itemst001mb) {
        return this.postCallService(`${this.itemStatusUrl}`+"/save", {}, itemst001mb);
    }

    itemupdate(itemst001mb: Itemst001mb) {
        return this.putCallService(`${this.itemStatusUrl}`+"/update", {},  itemst001mb);
    }

    itemdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemStatusUrl}`+"/delete", data);
    }

    itemStatusPdf() {
        return this.getCallService1(`${this.itemStatusUrl}` + "/pdf");
    }
    
    itemStatusExcel() {
        return this.getCallService1(`${this.itemStatusUrl}` + "/excel");
    }

}