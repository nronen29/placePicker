import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { DestroyRef } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { LoadingSkeletonComponent } from '../../shared/loading/loading-skeleton.component';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent, LoadingSkeletonComponent, RouterLink],
})


export class UserPlacesComponent implements OnInit {
  error = signal('');
  isFetching = signal(false);

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);

  places = this.placesService.loadedUserPlaces; // get user's saved places

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces()
      .subscribe({
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

  onRemovePlace(place: Place) {
    // remove place from user's favorites
    const sub = this.placesService.removeUserPlace(place)
      .subscribe({
        next: () => {
          this.toastService.success(`${place.title} removed from favorites`);
        },
        error: (err) => {
          this.toastService.error(err.message || 'Failed to remove place');
        }
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onRetry() {
    this.error.set('');
    this.ngOnInit();
  }
}


