import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Openprodorder001mb } from '../entities/Openprodorder001mb';

@Injectable()
export class OpenOrderManager extends BaseService {

  private openOrderUrl: string = `${environment.apiUrl}/openprodorder`

  allopenprod() {
    return this.getCallService(`${this.openOrderUrl}` + "/findAll");
  }
  openprosave(openprodorder: Openprodorder001mb) {
    return this.postCallService(`${this.openOrderUrl}` + "/save", {}, openprodorder);
  }
  openproupdate(openprodorder: Openprodorder001mb) {
    return this.putCallService(`${this.openOrderUrl}` + "/update", {}, openprodorder);
  }
  openprodelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.openOrderUrl}` + "/delete", data);
  }

  openOrderPdf() {
    return this.getCallService1(`${this.openOrderUrl}` + "/pdf");
  }

  openOrderExcel() {
    return this.getCallService1(`${this.openOrderUrl}` + "/excel");
  }

}
