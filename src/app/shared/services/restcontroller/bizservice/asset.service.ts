import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Asset001mb } from "../entities/Asset001mb";

@Injectable()
export class AssetManager extends BaseService {

    private assettUrl: string = `${environment.apiUrl}/asset`;
    
    allasset() {
        return this.getCallService(`${this.assettUrl}`+"/findAll");
    }
    assetsave(asset001mb: Asset001mb) {
        return this.postCallService(`${this.assettUrl}`+"/save", {}, asset001mb);
    }
    assetupdate(asset001mb: Asset001mb) {
        return this.putCallService(`${this.assettUrl}`+"/update", {}, asset001mb);
    }
    assetdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.assettUrl}`+"/delete", data);
    }

    assetPdf() {
        return this.getCallService1(`${this.assettUrl}` + "/pdf");
      }
    
      assetExcel() {
        return this.getCallService1(`${this.assettUrl}` + "/excel");
      }

}
