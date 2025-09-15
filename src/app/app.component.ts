import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ErrorService } from './shared/shared/error.service';
import { ErrorModalComponent } from "./shared/shared/modal/error-modal/error-modal.component";
import { NavigationComponent } from './shared/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ErrorModalComponent, NavigationComponent],
})
export class AppComponent {
  private errorService = inject(ErrorService);

  error = this.errorService.error;


}
