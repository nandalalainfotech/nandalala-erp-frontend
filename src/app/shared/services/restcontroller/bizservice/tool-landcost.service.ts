import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Landcostvouch001mb } from "../entities/Landcostvouch001mb";

@Injectable()
export class LandCostManager extends BaseService {

    private landCostUrl: string = `${environment.apiUrl}/land`

    allland() {
        return this.getCallService(`${this.landCostUrl}`+"/findAll");
    }
    saveland(landcostvouch001mb: Landcostvouch001mb) {
        return this.postCallService(`${this.landCostUrl}`+"/save",{}, landcostvouch001mb);
    }
    updateland(landcostvouch001mb: Landcostvouch001mb) {
        return this.putCallService(`${this.landCostUrl}`+"/update",{}, landcostvouch001mb);
    }
    deleteland(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.landCostUrl}`+"/delete", data);
    }

    landCostPdf() {
        return this.getCallService1(`${this.landCostUrl}` + "/pdf");
    }

    landCostExcel() {
        return this.getCallService1(`${this.landCostUrl}` + "/excel");
    }

}
