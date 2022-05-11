import { IBoard, IItemToDelete, ITeam, IUser } from '../interfaces/interfaces';

export const BASE_URL: string = 'https://freczz-pms.herokuapp.com/';

export const EMPTY_USER: IUser = { login: '', password: '' };

export const EMPTY_BOARD: IBoard = { id: '', title: '', description: '' };

export const EMAIL_PATTERN: string =
  '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const EMPTY_ITEM_TO_DELETE: IItemToDelete = {
  title: '',
  boardId: '',
  columnId: '',
  taskId: '',
};

export const PASSWORD_MIN_LENGTH: number = 8;

export const PASSWORD_PATTERN: string =
  '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$';
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
