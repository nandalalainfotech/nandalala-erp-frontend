import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemdt001mb } from "../entities/Itemdt001mb";


@Injectable()
export class MaterialManager extends BaseService {

    private materialUrl: string = `${environment.apiUrl}/material`

    allmaterial() {
        return this.getCallService(`${this.materialUrl}`+"/findAll");
    }

    savematerial(itemdt001mb: Itemdt001mb) {
        return this.postCallService(`${this.materialUrl}`+"/save", {}, itemdt001mb);
    }

    updatematerial(itemdt001mb: Itemdt001mb) {
        return this.putCallService(`${this.materialUrl}`+"/update", {}, itemdt001mb);
    }

    deletematerial(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.materialUrl}`+"/delete", data);
    }

    billOfMaterialPdf() {
        return this.getCallService1(`${this.materialUrl}` + "/pdf");
    }
    
    billOfMaterialExcel() {
        return this.getCallService1(`${this.materialUrl}` + "/excel");
    }
}