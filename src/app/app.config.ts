import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    NG_EVENT_PLUGINS,
    importProvidersFrom(HttpClientModule)
  ]
};
