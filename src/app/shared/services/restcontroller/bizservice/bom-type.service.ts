import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Bomtype001mb } from '../entities/Bomtype001mb';


@Injectable()
export class BomTypeManager extends BaseService {

  private bomTypeUrl: string = `${environment.apiUrl}/bomtype`;
  
  allbomtype() {
    return this.getCallService(`${this.bomTypeUrl}`+"/findAll");
  }
  bomtypesave(bomtype: Bomtype001mb) {
    return this.postCallService(`${this.bomTypeUrl}`+"/save", {}, bomtype);
  }
  bomtypeupdate(bomtype: Bomtype001mb) {
    return this.putCallService(`${this.bomTypeUrl}`+"/update", {}, bomtype);
  }
  bomtypedelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.bomTypeUrl}`+"/delete", data);
  }

  bomTypePdf() {
    return this.getCallService1(`${this.bomTypeUrl}` + "/pdf");
  }

  bomTypeExcel() {
    return this.getCallService1(`${this.bomTypeUrl}` + "/excel");
  }

}
