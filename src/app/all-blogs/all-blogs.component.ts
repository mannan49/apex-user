import { Component, inject, OnInit } from '@angular/core';
import { SingleBlogComponent } from "../single-blog/single-blog.component";
import { BlogService } from '../blog.service';
import { Blog } from '../single-blog/blog.model';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { LoaderComponent } from "../utilities/loader/loader.component";


@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [SingleBlogComponent, CommonModule, BlogCardComponent, LoaderComponent],
  templateUrl: './all-blogs.component.html',
})
export class AllBlogsComponent implements OnInit {

  constructor() {}

  private blogSvc = inject(BlogService)
  blogs : Blog[] = [];
  loading = true;
  
  ngOnInit() {
    this.blogSvc.getBlogs().subscribe({
      next: (blogs: Blog[]) => {
        console.log('Fetched blogs:', blogs); 
        this.blogs = blogs;
        this.loading=false;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
        this.loading=false;
      }
    });
  }
    
}
