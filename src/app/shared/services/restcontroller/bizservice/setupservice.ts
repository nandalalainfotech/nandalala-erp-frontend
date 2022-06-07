import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Manufactureset001mb } from "../entities/Manufactureset001mb";

@Injectable()
export class SetupManager extends BaseService {

    private setupUrl: string = `${environment.apiUrl}/setup`
    
    allsetup() {
        return this.getCallService(`${this.setupUrl}`+"/findAll");
    }

    setupSave(manufactureset001mb: Manufactureset001mb) {
        return this.postCallService(`${this.setupUrl}`+"/save", {}, manufactureset001mb);
    }

    setupupdate(manufactureset001mb: Manufactureset001mb) {
        return this.putCallService(`${this.setupUrl}`+"/update", {}, manufactureset001mb);
    }

    setupdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.setupUrl}`+"/delete", data);
}

manuSetupPdf() {
    return this.getCallService1(`${this.setupUrl}` + "/pdf");
}

manuSetupExcel() {
    return this.getCallService1(`${this.setupUrl}` + "/excel");
}

}