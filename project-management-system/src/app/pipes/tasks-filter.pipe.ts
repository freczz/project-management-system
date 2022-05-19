import { Pipe, PipeTransform } from '@angular/core';
import { ITasks } from '../interfaces/interfaces';
import { sortItems } from '../utilities/utils';

@Pipe({
  name: 'tasksFilter',
})
export default class TasksFilterPipe implements PipeTransform {
  private dataTasks: ITasks[] = [];

  public transform(value: ITasks[]): ITasks[] {
    this.dataTasks = value;
    return sortItems(this.dataTasks) as ITasks[];
  }
}
