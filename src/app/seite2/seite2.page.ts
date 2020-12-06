import { Component } from '@angular/core'
import { SpeicherService} from '../speicher.service';

/**
 * Seite zur Anzeige aller gespeicherten *Chuck Norris Facts*.
 */
@Component({
  selector: 'app-seite2',
  templateUrl: './seite2.page.html',
  styleUrls: ['./seite2.page.scss'],
})
export class Seite2Page {

  /** Promise auf Array mit allen Witz-Objekten, wird mit `*ngFor` auf Seite dargestellt. */
  private gespeicherteWitzePromise: Promise<object[]> = null;

  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private speicherService: SpeicherService ) {}


  /**
   * Lifecycle-Methode, die unmittelbar vor (Neu-)Anzeige der Seite aufgerufen wird.
   */
  private ionViewWillEnter() {

    this.holeDatenVonSpeicherService();
  }


  private holeDatenVonSpeicherService(): void {

    this.gespeicherteWitzePromise = this.speicherService.holeAlleWitz();
  }

}
