import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Searchy} from '../../models';
import {MessageComponent} from '../message/message.component';
import {TuiLink} from '@taiga-ui/core';

@Component({
  selector: 'app-searchy-block',
  standalone: true,
  imports: [
    TuiLink,
    MessageComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './searchy-block.component.html',
  styleUrl: './searchy-block.component.less'
})
export class SearchyBlockComponent {
  @Input({required: true}) data!: Searchy;
}
