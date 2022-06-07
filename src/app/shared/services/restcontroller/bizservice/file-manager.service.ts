import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from "../../services/base.service";

@Injectable()
export class FileManagertManager extends BaseService {

  allFiles() {
    return this.getCallService('http://localhost:3000/testandreportstudio/api/filemanager/findAll');
  }
  save(selectedFile: any, category: string) {
    var formData: any = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    formData.append("category", category);
    formData.append("contenttype", "contenttype");
    formData.append("created", new Date());
    formData.append("filename", selectedFile.name);
    formData.append("loginuser", "sivakumar");
    formData.append("size", "100mb");
    formData.append("insertUser", "sivakumar");
    formData.append("insertDatetime", new Date());
    return this.postCallService1('http://localhost:3000/testandreportstudio/api/filemanager/upload', {}, formData).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  fileManagertPdf() {
    return this.getCallService1('http://localhost:3000/testandreportstudio/api/filemanager/pdf');
  }

  fileManagertExcel() {
    return this.getCallService1('http://localhost:3000/testandreportstudio/api/filemanager/excel');
  }


}