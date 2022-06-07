import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Jounalentry001mb } from "../entities/Jounalentry001mb";

@Injectable()
export class JournalEntryManager extends BaseService {

    private journalEntryUrl: string = `${environment.apiUrl}/journalentry`
    
    alljournal() {
        return this.getCallService(`${this.journalEntryUrl}`+"/findAll");
    }

    journalsave(jounalentry: Jounalentry001mb) {
        return this.postCallService(`${this.journalEntryUrl}`+"/save", {}, jounalentry);
    }

    journalupdate(jounalentry: Jounalentry001mb) {
        return this.putCallService(`${this.journalEntryUrl}`+"/update", {}, jounalentry);
    }

    journaldelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.journalEntryUrl}`+"/delete", data);
    }

    journalEntryPdf() {
        return this.getCallService1(`${this.journalEntryUrl}` + "/pdf");
      }
    
      journalEntryExcel() {
        return this.getCallService1(`${this.journalEntryUrl}` + "/excel");
      }

}
