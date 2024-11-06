import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private PlatformLocation : PlatformLocation){
    history.pushState(null, '', location.href);

    this.PlatformLocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
