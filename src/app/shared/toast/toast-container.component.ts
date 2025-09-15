import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast-container',
    standalone: true,
    imports: [],
    templateUrl: './toast-container.component.html',
    styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent {
    private toastService = inject(ToastService);

    toasts = this.toastService.getToasts;

    closeToast(id: number) {
        this.toastService.remove(id);
    }
}
