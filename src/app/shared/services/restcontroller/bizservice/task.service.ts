import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Task001mb } from "../entities/Task001mb";

@Injectable()

export class TaskManager extends BaseService {

    private taskUrl: string = `${environment.apiUrl}/task`

    alltask() {
        return this.getCallService(`${this.taskUrl}`+"/findAll");
    }

    savetask(task001mb: Task001mb) {
        return this.postCallService(`${this.taskUrl}`+"/save", {}, task001mb);
    }

    updatetask(task001mb: Task001mb) {
        return this.putCallService(`${this.taskUrl}`+"/update", {}, task001mb);
    }

    deletetask(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.taskUrl}`+"/delete", data);
    }

    taskPdf() {
        return this.getCallService1(`${this.taskUrl}` + "/pdf");
    }

    taskExcel() {
        return this.getCallService1(`${this.taskUrl}` + "/excel");
    }
}