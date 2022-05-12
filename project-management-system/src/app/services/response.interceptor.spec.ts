import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import environment from 'src/environments/environment';
import PMSState from '../store/pms.state';

import ResponseInterceptor from './response.interceptor';

describe('ResponseInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ResponseInterceptor],
      imports: [
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
      ],
    })
  );

  it('should be created', () => {
    const interceptor: ResponseInterceptor =
      TestBed.inject(ResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
