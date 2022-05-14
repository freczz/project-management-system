import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IState } from './pms.interface';
import {
  SetToken,
  SetBoards,
  SetItemToDelete,
  SetNewUserStatus,
  SetUserData,
  SetCurrentLanguage,
} from './pms.action';

const initialState: IState = {
  token: '',
  boards: '[]',
  itemToDelete: '{}',
  isNewUser: false,
  userData: '{}',
  currentLanguage: 'en',
};

@State<IState>({
  name: 'PMSState',
  defaults: initialState,
})
@Injectable()
class PMSState {
  @Action(SetToken)
  private setToken({ patchState }: StateContext<IState>, action: SetToken) {
    patchState({
      token: action.token,
    });
  }

  @Action(SetBoards)
  private setBoards({ patchState }: StateContext<IState>, action: SetBoards) {
    patchState({
      boards: action.boards,
    });
  }

  @Action(SetItemToDelete)
  private setItemToDelete(
    { patchState }: StateContext<IState>,
    action: SetItemToDelete
  ) {
    patchState({
      itemToDelete: action.itemToDelete,
    });
  }

  @Action(SetNewUserStatus)
  private SetNewUserStatus(
    { patchState }: StateContext<IState>,
    action: SetNewUserStatus
  ) {
    patchState({
      isNewUser: action.isNewUser,
    });
  }

  @Action(SetCurrentLanguage)
  private setCurrentLanguage(
    { patchState }: StateContext<IState>,
    action: SetCurrentLanguage
  ) {
    patchState({
      currentLanguage: action.currentLanguage,
    });
  }

  @Action(SetUserData)
  private setUserData(
    { patchState }: StateContext<IState>,
    action: SetUserData
  ) {
    patchState({
      userData: action.userData,
    });
  }

  @Selector()
  public static token(state: IState): string {
    return state.token;
  }

  @Selector()
  public static boards(state: IState): string {
    return state.boards;
  }

  @Selector()
  public static itemToDelete(state: IState): string {
    return state.itemToDelete;
  }

  @Selector()
  public static isNewUser(state: IState): boolean {
    return state.isNewUser;
  }

  @Selector()
  public static userData(state: IState): string {
    return state.userData;
  }

  @Selector()
  public static currentLanguage(state: IState): string {
    return state.currentLanguage;
  }
}

export default PMSState;
