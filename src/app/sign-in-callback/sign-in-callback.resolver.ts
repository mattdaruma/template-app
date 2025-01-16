import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const signInCallbackResolver: ResolveFn<any> = (route, state) => {
  const router = inject(Router)
  const auth = inject(AuthService)

  let token = route.queryParams['token']
  if(!token){
    router.navigate(['/'])
    return
  }
  auth.token.next(token)
  router.navigate(['/', 'main'])
  return
};
