import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IState } from './pms.interface';
import { SetAuthorisedStatus } from './pms.action';

const initialState: IState = {
  isAuthorised: false,
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

  @Selector()
  public static authorisedStatus(state: IState): boolean {
    return state.isAuthorised;
  }
}

export default PMSState;
