import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from './single-blog/blog.model';
import { catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsUrl = 'https://apex-scholarships-backend.vercel.app/api/blogs';
  private http = inject(HttpClient);

  private blogsResult$ = this.http.get<Blog[]>(this.blogsUrl).pipe(
    shareReplay(1),
    catchError((err) => {
      console.error('Error fetching blogs:', err);
      return of([]); // Return an empty array on error
    })
  );

  // getBlogs(){
  //   return this.http.get<Blog[]>("https://apex-scholarships-backend.vercel.app/api/blogs")
  //  }

  // Method to get all blogs
  getBlogs() {
    return this.blogsResult$;
  }

  // Method to get a single blog by ID
  getBlogById(id: string) {
    return this.http.get<Blog>(`${this.blogsUrl}/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching blog by ID:', err);
        return of({} as Blog); // Return an empty Blog object on error
      })
    );
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const suffix = this.getOrdinalSuffix(day);

    return `${day}${suffix} ${month}, ${year}`;
  }
  private getOrdinalSuffix(day: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = day % 100;

    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  }
}
