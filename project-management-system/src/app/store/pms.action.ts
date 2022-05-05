export class SetAuthorisedStatus {
  static readonly type = '[PMS] Set authorised status';

  constructor(public isAuthorised: boolean) {}
}
