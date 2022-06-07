import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Compprodorder001mb } from '../entities/Compprodorder001mb';

@Injectable()
export class CompleteOrderManager extends BaseService {

  private completeOrderUrl: string = `${environment.apiUrl}/compprodorder`;

  allcompprod() {
    return this.getCallService(`${this.completeOrderUrl}`+"/findAll");

  }
  completesave(compprodorder001mb: Compprodorder001mb) {
    return this.postCallService(`${this.completeOrderUrl}`+"/save", {}, compprodorder001mb);
  }
  completeupdate(compprodorder001mb: Compprodorder001mb) {
    return this.putCallService(`${this.completeOrderUrl}`+"/update", {}, compprodorder001mb);
  }
  completedelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.completeOrderUrl}`+"/delete", data);
  }

  completeOrderPdf() {
    return this.getCallService1(`${this.completeOrderUrl}` + "/pdf");
  }

  completeOrderExcel() {
    return this.getCallService1(`${this.completeOrderUrl}` + "/excel");
  }
}
