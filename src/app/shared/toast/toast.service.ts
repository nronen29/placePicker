import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts = signal<Toast[]>([]);
    private nextId = 1; // simple counter for unique IDs

    getToasts = this.toasts.asReadonly();

    show(message: string, type: Toast['type'] = 'info', duration = 4000) {
        const newToast: Toast = {
            id: this.nextId++,
            message,
            type,
            duration
        };

        // add to the list
        this.toasts.update(currentToasts => [...currentToasts, newToast]);

        // auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.remove(newToast.id);
            }, duration);
        }
    }

    success(message: string, duration?: number) {
        this.show(message, 'success', duration);
    }

    error(message: string, duration?: number) {
        this.show(message, 'error', duration);
    }

    info(message: string, duration?: number) {
        this.show(message, 'info', duration);
    }

    warning(message: string, duration?: number) {
        this.show(message, 'warning', duration);
    }

    remove(id: number) {
        this.toasts.update(currentToasts =>
            currentToasts.filter(toast => toast.id !== id)
        );
    }

    clear() {
        this.toasts.set([]);
    }
}
