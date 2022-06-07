import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prodorder001mb } from "../entities/Prodorder001mb";

@Injectable()
export class ProdOrderManager extends BaseService {

    private prodOrderUrl: string = `${environment.apiUrl}/prodorder`

    allorders() {
        return this.getCallService(`${this.prodOrderUrl}` + "/findAll");
    }

    prodsave(prodorder001mb: Prodorder001mb) {
        return this.postCallService(`${this.prodOrderUrl}` + "/save", {}, prodorder001mb);
    }

    produpdate(prodorder001mb: Prodorder001mb) {
        return this.putCallService(`${this.prodOrderUrl}` + "/update", {}, prodorder001mb);
    }

    proddelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.prodOrderUrl}` + "/delete", data);
    }

    prodOrderPdf() {
        return this.getCallService1(`${this.prodOrderUrl}` + "/pdf");
    }

    prodOrderExcel() {
        return this.getCallService1(`${this.prodOrderUrl}` + "/excel");
    }

}
