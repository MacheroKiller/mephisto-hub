export type StoryStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Story {
  id: number;
  projectId: number;
  assigneeId: number | null;
  title: string;
  description: string | null;
  status: StoryStatus;
  createdAt: string;
  updatedAt: string;
}
