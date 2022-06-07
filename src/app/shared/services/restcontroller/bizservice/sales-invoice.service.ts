import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Grossprofit001mb } from "../entities/Grossprofit001mb";


@Injectable()
export class SalesInvoiceManager extends BaseService {

    private salesInvoiceUrl: string = `${environment.apiUrl}/salesinvoice`

    allsalesinvoice() {
        return this.getCallService(`${this.salesInvoiceUrl}`+"/findAll");
    }

    salesinvoicesave(salesinvoice: Grossprofit001mb) {
        return this.postCallService(`${this.salesInvoiceUrl}`+"/save", {}, salesinvoice);
    }

    salesinvoiceupdate(salesinvoice: Grossprofit001mb) {
        return this.putCallService(`${this.salesInvoiceUrl}`+"/update", {}, salesinvoice);
    }

    salesinvoicedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesInvoiceUrl}`+"/delete", data);
    }

    salesinvoicePdf() {
        return this.getCallService1(`${this.salesInvoiceUrl}` + "/pdf");
      }
    
      salesinvoiceExcel() {
        return this.getCallService1(`${this.salesInvoiceUrl}` + "/excel");
      }

}
