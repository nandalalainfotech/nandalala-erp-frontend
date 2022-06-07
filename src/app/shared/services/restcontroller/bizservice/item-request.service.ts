import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Requestitembuy001mb } from '../entities/Requestitembuy001mb';

@Injectable()
export class ItemRequestManager extends BaseService {

    private itemRequestUrl: string = `${environment.apiUrl}/itemrequest`
    
    allitemreq() {
        return this.getCallService(`${this.itemRequestUrl}`+"/findAll");
    }
    saveitemreq(reqitembuy1mb: Requestitembuy001mb) {
        return this.postCallService(`${this.itemRequestUrl}`+"/save", {}, reqitembuy1mb);
    }
    updateitemreq(reqitembuy1mb: Requestitembuy001mb) {
        return this.putCallService(`${this.itemRequestUrl}`+"/update", {}, reqitembuy1mb);
    }
    deleteitemreq(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemRequestUrl}`+"/delete", data);
    }

    itemRequestPdf() {
        return this.getCallService1(`${this.itemRequestUrl}` + "/pdf");
      }
    
      itemRequestExcel() {
        return this.getCallService1(`${this.itemRequestUrl}` + "/excel");
      }

}
