import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Packingslip001mb } from "../entities/Packingslip001mb";

@Injectable()
export class PackageSlipManager extends BaseService {

    private packageSlipUrl: string = `${environment.apiUrl}/packing`

    allpacking() {
        return this.getCallService(`${this.packageSlipUrl}` + "/findAll");
    }
    savepacking(packingslip001mb: Packingslip001mb) {
        return this.postCallService(`${this.packageSlipUrl}` + "/save", {}, packingslip001mb);
    }
    updatepacking(packingslip001mb: Packingslip001mb) {
        return this.putCallService(`${this.packageSlipUrl}` + "/update", {}, packingslip001mb);
    }
    deletepacking(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.packageSlipUrl}` + "/delete", data);
    }

    packageSlipPdf() {
        return this.getCallService1(`${this.packageSlipUrl}` + "/pdf");
    }

    packageSlipExcel() {
        return this.getCallService1(`${this.packageSlipUrl}` + "/excel");
    }

}
