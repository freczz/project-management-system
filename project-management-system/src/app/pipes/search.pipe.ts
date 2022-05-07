import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../interfaces/interfaces';
import filterItems from '../utilities/utils';

@Pipe({
  name: 'search',
})
export default class SearchPipe implements PipeTransform {
  private items: IBoard[] = [];

  public transform(items: IBoard[], searchValue: string = ''): IBoard[] {
    this.items = items;
    return filterItems(this.items, searchValue);
  }
}
