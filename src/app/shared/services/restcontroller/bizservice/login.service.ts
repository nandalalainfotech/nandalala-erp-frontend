// import { Injectable } from "@angular/core";
// import { environment } from "src/environments/environment";
// import { BaseService } from "../../services/base.service";
// import { Login001mb } from "../entities/Login001mb";

// @Injectable()
// export class LoginManager extends BaseService {

//     private loginUrl: string = `${environment.apiUrl}/login`

//     updatePassword(login001mb: Login001mb) {
//         return this.postCallService(`${this.loginUrl}` + "/updatePassword", {}, login001mb);
//     }

//     updateUserName(updateUser: any) {
//         return this.postCallService("http://localhost:3000/testandreportstudio/api/login/updateUserName", {}, updateUser);
//     }
//     updateUserTheme(updateTheme: any) {
//         return this.postCallService(`${this.loginUrl}` + "/updateUserTheme", {}, updateTheme);
//     }
// }