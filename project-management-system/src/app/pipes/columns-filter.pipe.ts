import { Pipe, PipeTransform } from '@angular/core';
import { IColumns } from '../interfaces/interfaces';

@Pipe({
  name: 'columnsFilter',
})
export default class ColumnsFilterPipe implements PipeTransform {
  private dataColumns: IColumns[] = [];

  public transform(value: IColumns[]): IColumns[] {
    this.dataColumns = value;
    return this.dataColumns.sort(
      (a: IColumns, b: IColumns): number => a.order - b.order
    );
  }
}
