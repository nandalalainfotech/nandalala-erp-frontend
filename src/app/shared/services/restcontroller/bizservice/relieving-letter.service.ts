import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Recruitrelieving001mb } from "../entities/Recruitrelieving001mb";

@Injectable()
export class RelievingLetterManager extends BaseService {

    private relievingLetterUrl: string = `${environment.apiUrl}/relievingletter`
    
    allrelievingletter() {
        return this.getCallService(`${this.relievingLetterUrl}`+"/findAll");
    }

    saverelievingletter(recruitrelieving001mb: Recruitrelieving001mb) {
        return this.postCallService(`${this.relievingLetterUrl}`+"/save", {}, recruitrelieving001mb);
    }

    updaterelievingletter(recruitrelieving001mb:Recruitrelieving001mb) {
        return this.putCallService(`${this.relievingLetterUrl}`+"/update", {}, recruitrelieving001mb);
    }

    deleterelievingletter(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.relievingLetterUrl}`+"/delete", data);
    }
    offerLetterPdf() {
        return this.getCallService1(`${this.relievingLetterUrl}` + "/pdf");
    }

    offerLetterExcel() {
        return this.getCallService1(`${this.relievingLetterUrl}` + "/excel");
    }

}
