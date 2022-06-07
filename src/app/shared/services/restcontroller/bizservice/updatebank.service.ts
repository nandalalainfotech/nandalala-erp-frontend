import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Updatebank001mb } from "../entities/Updatebank001mb";



@Injectable()
export class updatebankManager extends BaseService {

  private updatebankUrl: string = `${environment.apiUrl}/updatebank`
  
    allupdatebank() {
        return this.getCallService(`${this.updatebankUrl}`+"/findAll");
      }

      updatebanksave(updatebank001mb: Updatebank001mb) {
        return this.postCallService(`${this.updatebankUrl}`+"/save",{}, updatebank001mb);
      }
      updatebankupdate(updatebank001mb: Updatebank001mb) {

        return this.putCallService(`${this.updatebankUrl}`+"/update",{}, updatebank001mb);
      }
      updatebankdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.updatebankUrl}`+"/delete", data);
      }

      updateBankPdf() {
        return this.getCallService1(`${this.updatebankUrl}` + "/pdf");
      }
    
      updateBankExcel() {
        return this.getCallService1(`${this.updatebankUrl}` + "/excel");
      }
    

}