import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from './single-blog/blog.model';
import { BehaviorSubject, catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsUrl = 'https://apex-scholarships-backend.vercel.app/api/blogs';
  // private blogsUrl = 'http://localhost:3000/api/blogs';
  private http = inject(HttpClient);
  private allBlogs: Blog[] = []; 
  private filteredBlogsSubject = new BehaviorSubject<Blog[]>([]);
  private filteredBlogsResult$ = this.filteredBlogsSubject.asObservable().pipe(
    shareReplay(1)
  );
  filteredBlogs$ = this.filteredBlogsSubject.asObservable();
 

  private blogsResult$ = this.http.get<Blog[]>(this.blogsUrl).pipe(
    shareReplay(1),
    catchError((err) => {
      console.error('Error fetching blogs:', err);
      return of([]); // Return an empty array on error
    })
  );
  constructor() {
    this.blogsResult$.subscribe(blogs => {
      this.allBlogs = blogs; // Store all blogs
      this.filteredBlogsSubject.next(blogs); // Initialize with all blogs
    });
  }

  // getBlogs() {
  //   return this.blogsResult$;
  // }

  // Method to get a single blog by ID
  getBlogById(id: string) {
    return this.http.get<Blog>(`${this.blogsUrl}/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching blog by ID:', err);
        return of({} as Blog); // Return an empty Blog object on error
      })
    );
  }

  
 
  filterBlogs(searchTerm: string) {
    const filteredBlogs = this.allBlogs.filter(blog => {
      return Object.entries(blog).some(([key, value]) => {
        // Skip properties you don't want to include in the search
        if (['_id', 'image', 'createdAt', 'updatedAt'].includes(key)) {
          return false;
        }
  
        // Check if the value is a string
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        } 
        // Check if the value is an array
        else if (Array.isArray(value)) {
          return value.some(val => {
            // If it's an object within the array, check its properties
            if (typeof val === 'object') {
              // Check each property in the object
              return Object.values(val).some(innerVal => 
                typeof innerVal === 'string' && innerVal.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
            // If it's a string in the array, check it
            return typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase());
          });
        }
  
        return false; // Default case
      });
    });
    
    this.filteredBlogsSubject.next(filteredBlogs);
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

  getCountryCode(country: string): string {
    const countryCodes: { [key: string]: string } = {
    'USA': 'us',
    'Canada': 'ca',
    'Germany': 'de',
    'France': 'fr',
    'UK': 'gb',
    'Australia': 'au',
    'India': 'in',
    'China': 'cn',
    'Japan': 'jp',
    'Brazil': 'br',
    'Russia': 'ru',
    'Italy': 'it',
    'Spain': 'es',
    'Netherlands': 'nl',
    'Sweden': 'se',
    'Norway': 'no',
    'Finland': 'fi',
    'Denmark': 'dk',
    'Switzerland': 'ch',
    'Belgium': 'be',
    'Austria': 'at',
    'Ireland': 'ie',
    'New Zealand': 'nz',
    'South Africa': 'za',
    'Mexico': 'mx',
    'Argentina': 'ar',
    'Chile': 'cl',
    'Colombia': 'co',
    'Peru': 'pe',
    'Philippines': 'ph',
    'Vietnam': 'vn',
    'Malaysia': 'my',
    'Singapore': 'sg',
    'Thailand': 'th',
    'Indonesia': 'id',
    'South Korea': 'kr',
    'Saudi Arabia': 'sa',
    'United Arab Emirates': 'ae',
    'Israel': 'il',
    'Turkey': 'tr',
    'Egypt': 'eg',
    'Nigeria': 'ng',
    'Kenya': 'ke',
    'Ghana': 'gh',
    'Morocco': 'ma',
    'Iraq': 'iq',
    'Iran': 'ir',
    'Bangladesh': 'bd',
    'Pakistan': 'pk',
    'Sri Lanka': 'lk',
    'Nepal': 'np',
    'Afghanistan': 'af',
    'Myanmar': 'mm',
    'Kazakhstan': 'kz',
    'Ukraine': 'ua',
    'Romania': 'ro',
    'Poland': 'pl',
    'Czech Republic': 'cz',
    'Hungary': 'hu',
    'Slovakia': 'sk',
    'Bulgaria': 'bg',
    'Serbia': 'rs',
    'Croatia': 'hr',
    'Slovenia': 'si',
    'Lithuania': 'lt',
    'Latvia': 'lv',
    'Estonia': 'ee',
    'Moldova': 'md',
    'Georgia': 'ge',
    'Armenia': 'am',
    'Azerbaijan': 'az',
    'Albania': 'al',
    'Bosnia and Herzegovina': 'ba',
    'Montenegro': 'me',
    'Kosovo': 'xk',
    'Iceland': 'is',
    'Malta': 'mt',
    'Luxembourg': 'lu',
    'Liechtenstein': 'li',
    'Monaco': 'mc',
    'San Marino': 'sm',
    'Vatican City': 'va',
    'Andorra': 'ad',
    'Seychelles': 'sc',
    'Bahamas': 'bs',
    'Barbados': 'bb',
    'Jamaica': 'jm',
    'Haiti': 'ht',
    'Cuba': 'cu',
    'Dominican Republic': 'do',
    'Costa Rica': 'cr',
    'Panama': 'pa',
    'El Salvador': 'sv',
    'Guatemala': 'gt',
    'Nicaragua': 'ni',
    'Uruguay': 'uy',
    'Paraguay': 'py',
    'Venezuela': 've',
    'Bolivia': 'bo',
    'Ecuador': 'ec',
    'Suriname': 'sr',
    'Guyana': 'gy',
    'Kiribati': 'ki',
    'Tonga': 'to',
    'Fiji': 'fj',
    'Solomon Islands': 'sb',
    'Tuvalu': 'tv',
    'Micronesia': 'fm',
    'Palau': 'pw',
    'Marshall Islands': 'mh',
    'Samoa': 'ws',
    'Nauru': 'nr',
    'Vanuatu': 'vu',
    'Saint Kitts and Nevis': 'kn',
    'Saint Lucia': 'lc',
    'Saint Vincent and the Grenadines': 'vc',
    'Grenada': 'gd',
    'Dominica': 'dm',
    'Antigua and Barbuda': 'ag',
    'Saint Helena': 'sh',
    'Montserrat': 'ms',
    'Falkland Islands': 'fk',
    'British Indian Ocean Territory': 'io',
    'Guam': 'gu',
    'American Samoa': 'as',
    'Puerto Rico': 'pr',
    'US Virgin Islands': 'vi',
    'Northern Mariana Islands': 'mp',
    'Wallis and Futuna': 'wf',
    'French Polynesia': 'pf',
    'New Caledonia': 'nc',
    'Tokelau': 'tk',
    'Niue': 'nu',
    'Cook Islands': 'ck',
    'Pitcairn Islands': 'pn'
    };
    return countryCodes[country] || 'unknown'; // Default to 'unknown' if country not found
  }



}
