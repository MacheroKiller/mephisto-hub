import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  form,
  FormField,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/auth/service/auth.service';

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal<string | null>(null);

  protected readonly credentials = signal<Credentials>({
    username: '',
    password: '',
  });

  protected readonly loginForm = form(this.credentials, (path) => {
    required(path.username, { message: 'The field is required' });
    required(path.password, { message: 'The field is required' });
  });

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage.set(null);

    await submit(this.loginForm, async () => {
      try {
        const { username, password } = this.credentials();
        await firstValueFrom(this.authService.login(username, password));
        this.router.navigate(['/']);
        return undefined;
      } catch {
        this.errorMessage.set('Usuario o contraseña incorrectos');
        return undefined;
      }
    });
  }
}
