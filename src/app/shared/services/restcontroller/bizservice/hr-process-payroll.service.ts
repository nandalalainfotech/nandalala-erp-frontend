import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Processpr001mb } from "../entities/Processpr001mb";

@Injectable()
export class ProcessprManager extends BaseService {

  private processprUrl: string = `${environment.apiUrl}/process`
  
    allprocess() {
        return this.getCallService(`${this.processprUrl}`+"/findAll");
      }
      saveprocess(processpr001mb: Processpr001mb) {
        return this.postCallService(`${this.processprUrl}`+"/save",{}, processpr001mb);
      }
      updateprocess(processpr001mb: Processpr001mb) {
        return this.putCallService(`${this.processprUrl}`+"/update",{}, processpr001mb);
      }
      deleteprocess(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.processprUrl}`+"/delete", data);
      }
      processprPdf() {
        return this.getCallService1(`${this.processprUrl}` + "/pdf");
    }

    processprExcel() {
        return this.getCallService1(`${this.processprUrl}` + "/excel");
    }

}