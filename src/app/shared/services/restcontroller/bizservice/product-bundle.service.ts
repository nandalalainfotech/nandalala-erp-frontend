import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Prodbundle001mb } from "../entities/Prodbundle001mb";

@Injectable()
export class ProdBundleManager extends BaseService {

  private prodBundleUrl: string = `${environment.apiUrl}/prbundle`

    allprbundle() {
        return this.getCallService(`${this.prodBundleUrl}`+"/findAll");
      }
      saveprbundle(prodbundle001mb: Prodbundle001mb) {
        return this.postCallService(`${this.prodBundleUrl}`+"/save", {}, prodbundle001mb);
      }
      updateprbundle(prodbundle001mb: Prodbundle001mb) {
        return this.putCallService(`${this.prodBundleUrl}`+"/update", {}, prodbundle001mb);
      }
      deleteprbundle(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.prodBundleUrl}`+"/delete", data);
      }

      prodBundlePdf() {
        return this.getCallService1(`${this.prodBundleUrl}` + "/pdf");
      }
    
      prodBundleExcel() {
        return this.getCallService1(`${this.prodBundleUrl}` + "/excel");
      }
}