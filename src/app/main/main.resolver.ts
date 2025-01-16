import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const mainResolver: ResolveFn<any> = (route, state) => {
  return of({demo: 'Hello from Main Resolver!'});
};
