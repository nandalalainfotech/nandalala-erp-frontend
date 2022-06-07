import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Grossprofit001mb } from "../entities/Grossprofit001mb";


@Injectable()
export class PurchaseInvoiceManager extends BaseService {

    private purchaseInvoiceUrl: string = `${environment.apiUrl}/purchaseinvoice`

    allpurchseinvoice() {
        return this.getCallService(`${this.purchaseInvoiceUrl}`+"/findAll");
    }

    purchaseinvoicesave(purchaseinvoice: Grossprofit001mb) {
        return this.postCallService(`${this.purchaseInvoiceUrl}`+"/save", {}, purchaseinvoice);
    }

    purchaseinvoiceupdate(purchaseinvoice: Grossprofit001mb) {
        return this.putCallService(`${this.purchaseInvoiceUrl}`+"/update", {}, purchaseinvoice);
    }

    purchaseinvoicedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purchaseInvoiceUrl}`+"/delete", data);
    }

    purchaseInvoicePdf() {
        return this.getCallService1(`${this.purchaseInvoiceUrl}` + "/pdf");
      }
    
      purchaseInvoiceExcel() {
        return this.getCallService1(`${this.purchaseInvoiceUrl}` + "/excel");
      }

}
