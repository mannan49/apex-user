import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchTerm: string = '';
  noResultsMessage: string = '';

  constructor(private blogService: BlogService) {}

  onSearchChange(searchValue: string) {
    this.searchTerm = searchValue;
    this.blogService.filterBlogs(this.searchTerm);
    this.blogService.filteredBlogs$.subscribe((filteredBlogs) => {
      if (filteredBlogs.length === 0 && this.searchTerm) {
        this.noResultsMessage = "Search Something Else!!!";
      } else {
        this.noResultsMessage = '';
      }
    });
  }



  onSearch(event: Event) {
    event.preventDefault(); 
  }

}
