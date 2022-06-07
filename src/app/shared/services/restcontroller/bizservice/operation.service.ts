import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Operationbom001mb } from "../entities/Operationbom001mb";

@Injectable()

export class OperationManager extends BaseService {

    private operationUrl: string = `${environment.apiUrl}/operationbom`

    allbom() {
        return this.getCallService(`${this.operationUrl}`+"/findAll");
    }

    bomsave(operationbom: Operationbom001mb) {
        return this.postCallService(`${this.operationUrl}`+"/save", {}, operationbom);
    }

    bomupdate(operationbom: Operationbom001mb) {
        return this.putCallService(`${this.operationUrl}`+"/update", {}, operationbom);
    }

    bomdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.operationUrl}`+"/delete", data);
    }

    operationPdf() {
        return this.getCallService1(`${this.operationUrl}` + "/pdf");
    }
    
    operationExcel() {
        return this.getCallService1(`${this.operationUrl}` + "/excel");
    }
}