export type ProjectStatus = 'deployed' | 'active' | 'staging';

export interface RegistryEntry {
  code: string;
  name: string;
  status: ProjectStatus;
}
