import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  BASE_URL,
  INITIAL_ORDER,
  MAX_BOARD_TITLE_LENGTH,
} from '../constants/constants';
import { IBoard, IColumns, ITasks } from '../interfaces/interfaces';

export function filterItems(items: IBoard[], searchValue: string): IBoard[] {
  return searchValue
    ? items.filter(
        (item: IBoard): boolean =>
          searchValue.toLowerCase() ===
          item.title.toLowerCase().substr(0, searchValue.length)
      )
    : items;
}

export function filterTitle(value: string): string {
  if (value.length >= MAX_BOARD_TITLE_LENGTH) {
    return `${value.substring(0, MAX_BOARD_TITLE_LENGTH)}...`;
  }
  return value;
}

export function filterColumns(
  items: IColumns[],
  searchValue: string
): IColumns[] {
  return searchValue
    ? items.filter(
        (item: IColumns): boolean =>
          searchValue.toLowerCase() ===
          item.title.toLowerCase().substr(0, searchValue.length)
      )
    : items;
}

export function setRequestLink(boardId: string, columnId: string): string {
  return `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`;
}

export function setColumnFormGroup(): FormGroup {
  return new FormGroup({
    title: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.minLength(1)),
  });
}

export function setNewOrder(data: IColumns[] | ITasks[]): number {
  let max: number = INITIAL_ORDER;
  data.forEach((v: IColumns | ITasks): void => {
    max += Math.round(v.order / 2);
  });
  return max;
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
