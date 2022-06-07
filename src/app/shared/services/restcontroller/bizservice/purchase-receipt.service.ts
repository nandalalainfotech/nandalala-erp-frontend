import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stktranspurecpt001mb } from "../entities/Stktranspurecpt001mb";

@Injectable()

export class PurchaseReceiptManager extends BaseService {

    private purchaseReceiptUrl: string = `${environment.apiUrl}/pureceipt`
    
    allpureceipt() {
        return this.getCallService(`${this.purchaseReceiptUrl}`+"/findAll");
    }

    savepureceipt(stktranspurecpt001mb: Stktranspurecpt001mb) {
        return this.postCallService(`${this.purchaseReceiptUrl}`+"/save", {}, stktranspurecpt001mb);
    }

    updatepureceipt(stktranspurecpt001mb: Stktranspurecpt001mb) {
        return this.putCallService(`${this.purchaseReceiptUrl}`+"/update", {}, stktranspurecpt001mb);
    }

    deletepureceipt(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purchaseReceiptUrl}`+"/delete", data);
    }

    purchaseReceiptPdf() {
        return this.getCallService1(`${this.purchaseReceiptUrl}` + "/pdf");
    }

    purchaseReceiptExcel() {
        return this.getCallService1(`${this.purchaseReceiptUrl}` + "/excel");
    }
}