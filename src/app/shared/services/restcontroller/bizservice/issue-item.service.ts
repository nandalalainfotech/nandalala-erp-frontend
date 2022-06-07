import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Issueditem001mb } from '../entities/Issueditem001mb';

@Injectable()
export class IssueItemManager extends BaseService {

  private issueItemUrl: string = `${environment.apiUrl}/issueditem`

  allissueditem() {
    return this.getCallService(`${this.issueItemUrl}` + "/findAll");
  }
  issitemsave(issueditem: Issueditem001mb) {
    return this.postCallService(`${this.issueItemUrl}` + "/save", {}, issueditem);
  }
  issitemupdate(issueditem: Issueditem001mb) {
    return this.putCallService(`${this.issueItemUrl}` + "/update", {}, issueditem);
  }
  issitemdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.issueItemUrl}` + "/delete", data);
  }


  issueItemPdf() {
    return this.getCallService1(`${this.issueItemUrl}` + "/pdf");
  }

  issueItemExcel() {
    return this.getCallService1(`${this.issueItemUrl}` + "/excel");
  }

}
