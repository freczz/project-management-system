import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IState } from './pms.interface';
import { SetAuthorisedStatus, SetToken, SetBoards, SetItemToDelete, SetNewUserStatus } from './pms.action';

const initialState: IState = {
  isAuthorised: false,
  token: '',
  boards: '[]',
  itemToDelete: '',
  isNewUser: false
};

@State<IState>({
  name: 'PMSState',
  defaults: initialState,
})
@Injectable()
class PMSState {
  @Action(SetAuthorisedStatus)
  private setAuthorisedStatus(
    { patchState }: StateContext<IState>,
    action: SetAuthorisedStatus
  ) {
    patchState({
      isAuthorised: action.isAuthorised,
    });
  }

  @Action(SetToken)
  private setToken(
    { patchState }: StateContext<IState>,
    action: SetToken
  ) {
    patchState({
      token: action.token,
    });
  }

  @Action(SetBoards)
  private setBoards(
    { patchState }: StateContext<IState>,
    action: SetBoards
  ) {
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

  @Selector()
  public static SetNewUserStatus(state: IState): boolean {
    return state.isNewUser;
  }

  @Selector()
  public static authorisedStatus(state: IState): boolean {
    return state.isAuthorised;
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
}

export default PMSState;
