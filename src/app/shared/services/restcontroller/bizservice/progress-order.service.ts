import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Progprodorder001mb } from '../entities/Progprodorder001mb';

@Injectable()
export class ProgressOrderManager extends BaseService {

  private progressOrderUrl: string = `${environment.apiUrl}/progprodorder`

  allprogress() {
    return this.getCallService(`${this.progressOrderUrl}` + "/findAll");
  }
  progprodsave(progprodorder001mb: Progprodorder001mb) {
    return this.postCallService(`${this.progressOrderUrl}` + "/save", {}, progprodorder001mb);
  }
  progprodupdate(progprodorder001mb: Progprodorder001mb) {
    return this.putCallService(`${this.progressOrderUrl}` + "/update", {}, progprodorder001mb);
  }
  progdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.progressOrderUrl}` + "/delete", data);
  }
  progressOrderPdf() {
    return this.getCallService1(`${this.progressOrderUrl}` + "/pdf");
  }

  progressOrderExcel() {
    return this.getCallService1(`${this.progressOrderUrl}` + "/excel");
  }

}
