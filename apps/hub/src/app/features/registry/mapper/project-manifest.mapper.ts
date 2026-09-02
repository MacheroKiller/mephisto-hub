import { ProjectManifest } from '../model/project-manifest.model';
import { ProjectStatus, RegistryEntry } from '../model/registry.model';

const STATUS_MAP: Record<string, ProjectStatus> = {
  deployed: 'deployed',
  active: 'active',
  staging: 'staging',
};

function toCode(id: string): string {
  return id
    .split('-')
    .map((word) => word.slice(0, 3).toUpperCase())
    .join('-');
}

export function mapManifestToRegistryEntry(
  manifest: ProjectManifest,
): RegistryEntry {
  return {
    code: toCode(manifest.id),
    name: manifest.name,
    status: STATUS_MAP[manifest.status] ?? 'staging',
  };
}
