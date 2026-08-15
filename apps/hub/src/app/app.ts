import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { Experience } from './features/experience/experience';
import { Hero } from './features/hero/hero';
import { Registry } from './features/registry/registry';

@Component({
  imports: [RouterModule, Navbar, Hero, Registry, About, Experience, Contact],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'hub';
}
