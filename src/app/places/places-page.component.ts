import { Component } from '@angular/core';
import { AvailablePlacesComponent } from './available-places/available-places.component';
import { UserPlacesComponent } from './user-places/user-places.component';

@Component({
    selector: 'app-places-page',
    standalone: true,
    imports: [AvailablePlacesComponent, UserPlacesComponent],
    templateUrl: './places-page.component.html',
    styleUrl: './places-page.component.css'
})
export class PlacesPageComponent {

}
