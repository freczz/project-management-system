import { IState } from '../store/pms.interface';

export interface IUser {
  login: string;
  password: string;
  name?: string;
}

export interface IToken {
  token: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface INewBoardFormData {
  title: string;
  description: string;
}

export interface ITeam {
  imgLink: string;
  firstName: ITeamLangs;
  lastName: ITeamLangs;
  githubLink: string;
  status: string;
  githubName: string;
  tasks: string[];
}

export interface ITeamLangs {
  en: string;
  ru: string;
}

export interface IItemToDelete {
  title: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface IStore {
  PMSState: IState;
}
