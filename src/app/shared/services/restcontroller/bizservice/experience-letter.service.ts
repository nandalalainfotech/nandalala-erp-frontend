import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Recruitworkingexperience001mb } from "../entities/Recruitworkingexperience001mb";


@Injectable()
export class ExperienceLetterManager extends BaseService {

    private experienceLetterUrl: string = `${environment.apiUrl}/workexp`;

    allwrkexp() {
        return this.getCallService(`${this.experienceLetterUrl}`+"/findAll");
    }

    savewrkexp(recruitworkingexperience001mb: Recruitworkingexperience001mb) {
        return this.postCallService(`${this.experienceLetterUrl}`+"/save", {}, recruitworkingexperience001mb);
    }

    updatewrkexp(recruitworkingexperience001mb:Recruitworkingexperience001mb) {
        return this.putCallService(`${this.experienceLetterUrl}`+"/update", {}, recruitworkingexperience001mb);
    }

    deletewrkexp(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.experienceLetterUrl}`+"/delete", data);
    }
    experienceLetterPdf() {
        return this.getCallService1(`${this.experienceLetterUrl}` + "/pdf");
    }

    experienceLetterExcel() {
        return this.getCallService1(`${this.experienceLetterUrl}` + "/excel");
    }

}
