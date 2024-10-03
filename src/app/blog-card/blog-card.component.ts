import { Component, inject, Input } from '@angular/core';
import { Blog } from '../single-blog/blog.model';
import { RouterModule } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent {
  @Input() blog!: Blog;

  private blogSvc = inject(BlogService);

  formatDate(dateString: string): string {
    return this.blogSvc.formatDate(dateString);
  }
  getCountryCode(country:string) : string {
    return this.blogSvc.getCountryCode(country)
  }
}
