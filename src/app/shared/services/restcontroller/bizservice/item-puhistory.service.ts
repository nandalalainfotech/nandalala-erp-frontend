import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Itempuhist001mb } from '../entities/Itempuhist001mb';

@Injectable()
export class ItemPuhistoryManager extends BaseService {

    private itemPuhistoryUrl: string = `${environment.apiUrl}/itempuhistory`
    
    allitempuhis() {
        return this.getCallService(`${this.itemPuhistoryUrl}`+"/findAll");
    }
    saveitmpuhist(itempuhist001mb: Itempuhist001mb) {
        return this.postCallService(`${this.itemPuhistoryUrl}`+"/save", {}, itempuhist001mb);
    }
    updateitmpuhist(itempuhist001mb: Itempuhist001mb) {
        return this.putCallService(`${this.itemPuhistoryUrl}`+"/update", {}, itempuhist001mb);
    }
    deletepuhis(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemPuhistoryUrl}`+"/delete", data);
    }

    itemPuhistoryPdf() {
        return this.getCallService1(`${this.itemPuhistoryUrl}` + "/pdf");
      }
    
      itemPuhistoryExcel() {
        return this.getCallService1(`${this.itemPuhistoryUrl}` + "/excel");
      }
    

}
