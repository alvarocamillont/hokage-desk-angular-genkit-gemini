import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DetailComponent {

}
