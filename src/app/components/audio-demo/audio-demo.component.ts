import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-audio-demo',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audio-demo.component.html',
  styleUrl: './audio-demo.component.less'
})
export class AudioDemoComponent {
  @Output() readonly audioPlay = new EventEmitter<void>();
}
