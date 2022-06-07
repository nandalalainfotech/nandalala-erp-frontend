import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stkrepproject001mb } from "../entities/Stkrepproject001mb";

@Injectable()
export class ProjectQuantityManager extends BaseService {
    
    private projectQuantityUrl: string = `${environment.apiUrl}/stkproject`

    allstkproject() {
        return this.getCallService(`${this.projectQuantityUrl}`+"/findAll");
    }
    savestkproject(stkrepproject001mb: Stkrepproject001mb) {
        return this.postCallService(`${this.projectQuantityUrl}`+"/save", {}, stkrepproject001mb);
    }
    updatestkproject(stkrepproject001mb: Stkrepproject001mb) {
        return this.putCallService(`${this.projectQuantityUrl}`+"/update", {}, stkrepproject001mb);
    }
    deletestkproject(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.projectQuantityUrl}`+"/delete", data);
    }

    projectQuantityPdf() {
        return this.getCallService1(`${this.projectQuantityUrl}` + "/pdf");
    }

    projectQuantityExcel() {
        return this.getCallService1(`${this.projectQuantityUrl}` + "/excel");
    }
}