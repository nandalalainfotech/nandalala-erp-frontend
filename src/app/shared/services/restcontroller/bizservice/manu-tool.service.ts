import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemdt001mb } from "../entities/Itemdt001mb";

@Injectable()
export class ToolManager extends BaseService {

    private toolUrl: string = `${environment.apiUrl}/tools`

    alltool() {
        return this.getCallService(`${this.toolUrl}`+"/findAll");
    }
    savetool(itemdt001mb: Itemdt001mb) {
        return this.postCallService(`${this.toolUrl}`+"/save", {}, itemdt001mb);
    }

    updatetool(itemdt001mb: Itemdt001mb) {
        return this.putCallService(`${this.toolUrl}`+"/update", {}, itemdt001mb);
    }
    deletetool(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.toolUrl}`+"/delete", data);
    }

    manuToolsPdf() {
        return this.getCallService1(`${this.toolUrl}` + "/pdf");
    }
    
    manuToolsExcel() {
        return this.getCallService1(`${this.toolUrl}` + "/excel");
    }
}