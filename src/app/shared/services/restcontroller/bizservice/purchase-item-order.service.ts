import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purorditemreceive001mb } from "../entities/Purorditemreceive001mb";

@Injectable()
export class PurchaseItemOrderManager extends BaseService {

    private purchaseItemOrderUrl: string = `${environment.apiUrl}/purchaseitem`;
    
    allpurchaseitem() {
        return this.getCallService(`${this.purchaseItemOrderUrl}`+"/findAll");
    }
    purchaseitemsave(purorditemreceive001mb: Purorditemreceive001mb) {
        return this.postCallService(`${this.purchaseItemOrderUrl}`+"/save", {}, purorditemreceive001mb);
    }
    purchaseitemupdate(purorditemreceive001mb: Purorditemreceive001mb) {
        return this.putCallService(`${this.purchaseItemOrderUrl}`+"/update", {}, purorditemreceive001mb);
    }
    purchaseitemdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purchaseItemOrderUrl}`+"/delete", data);
    }

    purchaseItemOrderPdf() {
        return this.getCallService1(`${this.purchaseItemOrderUrl}` + "/pdf");
      }
    
      purchaseItemOrderExcel() {
        return this.getCallService1(`${this.purchaseItemOrderUrl}` + "/excel");
      }

}