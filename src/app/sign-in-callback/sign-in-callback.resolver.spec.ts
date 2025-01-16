import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { signInCallbackResolver } from './sign-in-callback.resolver';

describe('signInCallbackResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => signInCallbackResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
