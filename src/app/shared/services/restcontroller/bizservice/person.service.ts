import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";

@Injectable()

export class PersonManager extends BaseService {

    private personUrl: string = `${environment.apiUrl}/person`


    allperson() {

        return this.getCallService(`${this.personUrl}` + "/findAll");
    }

    allpersonRegister() {
        // console.log("cl--->reg", this.personUrl);
        console.log("cl--->regperson");
        return this.getCallService(`${this.personUrl}` + "/regFindAll");
    }
}