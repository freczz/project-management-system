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
}

export interface INewBoardFormData {
  title: string;
}

export interface ITeam {
  imgLink: string;
  firstName: string;
  lastName: string;
  githubLink: string;
  status: string;
  githubName: string;
  tasks: string[];
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
