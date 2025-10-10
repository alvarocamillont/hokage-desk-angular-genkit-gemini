import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { DetailComponent } from './detail/detail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, DetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hokage-desk');
}
