import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplier001mb } from "../entities/Supplier001mb";

@Injectable()
export class SupplierManager extends BaseService {

    private supplierUrl: string = `${environment.apiUrl}/supplier`

    allsupplier() {
        return this.getCallService(`${this.supplierUrl}` + "/findAll");
    }
    suppliersave(supplier001mb: Supplier001mb) {
        return this.postCallService(`${this.supplierUrl}` + "/save", {}, supplier001mb);
    }
    supplierupdate(supplier001mb: Supplier001mb) {
        return this.putCallService(`${this.supplierUrl}` + "/update", {}, supplier001mb);
    }
    supplierdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supplierUrl}` + "/delete", data);
    }

    supplierPdf() {
        return this.getCallService1(`${this.supplierUrl}` + "/pdf");
    }

    supplierExcel() {
        return this.getCallService1(`${this.supplierUrl}` + "/excel");
    }

}