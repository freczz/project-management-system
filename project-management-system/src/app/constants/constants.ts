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
    imgLink: '../../../assets/jpg/alexey.jpg',
    firstName: 'Алексей',
    lastName: 'Виринский',
    githubLink: 'https://github.com/freczz',
    githubName: 'freczz',
    status: 'Team lead',
    tasks: [''],
  },
  {
    imgLink: '../../../assets/jpg/artur.jpg',
    firstName: 'Артур',
    lastName: 'Метельский',
    githubLink: 'https://github.com/ARTVVR',
    githubName: 'ARTVVR',
    status: 'Developer',
    tasks: [''],
  },
  {
    imgLink: '../../../assets/jpg/vladislav.jpg',
    firstName: 'Владислав',
    lastName: 'Кочерга',
    githubLink: 'https://github.com/VladKocherga',
    githubName: 'VladKocherga',
    status: 'Developer',
    tasks: [''],
  },
];
