import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Project001mb } from "../entities/Project001mb";

@Injectable()

export class ProjecttManager extends BaseService {

    private projecttUrl: string = `${environment.apiUrl}/projectt`

    allproject() {
        return this.getCallService(`${this.projecttUrl}` + "/findAll");
    }

    saveproject(project001mb: Project001mb) {
        return this.postCallService(`${this.projecttUrl}` + "/save", {}, project001mb);
    }

    updateproject(project001mb: Project001mb) {
        return this.putCallService(`${this.projecttUrl}` + "/update", {}, project001mb);
    }

    deleteproject(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.projecttUrl}` + "/delete", data);
    }

    projecttPdf() {
        return this.getCallService1(`${this.projecttUrl}` + "/pdf");
    }

    projecttExcel() {
        return this.getCallService1(`${this.projecttUrl}` + "/excel");
    }
}