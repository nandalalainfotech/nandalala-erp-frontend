import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Unitofmeasure001mb } from "../entities/Unitofmeasure001mb";

@Injectable()
export class UnitofMeaseureManager extends BaseService {

    private unitofMeaseureUrl: string = `${environment.apiUrl}/unitmeasure`

    allunitmeasure() {
        return this.getCallService(`${this.unitofMeaseureUrl}`+"/findAll");
    }

    saveunitmeasure(unitofmeasure001mb: Unitofmeasure001mb) {
        return this.postCallService(`${this.unitofMeaseureUrl}`+"/save", {}, unitofmeasure001mb);
    }

    updateunitmeasure(unitofmeasure001mb: Unitofmeasure001mb) {
        return this.putCallService(`${this.unitofMeaseureUrl}`+"/update", {}, unitofmeasure001mb);
    }

    deleteunitmeasure(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.unitofMeaseureUrl}`+"/delete", data);
    }

    unitofMeaseurePdf() {
        return this.getCallService1(`${this.unitofMeaseureUrl}` + "/pdf");
    }

    unitofMeaseureExcel() {
        return this.getCallService1(`${this.unitofMeaseureUrl}` + "/excel");
    }

}
