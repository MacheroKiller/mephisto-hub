import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '@mephisto-hub/design-system-ui';

@Component({
  imports: [RouterModule, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'teamflow';
}
