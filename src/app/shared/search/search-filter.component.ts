import { Component, output, signal } from '@angular/core';

export interface SearchFilterData {
    searchTerm: string;
    region: string;
}

@Component({
    selector: 'app-search-filter',
    standalone: true,
    imports: [],
    templateUrl: './search-filter.component.html',
    styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
    searchTerm = signal('');
    selectedRegion = signal('all');

    filterChange = output<SearchFilterData>();

    onSearchChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.searchTerm.set(input.value);
        this.emitFilterChange();
    }

    onRegionChange(region: string) {
        this.selectedRegion.set(region);
        this.emitFilterChange();
    }

    clearSearch() {
        this.searchTerm.set('');
        this.emitFilterChange();
    }

    private emitFilterChange() {
        this.filterChange.emit({
            searchTerm: this.searchTerm(),
            region: this.selectedRegion()
        });
    }
}
