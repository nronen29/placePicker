import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    @ViewChild('featuresSection') featuresSection!: ElementRef;

    scrollToFeatures() {
        this.featuresSection.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
