import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MissionService } from '../mission.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class DashboardComponent {
  private readonly missionService = inject(MissionService);

  missionDefinition = signal('');
  missions = this.missionService.missions;

  createMission() {
    this.missionService.createMission(this.missionDefinition());
    this.missionDefinition.set('');
    console.log(this.missions())
  }
}