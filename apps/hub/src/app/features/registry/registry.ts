import { Component, input } from '@angular/core';
import { RegistryEntry } from './model/registry.model';

const DEFAULT_ENTRIES: RegistryEntry[] = [
  { code: 'S-MGR', name: 'Sprint Management Tool', status: 'deployed' },
  { code: 'FIN-SYS', name: 'Financial Core', status: 'active' },
  { code: 'MED-FLOW', name: 'Hospital OS', status: 'staging' },
];

@Component({
  selector: 'app-registry',
  imports: [],
  templateUrl: './registry.html',
  styleUrl: './registry.scss',
})
export class Registry {
  readonly entries = input<RegistryEntry[]>(DEFAULT_ENTRIES);
}
