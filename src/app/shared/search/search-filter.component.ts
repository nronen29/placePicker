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
    selectedRegion = signal('all'); // default to show all places

    filterChange = output<SearchFilterData>();

    onSearchChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.searchTerm.set(input.value);
        this.updateFilters();
    }

    onRegionChange(region: string) {
        this.selectedRegion.set(region);
        this.updateFilters();
    }

    clearSearch() {
        this.searchTerm.set('');
        this.updateFilters(); // update filters after clearing
    }

    // emit the current filter state
    private updateFilters() {
        this.filterChange.emit({
            searchTerm: this.searchTerm(),
            region: this.selectedRegion()
        });
    }
}
