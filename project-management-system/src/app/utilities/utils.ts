import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INITIAL_ORDER } from '../constants/constants';
import { IBoard, IColumns, ITasks } from '../interfaces/interfaces';

export default function filterItems(
  items: IBoard[],
  searchValue: string
): IBoard[] {
  return searchValue
    ? items.filter(
        (item: IBoard): boolean =>
          searchValue.toLowerCase() ===
          item.title.toLowerCase().substr(0, searchValue.length)
      )
    : items;
}

export function setColumnFormGroup(): FormGroup {
  return new FormGroup({
    title: new FormControl('', Validators.minLength(1)),
    description: new FormControl('', Validators.maxLength(255)),
  });
}

export function setNewOrder(data: IColumns[] | ITasks[]): number {
  let max: number = INITIAL_ORDER;
  data.forEach((v: IColumns | ITasks): void => {
    max += Math.round(v.order / 2);
  });
  return max;
}
