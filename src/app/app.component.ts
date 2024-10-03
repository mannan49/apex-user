import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SingleBlogComponent } from "./single-blog/single-blog.component";
import { AllBlogsComponent } from "./all-blogs/all-blogs.component";
import { LoaderComponent } from "./utilities/loader/loader.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SingleBlogComponent, AllBlogsComponent, LoaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'apex-user';
}
