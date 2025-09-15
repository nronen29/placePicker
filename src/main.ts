import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { PlacesPageComponent } from './app/places/places-page.component';

const routes = [
    { path: '', component: HomeComponent },
    { path: 'places', component: PlacesPageComponent },
    { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideRouter(routes)
    ]
}).catch((err) => console.error(err));
