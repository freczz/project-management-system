import { IBoard } from '../interfaces/interfaces';

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
