import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Warehouse001mb } from "../entities/Warehouse001mb";

@Injectable()
export class WareHouseManager extends BaseService {

    private wareHouseUrl: string = `${environment.apiUrl}/wrhouse`

    allwrhouse() {
        return this.getCallService(`${this.wareHouseUrl}`+"/findAll");
    }

    savewrhouse(warehouse001mb: Warehouse001mb) {
        return this.postCallService(`${this.wareHouseUrl}`+"/save", {}, warehouse001mb);
    }

    updatewrhouse(warehouse001mb: Warehouse001mb) {
        return this.putCallService(`${this.wareHouseUrl}`+"/update", {}, warehouse001mb);
    }

    deletewrhouse(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.wareHouseUrl}`+"/delete", data);
    }

    wareHousePdf() {
        return this.getCallService1(`${this.wareHouseUrl}` + "/pdf");
    }

    wareHouseExcel() {
        return this.getCallService1(`${this.wareHouseUrl}` + "/excel");
    }

}
