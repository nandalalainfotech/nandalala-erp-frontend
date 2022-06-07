import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Matreqsunotcreate001mb } from '../entities/Matreqsunotcreate001mb';

@Injectable()
export class MatreqSupwiseManager extends BaseService {

    private matreqSupwiseUrl: string = `${environment.apiUrl}/matreqsup`

    allmatreq() {
        return this.getCallService(`${this.matreqSupwiseUrl}`+"/findAll");
    }
    saveprmatreqsup(matsupwise: Matreqsunotcreate001mb) {
        return this.postCallService(`${this.matreqSupwiseUrl}`+"/save", {}, matsupwise);
    }
    updateprmatreqsup(matsupwise: Matreqsunotcreate001mb) {
        return this.putCallService(`${this.matreqSupwiseUrl}`+"/update", {}, matsupwise);
    }
    deletematreqsup(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.matreqSupwiseUrl}`+"/delete", data);
    }

    matreqSupwisePdf() {
        return this.getCallService1(`${this.matreqSupwiseUrl}` + "/pdf");
      }
    
      matreqSupwiseExcel() {
        return this.getCallService1(`${this.matreqSupwiseUrl}` + "/excel");
      }

}
