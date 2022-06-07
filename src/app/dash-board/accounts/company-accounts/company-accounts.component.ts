import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-company-accounts',
    templateUrl: './company-accounts.component.html',
    styleUrls: ['./company-accounts.component.css'],
})
export class CompanyAccountsComponent implements OnInit {
    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    constructor(private authManager: AuthManager) {}

    ngOnInit(): void {
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);
            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);
            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.3);
        });
    }
}
