import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Story, StoryStatus } from './model/story.model';
import { StoryService } from './service/story.service';

interface ColumnDef {
  status: StoryStatus;
  label: string;
}

const COLUMNS: ColumnDef[] = [
  { status: 'TODO', label: 'TODO' },
  { status: 'IN_PROGRESS', label: 'IN PROGRESS' },
  { status: 'DONE', label: 'DONE' },
];

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board implements OnInit {
  private readonly storyService = inject(StoryService);

  protected readonly columns = COLUMNS;
  protected readonly stories = signal<Story[]>([]);

  // Un projectId fijo por ahora — lo resolvemos con selector de proyecto en una fase futura
  private readonly projectId = 1;

  ngOnInit(): void {
    this.storyService.listByProject(this.projectId).subscribe((stories) => {
      this.stories.set(stories);
    });
  }

  protected storiesByStatus(status: StoryStatus) {
    return computed(() => this.stories().filter((s) => s.status === status));
  }

  protected connectedLists(): string[] {
    return this.columns.map((c) => `column-${c.status}`);
  }

  protected initials(assigneeId: number | null): string {
    return assigneeId ? 'ME' : '?';
  }

  protected onDrop(event: CdkDragDrop<Story[]>, newStatus: StoryStatus): void {
    const story = event.item.data as Story;

    if (event.previousContainer === event.container) {
      // Reordenar dentro de la misma columna — solo afecta el orden visual local
      return;
    }

    // Actualización optimista: cambia el estado local antes de confirmar con el backend
    this.stories.update((stories) =>
      stories.map((s) => (s.id === story.id ? { ...s, status: newStatus } : s)),
    );

    this.storyService.updateStatus(story.id, newStatus).subscribe({
      error: () => {
        // Si falla, revertimos el cambio optimista
        this.stories.update((stories) =>
          stories.map((s) =>
            s.id === story.id ? { ...s, status: story.status } : s,
          ),
        );
      },
    });
  }
}
