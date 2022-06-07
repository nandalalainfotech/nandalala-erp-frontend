import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stktransdeliver001mb } from "../entities/Stktransdeliver001mb";

@Injectable()

export class DeliveryNoteManager extends BaseService {

    private deliveryNoteUrl: string = `${environment.apiUrl}/delnote`;

    alldelnote() {
        return this.getCallService(`${this.deliveryNoteUrl}`+"/findAll");
    }

    savedelnote(stktransdeliver001mb: Stktransdeliver001mb) {
        return this.postCallService(`${this.deliveryNoteUrl}`+"/save", {}, stktransdeliver001mb);
    }

    updatedelnote(stktransdeliver001mb: Stktransdeliver001mb) {
        return this.putCallService(`${this.deliveryNoteUrl}`+"/update", {}, stktransdeliver001mb);
    }

    deletedelnote(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.deliveryNoteUrl}`+"/delete", data);
    }

    deliveryNotePdf() {
        return this.getCallService1(`${this.deliveryNoteUrl}` + "/pdf");
    }

    deliveryNoteExcel() {
        return this.getCallService1(`${this.deliveryNoteUrl}` + "/excel");
    }
}