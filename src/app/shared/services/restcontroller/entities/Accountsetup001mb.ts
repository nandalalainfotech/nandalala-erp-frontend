import { BaseEntity } from "./BaseEntity";

export class Accountsetup001mb extends BaseEntity {
    setId?: number;

  mkentryforstkMang?: string | null;
 
  accfrozenUpto?: string;
 
  creditName?: string;

  roleallowedtoFreeze?: string;
 
  chksupinvoice?: string | null;

  mkpayviaJournal?: string | null;

  unlinkpayonCancel?: string | null;
}