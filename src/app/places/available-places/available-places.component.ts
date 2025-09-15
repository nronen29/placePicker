import { Component, DestroyRef, inject, signal, OnInit, computed } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';
import { SearchFilterComponent, SearchFilterData } from '../../shared/search/search-filter.component';
import { LoadingSkeletonComponent } from '../../shared/loading/loading-skeleton.component';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent, SearchFilterComponent, LoadingSkeletonComponent],
})

export class AvailablePlacesComponent implements OnInit {
  error = signal('');
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  searchFilter = signal<SearchFilterData>({ searchTerm: '', region: 'all' });

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  private toastService = inject(ToastService);

  // Computed property for filtered places
  filteredPlaces = computed(() => {
    const places = this.places();
    const filter = this.searchFilter();

    if (!places) return undefined;

    return places.filter(place => {
      // Search term filter
      const matchesSearch = !filter.searchTerm ||
        place.title.toLowerCase().includes(filter.searchTerm.toLowerCase());

      // Region filter (basic implementation based on coordinates)
      const matchesRegion = filter.region === 'all' || this.getRegionFromCoords(place);

      return matchesSearch && matchesRegion;
    });
  });



  ngOnInit() {
    this.isFetching.set(true);
    const subscription =
      this.placesService.loadAvailablePlaces()
        .subscribe({
          next: (places) => {
            this.places.set(places);
          },
          error: (error: Error) => {
            this.error.set(error.message);
          },
          complete: () => {
            this.isFetching.set(false);
          }
        });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => {
          this.toastService.success(`${selectedPlace.title} added to your favorites!`);
        },
        error: (error) => {
          this.toastService.error(error.message || 'Failed to add place');
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onFilterChange(filterData: SearchFilterData) {
    this.searchFilter.set(filterData);
  }

  onRetry() {
    this.error.set('');
    this.ngOnInit();
  }

  private getRegionFromCoords(place: Place): boolean {
    const { lat, lon } = place;
    const region = this.searchFilter().region;

    // Simple region detection based on coordinates
    switch (region) {
      case 'europe':
        return lat >= 35 && lat <= 70 && lon >= -10 && lon <= 70;
      case 'asia':
        return lat >= -10 && lat <= 70 && lon >= 70 && lon <= 180;
      case 'americas':
        return lon >= -180 && lon <= -30;
      case 'africa':
        return lat >= -35 && lat <= 35 && lon >= -20 && lon <= 50;
      default:
        return true;
    }
  }



}




