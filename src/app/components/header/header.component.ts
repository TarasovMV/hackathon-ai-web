import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AudioDemoComponent} from '../audio-demo/audio-demo.component';
import {MessageComponent} from '../message/message.component';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AudioDemoComponent,
    MessageComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
