import {
  IBoard,
  IItemToDelete,
  ITeam,
  IUser,
  IUserData,
} from '../interfaces/interfaces';

export const BASE_URL: string = 'https://freczz-pms.herokuapp.com/';

export const EMPTY_USER: IUser = { login: '', password: '' };

export const EMPTY_USER_DATA: IUserData = {
  id: '',
  name: '',
  login: '',
  password: '',
};

export const EMPTY_BOARD: IBoard = { id: '', title: '', description: '' };

export const EMAIL_PATTERN: string =
  '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z.]{2,}$';

export const EMPTY_ITEM_TO_DELETE: IItemToDelete = {
  userId: '',
  title: '',
  boardId: '',
  columnId: '',
  taskId: '',
};

export const PASSWORD_MIN_LENGTH: number = 8;

export const INITIAL_ORDER: number = 1;

export const PASSWORD_PATTERN: string =
  '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$';

export const team: ITeam[] = [
  {
    imgLink: '../../../assets/jpg/alexey.jpg',
    firstName: {
      en: 'Alexey',
      ru: 'Алексей',
    },
    lastName: {
      en: 'Virinskiy',
      ru: 'Виринский',
    },
    githubLink: 'https://github.com/freczz',
    githubName: 'freczz',
    status: {
      en: 'Team lead',
      ru: 'Лидер Команды',
    },
    tasks: [
      {
        en: 'Main Page',
        ru: 'Главная Страница',
      },
      {
        en: 'Authorization',
        ru: 'Авторизация',
      },
    ],
  },
  {
    imgLink: '../../../assets/jpg/artur.jpg',
    firstName: {
      en: 'Artur',
      ru: 'Артур',
    },
    lastName: {
      en: 'Metelskiy',
      ru: 'Метельский',
    },
    githubLink: 'https://github.com/ARTVVR',
    githubName: 'ARTVVR',
    status: {
      en: 'Developer',
      ru: 'Разработчик',
    },
    tasks: [
      {
        en: 'Board Page',
        ru: 'Страница Доски',
      },
    ],
  },
  {
    imgLink: '../../../assets/jpg/vladislav.jpg',
    firstName: {
      en: 'Vladislav',
      ru: 'Владислав',
    },
    lastName: {
      en: 'Kocherga',
      ru: 'Кочерга',
    },
    githubLink: 'https://github.com/VladKocherga',
    githubName: 'VladKocherga',
    status: {
      en: 'Developer',
      ru: 'Разработчик',
    },
    tasks: [
      {
        en: 'Welcome Page',
        ru: 'Страница Приветствия',
      },
    ],
  },
];

export enum ItemTitle {
  user = 'the user',
  board = 'the board',
  column = 'the column',
  task = 'the task',
}

export const INITIAL_Z_INDEX = '0';

export const MAX_Z_INDEX = '110';

export const MAX_BOARD_TITLE_LENGTH = 30;
