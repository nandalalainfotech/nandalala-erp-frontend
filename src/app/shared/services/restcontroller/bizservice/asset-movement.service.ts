import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Assetmovement001mb } from "../entities/Assetmovement001mb";

@Injectable()
export class AssetMovementManager extends BaseService {

    private assetMovementtUrl: string = `${environment.apiUrl}/assetmove`;
    
    allassmove() {
        return this.getCallService(`${this.assetMovementtUrl}`+"/findAll");
    }
    assmovesave(assetmovement001mb: Assetmovement001mb) {
        return this.postCallService(`${this.assetMovementtUrl}`+"/save", {}, assetmovement001mb);
    }
    assmoveupdate(assetmovement001mb: Assetmovement001mb) {
        return this.putCallService(`${this.assetMovementtUrl}`+"/update", {}, assetmovement001mb);
    }
    assmovedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.assetMovementtUrl}`+"/delete", data);
    }

    assetMovementPdf() {
        return this.getCallService1(`${this.assetMovementtUrl}` + "/pdf");
      }
    
      assetMovementExcel() {
        return this.getCallService1(`${this.assetMovementtUrl}` + "/excel");
      }

}