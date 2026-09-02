import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { Experience } from './features/experience/experience';
import { Hero } from './features/hero/hero';
import { Registry } from './features/registry/registry';
import { Navbar, NavLink } from '@mephisto-hub/design-system-ui';
import { ProjectRegistryService } from './features/registry/service/project-registry.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { mapManifestToRegistryEntry } from './features/registry/mapper/project-manifest.mapper';

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
  private readonly projectRegistry = inject(ProjectRegistryService);

  protected title = 'hub';
  protected readonly hubLinks = HUB_LINKS;

  projectRegistryList = toSignal(this.projectRegistry.listAll(), {
    initialValue: [],
  });
  projectRegistryComputed = computed(() =>
    this.projectRegistryList().map(mapManifestToRegistryEntry),
  );
}
