import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import{BrowserAnimationsModule}from '@angular/platform-browser/animations';






export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideToastr(),importProvidersFrom([BrowserAnimationsModule])]
};
