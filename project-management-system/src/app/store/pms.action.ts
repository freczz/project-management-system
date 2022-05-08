export class SetAuthorisedStatus {
  static readonly type = '[PMS] Set authorised status';

  constructor(public isAuthorised: boolean) {}
}

export class SetToken {
  static readonly type = '[PMS] Set token';

  constructor(public token: string) {}
}

export class SetBoards {
  static readonly type = '[PMS] Set boards';

  constructor(public boards: string) {}
}

export class SetItemToDelete {
  static readonly type = '[PMS] Set item to delete';

  constructor(public itemToDelete: string) {}
}
