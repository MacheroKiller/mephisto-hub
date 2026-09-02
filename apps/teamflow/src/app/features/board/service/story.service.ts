import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Story, StoryStatus } from '../model/story.model';

@Service()
export class StoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/stories';

  listByProject(projectId: number) {
    return this.http.get<Story[]>(this.baseUrl, { params: { projectId } });
  }

  updateStatus(storyId: number, status: StoryStatus) {
    return this.http.patch<Story>(`${this.baseUrl}/${storyId}/status`, {
      status,
    });
  }
}
