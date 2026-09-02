import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar, NavLink } from '@mephisto-hub/design-system-ui';

const TEAMFLOW_LINKS: NavLink[] = [{ label: 'BOARD', href: '/' }];

@Component({
  selector: 'app-authenticated-layout',
  imports: [RouterOutlet, Navbar],
  template: `<app-navbar
      [links]="links"
      homelabel="TeamFlow - inicio"
    ></app-navbar>
    <router-outlet></router-outlet> `,
})
export class AuthenticatedLayout {
  protected readonly links = TEAMFLOW_LINKS;
}
