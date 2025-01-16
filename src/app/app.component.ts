import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ClarityModule } from '@clr/angular'
import { ClarityIcons, ellipsisVerticalIcon, starIcon} from '@cds/core/icon';
import { AppService } from './app.service';
import { filter, map, Observable, shareReplay, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { fadeInOut } from './animations';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ClarityModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeInOut]
})
export class AppComponent implements OnDestroy {
  title = 'prompt-builder';
  navigating: Observable<NavigationStart | null>
  private subs = [] as Subscription[]
  constructor(public app: AppService, private router: Router, private auth: AuthService){
    ClarityIcons.addIcons(starIcon)
    ClarityIcons.addIcons(ellipsisVerticalIcon)
    this.navigating = router.events.pipe(
      filter(e => {
        if (e instanceof NavigationStart) return true
        if (e instanceof NavigationEnd) return true
        return false
      }),
      map(e => {
        if (e instanceof NavigationStart) return e
        return null
      }),
      shareReplay(1)
    )
    this.subs.push(this.navigating.subscribe())
  }
  ngOnDestroy(): void {
    for(let sub of this.subs) sub?.unsubscribe()
  }
}
