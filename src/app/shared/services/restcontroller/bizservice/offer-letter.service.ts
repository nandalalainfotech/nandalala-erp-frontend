import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Recruitoffer001mb } from "../entities/Recruitoffer001mb";


@Injectable()
export class OfferLetterManager extends BaseService {

    private offerLetterUrl: string = `${environment.apiUrl}/offerletter`
    
    allofferletter() {
        return this.getCallService(`${this.offerLetterUrl}`+"/findAll");
    }

    saveofferletter(recruitoffer001mb: Recruitoffer001mb) {
        return this.postCallService(`${this.offerLetterUrl}`+"/save", {}, recruitoffer001mb);
    }

    updateofferletter(recruitoffer001mb:Recruitoffer001mb) {
        return this.putCallService(`${this.offerLetterUrl}`+"/update", {}, recruitoffer001mb);
    }

    deleteofferletter(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.offerLetterUrl}`+"/delete", data);
    }
    offerLetterPdf() {
        return this.getCallService1(`${this.offerLetterUrl}` + "/pdf");
    }

    offerLetterExcel() {
        return this.getCallService1(`${this.offerLetterUrl}` + "/excel");
    }

}