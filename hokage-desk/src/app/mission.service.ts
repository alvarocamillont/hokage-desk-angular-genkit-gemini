
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { take } from 'rxjs';

export interface Mission {
  id: string;
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
  loading = signal(false);

  private readonly http = inject(HttpClient);

  createMission(definition: string) {
    this.loading.set(true);
    this.http
      .post<Mission>('/api/mission', { definition })
      .pipe(take(1))
      .subscribe((response) => {
        this.missions.update((missions) => [...missions, response]);
        this.loading.set(false);
      });
  }

  getMissionById(id: string) {
    return computed(() => this.missions().find((mission) => mission.id === id));
  }
}
