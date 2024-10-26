import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MessageComponent} from '../message/message.component';
import {TuiAppearance, TuiScrollbar, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';

@Component({
  selector: 'app-content-block',
  standalone: true,
  imports: [
    MessageComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiScrollbar,
    TuiTitle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-block.component.html',
  styleUrl: './content-block.component.less'
})
export class ContentBlockComponent {
  @Input({required: true}) label: string = 'Empty';
}
