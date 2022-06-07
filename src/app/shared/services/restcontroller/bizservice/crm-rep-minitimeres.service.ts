import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Crmmintoresp001mb } from "../entities/Crmmintoresp001mb";

@Injectable()
export class MiniTimeresManager extends BaseService {

    private miniTimeresUrl: string = `${environment.apiUrl}/minitimeres`;

    allminitime() {
        return this.getCallService(`${this.miniTimeresUrl}` + "/findAll");
    }
    minitimesave(crmmintoresp001: Crmmintoresp001mb) {
        return this.postCallService(`${this.miniTimeresUrl}` + "/save", {}, crmmintoresp001);
    }
    minitimeupdate(crmmintoresp001: Crmmintoresp001mb) {
        return this.putCallService(`${this.miniTimeresUrl}` + "/update", {}, crmmintoresp001);
    }
    minitimedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService("http://localhost:3000/testandreportstudio/api/minitimeres/delete", data);
    }

    minitimeresPdf() {
        return this.getCallService1(`${this.miniTimeresUrl}` + "/pdf");
    }

    minitimeresExcel() {
        return this.getCallService1(`${this.miniTimeresUrl}` + "/excel");
    }

}
