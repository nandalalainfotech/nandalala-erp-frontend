import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prreqquot001mb } from "../entities/Prreqquot001mb";

@Injectable()
export class PrreqQuotReqManager extends BaseService {

  private prreqQuotReqUrl: string = `${environment.apiUrl}/prreqquot`

    allprreqquot() {
    return this.getCallService(`${this.prreqQuotReqUrl}`+"/findAll");
  }

  prreqquotsave(prreqquot001mb: Prreqquot001mb) {
    return this.postCallService(`${this.prreqQuotReqUrl}`+"/save",{}, prreqquot001mb);
  }

  prreqquotupdate(prreqquot001mb: Prreqquot001mb) {
    return this.putCallService(`${this.prreqQuotReqUrl}`+"/update", {}, prreqquot001mb);
  }

  prreqquotdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.prreqQuotReqUrl}`+"/delete", data);
  }
  
  prreqQuotReqPdf() {
    return this.getCallService1(`${this.prreqQuotReqUrl}` + "/pdf");
  }

  prreqQuotReqExcel() {
    return this.getCallService1(`${this.prreqQuotReqUrl}` + "/excel");
  }

}
