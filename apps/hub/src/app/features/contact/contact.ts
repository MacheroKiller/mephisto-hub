import { Component, input } from '@angular/core';
import { ContactLink } from './model/contact.model';

const DEFAULT_LINKS: ContactLink[] = [
  {
    label: 'EMAIL',
    value: 'stevan1533@gmail.com',
    href: 'mailto:stevan1533@gmail.com',
  },
  {
    label: 'LINKEDIN',
    value: 'Amin E. Barbosa V.',
    href: 'https://www.linkedin.com/in/amin-e-barbosa-v-b5881a244',
  },
  {
    label: 'GITHUB',
    value: '@MacheroKiller',
    href: 'https://github.com/MacheroKiller',
  },
];

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly links = input<ContactLink[]>(DEFAULT_LINKS);
}
