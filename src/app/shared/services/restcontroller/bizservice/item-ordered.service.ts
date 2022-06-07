import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Reqitemorder001mb } from '../entities/Reqitemorder001mb';

@Injectable()
export class ItemOrderedManager extends BaseService {

  private itemOrderedUrl: string = `${environment.apiUrl}/itemorder`

  allitemord() {
    return this.getCallService(`${this.itemOrderedUrl}`+"/findAll");
  }
  saveitemorder(reqitemorder001mb: Reqitemorder001mb) {
    return this.postCallService(`${this.itemOrderedUrl}`+"/save", {}, reqitemorder001mb);
  }
  updateitemorder(reqitemorder001mb: Reqitemorder001mb) {
    return this.putCallService(`${this.itemOrderedUrl}`+"/update", {}, reqitemorder001mb);
  }
  deleteitemorder(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.itemOrderedUrl}`+"/delete", data);
  }

  itemOrderedPdf() {
    return this.getCallService1(`${this.itemOrderedUrl}` + "/pdf");
  }

  itemOrderedExcel() {
    return this.getCallService1(`${this.itemOrderedUrl}` + "/excel");
  }

}
