import { Component, inject, OnInit } from '@angular/core';
import { Blog } from './blog.model';
import { BlogService } from '../blog.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoaderComponent } from "../utilities/loader/loader.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [RouterModule, LoaderComponent, CommonModule],
  templateUrl: './single-blog.component.html',
})
export class SingleBlogComponent implements OnInit{

  private blogSvc = inject(BlogService)
  private route = inject(ActivatedRoute)
  blog : Blog = {} as Blog;
  loading = true;


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.blogSvc.getBlogById(id).subscribe({
          next: (blog: Blog) => {
            console.log('Fetched blog:', blog); 
            this.blog = blog;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching blog:', err);
            this.loading = false;
          }
        });
      }
    });
    
  }

  formatDate(dateString: string): string {
    return this.blogSvc.formatDate(dateString);
  }

  getCountryCode(country:string) : string {
    return this.blogSvc.getCountryCode(country)
  }
  

}
