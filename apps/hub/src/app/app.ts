import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { Experience } from './features/experience/experience';
import { Hero } from './features/hero/hero';
import { Registry } from './features/registry/registry';
import { Navbar, NavLink } from '@mephisto-hub/design-system-ui';

const HUB_LINKS: NavLink[] = [
  { label: 'PROJECTS', href: '#projects', type: 'anchor' },
  { label: 'SYSTEMS', href: '#systems', type: 'anchor' },
  { label: 'REGISTRY', href: '#registry', type: 'anchor' },
  { label: 'ARCHIVE', href: '#archive', type: 'anchor' },
];

@Component({
  imports: [RouterModule, Navbar, Hero, Registry, About, Experience, Contact],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'hub';
  protected readonly hubLinks = HUB_LINKS;
}
