import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly missionService = inject(MissionService);

  mission = this.missionService.getMissionById(
    this.route.snapshot.paramMap.get('id')!
  );
}
