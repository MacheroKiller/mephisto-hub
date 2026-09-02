import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

const TOKEN_STORAGE_KEY = 'teamflow-auth-token';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(this.readStoredToken());

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>('/api/auth/login', {
        username,
        password,
      } satisfies LoginRequest)
      .pipe(
        tap((response) => {
          this.token.set(response.token);
          localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        }),
      );
  }

  logout(): void {
    this.token.set(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.token() !== null;
  }

  private readStoredToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}
