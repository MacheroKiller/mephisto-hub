import { Component, effect, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const THEME_STORAGE_KEY = 'mephisto-hub-theme';

type ThemePreference = 'dark' | 'light';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [MatIconModule],
})
export class Navbar {
  protected readonly isDark = signal(this.readInitialPreference() === 'dark');

  protected readonly toggleThemeEffect = effect(() => {
    this.applyToDocument(this.isDark() ? 'dark' : 'light');
  });

  protected toggleTheme(event: MouseEvent): void {
    const nextPreference: ThemePreference = this.isDark() ? 'light' : 'dark';

    // Fallback si el navegador no soporta View Transitions (ej. Firefox aún incompleto)
    if (!document.startViewTransition) {
      this.applyPreference(nextPreference);
      return;
    }

    // Coordenadas del click, para que la expansión nazca desde el botón
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      this.applyPreference(nextPreference);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  }

  private applyPreference(preference: ThemePreference): void {
    this.isDark.set(preference === 'dark');
    this.applyToDocument(preference);
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  }

  private readInitialPreference(): ThemePreference {
    const stored = localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as ThemePreference | null;
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return 'dark';
  }

  private applyToDocument(preference: ThemePreference): void {
    document.documentElement.style.colorScheme = preference;
  }
}
