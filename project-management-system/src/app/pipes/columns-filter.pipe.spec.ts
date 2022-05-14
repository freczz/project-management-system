import ColumnsFilterPipe from './columns-filter.pipe';

describe('ColumnsFilterPipe', (): void => {
  it('create an instance', (): void => {
    const pipe: ColumnsFilterPipe = new ColumnsFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
