import { BaseEntity } from "./BaseEntity";

export class Chequetemplate001mb extends BaseEntity {
    cheqId?: number;
    prmaccountName?: string;
    prmisaccPay?: boolean;
    prmcheqSize?: string | null;
    prmdistfromTop?: string | null;
    prmcheqWidth?: string | null;
    prmdistfromLeft?: string | null;
    prmcheqHeight?: string | null;
    prmmesgtoShow?: string;
    scanCheq?: string | null;
    dtdistfromTop?: string | null;
    dtdistfromLeft?: string | null;
    paydistfromTop?: string | null;
    paydistfromLeft?: string | null;
    amtwdistfromTop?: string | null;
    amtwdistfromLeft?: string | null;
    amtwWidth?: string | null;
    amtwlineSpace?: string | null;
    amtfdistfromTop?: string | null;
    amtfdistfromLeft?: string | null;
    accnodistfromTop?: string | null;
    accnodistfromLeft?: string | null;
    signposdistfromTop?: string | null;
    signposdistfromLeft?: string | null;
}
