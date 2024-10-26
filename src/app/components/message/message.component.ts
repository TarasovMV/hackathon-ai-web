import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './message.component.html',
  styleUrl: './message.component.less'
})
export class MessageComponent {

}
