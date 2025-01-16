import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ClarityIcons, ellipsisVerticalIcon, starIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { AuthService } from '../auth.service';
ClarityIcons.addIcons(starIcon)
ClarityIcons.addIcons(ellipsisVerticalIcon)

@Component({
  selector: 'app-main',
  imports: [ CommonModule, RouterLink, RouterOutlet, ClarityModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public route: ActivatedRoute, public auth: AuthService){}
}
