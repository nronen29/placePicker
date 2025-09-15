import { Component, input, output } from '@angular/core';

import { Place } from './place.model';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();
  showRemoveButton = input<boolean>(false); // whether to show X button for removing

  onSelectPlace(selectedPlace: Place) {
    this.selectPlace.emit(selectedPlace);
  }
}
