import {TuiAppearance, TuiRoot, TuiScrollbar, TuiTitle} from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {AudioDemoComponent} from './components/audio-demo/audio-demo.component';
import {MessageComponent} from './components/message/message.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentBlockComponent} from './components/content-block/content-block.component';
import {ApiService} from './services/api.service';
import {handleChat, handleSearchy} from './utils';
import {Searchy} from './models';
import {SearchyBlockComponent} from './components/searchy-block/searchy-block.component';

const MOCK_MESSAGES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

const SEARCHY_MOCK: Searchy = {
  title: 'Тарифы по вкладам',
  text: 'Тариф  СмартВклад ТПД 3.0  на русском языке. Тариф  СмартВклад ТПД 3.0  на английском языке. Тариф –  Вклад для сотрудников . Общую информацию о вкладе смотри тут .',
  link: 'http://www.example.com'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, TuiCardLarge, TuiHeader, TuiTitle, TuiAppearance, AudioDemoComponent, MessageComponent, HeaderComponent, TuiScrollbar, ContentBlockComponent, SearchyBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  protected readonly chatMessages = signal<string[]>([]);
  protected readonly llmMessages = signal<string[]>([]);
  protected readonly searchyMessages = signal<Searchy[]>([]);
  protected readonly procedures = signal<Searchy[]>([]);

  ngOnInit() {
    this.handleStreamData();
  }

  initAudio() {
    this.apiService.startCall().subscribe();
  }

  private handleStreamData() {
    this.apiService.chatStream().subscribe((res) => {
      const typeMap: {[key: string]: (res: any) => void} = {
        ['chat']: (res: any) => this.chatMessages.update((messages) => handleChat(messages, res.message)),
        ['article']: (res: any) => this.searchyMessages.update((messages) => [...messages, ...handleSearchy(res.data)]),
        ['procedure']: (res: any) => this.procedures.update((messages) => [...messages, ...handleSearchy(res.data)]),
        ['llm']: (res: any) => this.llmMessages.update((messages) => [...messages, res.data]),
      }

      res = JSON.parse(res)

      typeMap[res.type](res)

      if (res.type === 'article') {
        console.log(res.search_str)
      }
    })
  }
}
