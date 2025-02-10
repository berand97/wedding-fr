import { AfterViewInit, Component } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeaderComponent } from './components/header/header.component';
import { PersonsComponent } from "./components/persons/persons.component";
import { OurHistoryComponent } from "./components/our-history/our-history.component";
import { OurPhotographyComponent } from "./components/our-photography/our-photography.component";
import { AssistanceComponent } from "./components/assistance/assistance.component";
import { InfoComponent } from './components/info/info.component';
import { FooterComponent } from './components/footer/footer.component';
import 'jquery-countdown';

declare var $: any;

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, HeaderComponent, PersonsComponent, OurHistoryComponent, OurPhotographyComponent, AssistanceComponent, InfoComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'wedding';

  ngAfterViewInit() {
    if ($ && $('#clock').length) {
      ($('#clock') as any).countdown('2025-03-09 15:00:00', (event: any) => {
        $(event.currentTarget).html(event.strftime(''
          + '<div class="box"><div><div class="time">%D</div> <span>Dias</span> </div></div>'
          + '<div class="box"><div><div class="time">%H</div> <span>Horas</span> </div></div>'
          + '<div class="box"><div><div class="time">%M</div> <span>Minutos</span> </div></div>'
          + '<div class="box"><div><div class="time">%S</div> <span>Segundos</span> </div></div>'));
      });
    }
  }
}