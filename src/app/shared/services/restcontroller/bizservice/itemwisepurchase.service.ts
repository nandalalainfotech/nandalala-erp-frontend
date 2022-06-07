import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Itemwisepurregister001mb } from "../entities/Itemwisepurregister001mb";

@Injectable()
export class ItemWisePurchaseManager extends BaseService {

  private itemWisePurchaseUrl: string = `${environment.apiUrl}/itemwisepurchase`

    allitemwise() {
    return this.getCallService(`${this.itemWisePurchaseUrl}`+"/findAll");
  }

  itemwisesave(itemwisepurregister: Itemwisepurregister001mb) {
    return this.postCallService(`${this.itemWisePurchaseUrl}`+"/save",{}, itemwisepurregister);
  }

  itemwiseupdate(itemwisepurregister: Itemwisepurregister001mb) {
    return this.putCallService(`${this.itemWisePurchaseUrl}`+"/update",{}, itemwisepurregister);
  }

  itemwisedelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.itemWisePurchaseUrl}`+"/delete", data);
  }

  itemWisePurchasePdf() {
    return this.getCallService1(`${this.itemWisePurchaseUrl}` + "/pdf");
  }

  itemWisePurchaseExcel() {
    return this.getCallService1(`${this.itemWisePurchaseUrl}` + "/excel");
  }
  
}
