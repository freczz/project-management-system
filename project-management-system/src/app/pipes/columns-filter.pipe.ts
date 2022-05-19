import { Pipe, PipeTransform } from '@angular/core';
import { IColumns } from '../interfaces/interfaces';
import { sortItems } from '../utilities/utils';

@Pipe({
  name: 'columnsFilter',
})
export default class ColumnsFilterPipe implements PipeTransform {
  private dataColumns: IColumns[] = [];

  public transform(value: IColumns[]): IColumns[] {
    this.dataColumns = value;
    return sortItems(this.dataColumns) as IColumns[];
  }
}
