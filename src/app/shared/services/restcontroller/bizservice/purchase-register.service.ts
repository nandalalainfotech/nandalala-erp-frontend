import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchaseregister001mb } from "../entities/Purchaseregister001mb";

@Injectable()
export class PurchaseRegisterManager extends BaseService {

    private purchaseRegisterUrl: string = `${environment.apiUrl}/purchaseregister`

    allpurchasereg() {
        return this.getCallService(`${this.purchaseRegisterUrl}`+"/findAll");
    }
    purchaseregsave(purchaseregister001mb: Purchaseregister001mb) {
        return this.postCallService(`${this.purchaseRegisterUrl}`+"/save", {}, purchaseregister001mb);
    }
    purchaseregupdate(purchaseregister001mb: Purchaseregister001mb) {
        return this.putCallService(`${this.purchaseRegisterUrl}`+"/update", {}, purchaseregister001mb);
    }
    purchaseregdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purchaseRegisterUrl}`+"/delete", data);
    }

    purchaseRegisterPdf() {
        return this.getCallService1(`${this.purchaseRegisterUrl}` + "/pdf");
      }
    
      purchaseRegisterExcel() {
        return this.getCallService1(`${this.purchaseRegisterUrl}` + "/excel");
      }
    

}