import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemshortagerep001mb } from "../entities/Itemshortagerep001mb";

@Injectable()
export class ItemShortageManager extends BaseService {

    private itemShortageUrl: string = `${environment.apiUrl}/itemshortage`;
    
    allitemshortage() {
        return this.getCallService(`${this.itemShortageUrl}`+"/findAll");
    }
    itemshortagesave(itemshortagerep001mb: Itemshortagerep001mb) {
        return this.postCallService(`${this.itemShortageUrl}`+"/save", {}, itemshortagerep001mb);
    }
    itemshortageupdate(itemshortagerep001mb: Itemshortagerep001mb) {
        return this.putCallService(`${this.itemShortageUrl}`+"/update", {}, itemshortagerep001mb);
    }
    itemshortagedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemShortageUrl}`+"/delete", data);
    }

    itemShortagePdf() {
        return this.getCallService1(`${this.itemShortageUrl}` + "/pdf");
      }
    
      itemShortageExcel() {
        return this.getCallService1(`${this.itemShortageUrl}` + "/excel");
      }

}