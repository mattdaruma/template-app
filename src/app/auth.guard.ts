import { ActivatedRouteSnapshot, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild{
  private amAuthed: Observable<boolean>
  constructor(private auth: AuthService, private router: Router){
    this.amAuthed = this.auth.token.pipe(
      map(t => t === null ? false : true),
      tap(a => {
        if(!a) this.router.navigate(['/sign-in'])
      }),
      shareReplay(1)
    )
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.amAuthed
  }
}