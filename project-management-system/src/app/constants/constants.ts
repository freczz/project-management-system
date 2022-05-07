import { IBoard, IItemToDelete, ITeam, IUser } from '../interfaces/interfaces';

export const BASE_URL: string = 'https://frecero-pms.herokuapp.com/';

export const EMPTY_USER: IUser = { login: '', password: '' };

export const EMPTY_BOARD: IBoard = { id: '', title: '' };

export const EMPTY_ITEM_TO_DELETE: IItemToDelete = {
  title: '',
  boardId: '',
  columnId: '',
  taskId: '',
};

export const team: ITeam[] = [
  {
    imgLink: 'alexey',
    firstName: 'Алексей',
    lastName: 'Виринский',
    githubLink: 'freczz',
    status: 'Team lead',
    tasks: [],
  },
  {
    imgLink: 'artur',
    firstName: 'Артур',
    lastName: 'Метельский',
    githubLink: 'ARTVVR',
    status: 'Developer',
    tasks: [],
  },
  {
    imgLink: 'vladislav',
    firstName: 'Владислав',
    lastName: 'Кочерга',
    githubLink: 'VladKocherga',
    status: 'Developer',
    tasks: [],
  },
];
