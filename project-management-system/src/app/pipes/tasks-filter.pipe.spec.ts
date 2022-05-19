import TasksFilterPipe from './tasks-filter.pipe';

describe('TasksFilterPipe', () => {
  it('create an instance', () => {
    const pipe: TasksFilterPipe = new TasksFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
