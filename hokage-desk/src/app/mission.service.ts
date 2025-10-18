
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';

export interface Mission {
  difficulty: string;
  missionValue: string;
  detailedDescription: string;
  ninjaTeamLevel: string;
  assignedTeam: string;
  teamMembers: {
    name: string;
    specialty: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  missions = signal<Mission[]>([]);

  private readonly http = inject(HttpClient);

  createMission(definition: string) {
    this.http
      .post<Mission>('/api/mission', { definition })
      .pipe(take(1))
      .subscribe((response) => {
        this.missions.update((missions) => [...missions, response]);
      });
  }
}
