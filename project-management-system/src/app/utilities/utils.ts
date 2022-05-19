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
  const items: number[] = [];
  data.forEach((v: IColumns | ITasks): void => {
    items.push(v.order);
  });
  return items.length ? Math.max(...items) + INITIAL_ORDER : INITIAL_ORDER;
}

export function sortItems(items: IColumns[] | ITasks[]): IColumns[] | ITasks[] {
  return items.sort(
    (a: IColumns | ITasks, b: IColumns | ITasks): number => a.order - b.order
  );
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
