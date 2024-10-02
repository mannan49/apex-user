import { Routes } from '@angular/router';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';

export const routes: Routes = [
    { path: '', component: AllBlogsComponent },
    { path: 'blog/:id', component: SingleBlogComponent },
];
