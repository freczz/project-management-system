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

export class SetNewUserStatus {
  static readonly type = '[PMS] Set new user status';

  constructor(public isNewUser: boolean) {}
}

export class SetUserData {
  static readonly type = '[PMS] Set user data';

  constructor(public userData: string) {}
}

export class SetCurrentLanguage {
  static readonly type = '[PMS] Set current language';

  constructor(public currentLanguage: string) {}
}
