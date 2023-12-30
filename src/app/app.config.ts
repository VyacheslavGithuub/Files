import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { routes } from './app.routes';
import {provideRouter, withHashLocation} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
    ),
    provideRouter(routes, withHashLocation())]
};
