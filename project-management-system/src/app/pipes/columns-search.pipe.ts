import { Pipe, PipeTransform } from '@angular/core';
import { IColumns } from '../interfaces/interfaces';
import { filterColumns } from '../utilities/utils';

@Pipe({
  name: 'columnsSearch',
})
export default class ColumnsSearchPipe implements PipeTransform {
  private dataColumns: IColumns[] = [];

  public transform(items: IColumns[], value: string): IColumns[] {
    this.dataColumns = items;
    return filterColumns(this.dataColumns, value);
  }
}
