import { inject, Service } from '@angular/core';
import { ProjectManifest } from '../model/project-manifest.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Service()
export class ProjectRegistryService {
  private readonly http = inject(HttpClient);

  listAll() {
    return this.http.get<ProjectManifest[]>(`${environment.apiUrl}/projects`);
  }
}
