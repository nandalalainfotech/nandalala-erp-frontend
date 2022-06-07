import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prmatreq001mb } from "../entities/Prmatreq001mb";

@Injectable()
export class PrmatReqManager extends BaseService {
  
  private prmatReqUrl: string = `${environment.apiUrl}/prmatreq`

    allprmatreq() {
    return this.getCallService(`${this.prmatReqUrl}`+"/findAll");
  }

  prmatreqsave(prmatreq001mb: Prmatreq001mb) {
    return this.postCallService(`${this.prmatReqUrl}`+"/save",{}, prmatreq001mb);
  }

  prmatrequpdate(prmatreq001mb: Prmatreq001mb) {
    return this.putCallService(`${this.prmatReqUrl}`+"/update", {}, prmatreq001mb);
  }

  prmatreqdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.prmatReqUrl}`+"/delete", data);
  }
  
  prmatReqPdf() {
    return this.getCallService1(`${this.prmatReqUrl}` + "/pdf");
  }

  prmatReqExcel() {
    return this.getCallService1(`${this.prmatReqUrl}` + "/excel");
  }

}
