import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemprice001mb } from "../entities/Itemprice001mb";

@Injectable()
export class ItemPriceManager extends BaseService {
  
  private itemPricetUrl: string = `${environment.apiUrl}/itemprice`

    allitemprice() {
        return this.getCallService(`${this.itemPricetUrl}`+"/findAll");
      }
      saveitemprice(itemprice001mb: Itemprice001mb) {
        return this.postCallService(`${this.itemPricetUrl}`+"/save", {}, itemprice001mb);
      }
      updateitemprice(itemprice001mb: Itemprice001mb) {
        return this.putCallService(`${this.itemPricetUrl}`+"/update", {}, itemprice001mb);
    }
      deleteitemprice(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemPricetUrl}`+"/delete", data);
      }

      itemPricePdf() {
        return this.getCallService1(`${this.itemPricetUrl}` + "/pdf");
      }
    
      itemPriceExcel() {
        return this.getCallService1(`${this.itemPricetUrl}` + "/excel");
      }

}