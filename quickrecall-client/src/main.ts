
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './app/auth/token.interceptor'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
}).catch(err => console.error(err));
