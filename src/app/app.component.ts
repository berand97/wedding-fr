import { Component } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeaderComponent } from './components/header/header.component';
import { PersonsComponent } from "./components/persons/persons.component";
import { OurHistoryComponent } from "./components/our-history/our-history.component";
import { OurPhotographyComponent } from "./components/our-photography/our-photography.component";
import { AssistanceComponent } from "./components/assistance/assistance.component";
import { InfoComponent } from './components/info/info.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, HeaderComponent, PersonsComponent, OurHistoryComponent, OurPhotographyComponent, AssistanceComponent, InfoComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wedding';
}
