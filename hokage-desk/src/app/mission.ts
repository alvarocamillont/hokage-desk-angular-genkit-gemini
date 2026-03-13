
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { take } from 'rxjs';

export interface Mission {
  id: string;
  title: string;
  difficulty: string;
  missionValue: string;
  detailedDescription: string;
  ninjaTeamLevel: string;
  assignedTeam: string;
  teamMembers: {
    name: string;
    specialty: string;
  }[];
  //imageUrl?: string;
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
        //this.generateMissionImage(response.id, definition);
      });
  }

  private generateMissionImage(missionId: string, description: string) {
    this.http
      .post<{ url: string }>('/api/mission/image', { description })
      .pipe(take(1))
      .subscribe((response) => {
        this.missions.update((missions) =>
          missions.map((m) =>
            m.id === missionId ? { ...m, imageUrl: response.url } : m
          )
        );
      });
  }

  getMissionById(id: string) {
    return computed(() => this.missions().find((mission) => mission.id === id));
  }
}
