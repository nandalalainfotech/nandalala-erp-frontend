import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemdt001mb } from "../entities/Itemdt001mb";

@Injectable()
export class ItemManager extends BaseService {
    
    private itemUrl: string = `${environment.apiUrl}/item`

    allitem(){
        return this.getCallService(`${this.itemUrl}`+"/findAll");
    }

    saveitem(itemdt001mb: Itemdt001mb) {
        return this.postCallService(`${this.itemUrl}`+"/save", {}, itemdt001mb);
    }

    updateitem(itemdt001mb: Itemdt001mb) {
        return this.putCallService(`${this.itemUrl}`+"/update", {}, itemdt001mb);
    }

    deleteitem(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemUrl}`+"/delete", data);
    }


    itemPdf() {
        return this.getCallService1(`${this.itemUrl}` + "/pdf");
      }
    
      itemExcel() {
        return this.getCallService1(`${this.itemUrl}` + "/excel");
      }

}