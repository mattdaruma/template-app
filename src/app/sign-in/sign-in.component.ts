import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fadeInOut } from '../animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [ CommonModule, ClarityModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  animations: [fadeInOut]
})
export class SignInComponent implements OnDestroy{
  private subs = [] as Subscription[]
  tokenInput = new FormControl('')
  viewReady: boolean = false
  constructor(public auth: AuthService, private router: Router){
    this.subs.push(auth.token.subscribe(v => {
      if(v !== null) router.navigate(['/', 'main'])
    }))
    setTimeout(()=>{
      this.viewReady = true
    }, 10)
  }
  goToCallback(){
    this.router.navigate(['/', 'sign-in-callback'], { queryParams: { token: this.tokenInput.value }})
  }
  ngOnDestroy(): void {
    for(let sub of this.subs) sub?.unsubscribe()
  }
}
