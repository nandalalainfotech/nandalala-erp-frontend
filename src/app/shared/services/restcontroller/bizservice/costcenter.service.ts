import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Costcenter001mb } from "../entities/Costcenter001mb";

@Injectable()

export class CostCenterManager extends BaseService {

    private CostCenterUrl: string = `${environment.apiUrl}/costcenter`;
    
    allcostcenter() {
        return this.getCallService(`${this.CostCenterUrl}`+"/findAll");
    }

    costcentersave(costcenter001mb: Costcenter001mb) {
        return this.postCallService(`${this.CostCenterUrl}`+"/save", {}, costcenter001mb);
    }

    costcenterupdate(costcenter001mb: Costcenter001mb) {
        return this.putCallService(`${this.CostCenterUrl}`+"/update", {}, costcenter001mb);
    }

    costcenterdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.CostCenterUrl}`+"/delete", data);
    }

    costCenterPdf() {
        return this.getCallService1(`${this.CostCenterUrl}` + "/pdf");
      }
    
      costCenterExcel() {
        return this.getCallService1(`${this.CostCenterUrl}` + "/excel");
      }
    

}