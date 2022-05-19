import { IState } from '../store/pms.interface';

export interface IUser {
  login: string;
  password: string;
  name?: string;
}

export interface IUserData {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IUsers {
  id: string;
  name: string;
  login: string;
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

export interface IEditProfileFormData {
  name: string;
  login: string;
  password: string;
}

export interface ITeam {
  imgLink: string;
  firstName: ITeamLangs;
  lastName: ITeamLangs;
  githubLink: string;
  status: ITeamLangs;
  githubName: string;
  tasks: ITeamLangs[];
}

export interface ITeamLangs {
  en: string;
  ru: string;
}

export interface IItemToDelete {
  userId: string;
  title: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface IStore {
  PMSState: IState;
}

export interface IResponse {
  columns: IColumns[];
  description: string;
  id: string;
  title: string;
}

export interface IColumns {
  id: string;
  order: number;
  tasks: ITasks[];
  title: string;
}

export interface ITasks {
  boardId: string;
  columnId: string;
  description: string;
  done: boolean;
  files?: IFiles[];
  id: string;
  order: number;
  title: string;
  userId: string;
}

export interface IFiles {
  filename: string;
  fileSize: number;
}

export interface IPostColumns {
  id?: string;
  title: string;
  order: number;
}

export interface IPostTasks {
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
}

export interface IPutTasks {
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  id?: string;
}
