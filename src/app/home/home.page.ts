import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SpeicherService} from '../speicher.service';
import { DialogToastHelferService} from '../dialog-toast-helfer.service';


/**
 * Page zum Abruf einzelner Zufallswitze von Web-API von icndb.com.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /**
   * URL for REST endpoint of ICNDB's Web API. Über URL-Parameter `exclude` werden
   * anstößige ("explizite") Witze ausgeschlossen.
   */
  readonly URL_ICNDB = "https://api.icndb.com/jokes/random?exclude=[explicit]";

  /** Konfigurations-Objekt für HttpClient. */
  readonly OPTIONS_OBJECT: object = { observe: "response" };

  /** Variable mit "Chuck Norris Fact", der mit Interpolation dargestellt wird. */
  private witzText = "";

  /**
   * Variable ist genau dann `true`, wenn der "Speichern"-Button sichtbar sein soll
   * (also keine Fehlermeldung angezeigt wird und der Witz noch nicht gespeichert wurde).
   */
  private zeigeSpeichernButton = false;

  /** Nummer des aktuellen Witz (als "id" in JSON-Response enthalten), wird für evtl. Speichern als Key benötigt. */
  private witzNummer = -1;


  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private httpClient       : HttpClient,
               private speicherService  : SpeicherService,
               private dialogToastHelfer: DialogToastHelferService
             ) {}


  /**
   * Event-Handler für Button "Witz laden".
   */
  private onJokeLadenButton() {

    this.httpClient.get(this.URL_ICNDB, this.OPTIONS_OBJECT)
                   .subscribe(this.verarbeiteHttpResponse, this.verarbeiteHttpFehler);
  }


  /**
   * Event-Handler für Verarbeitung von HTTP-Antwort.
   * Mit Doppelpfeil-Operator definiert statt "normale" Methode, damit "this" auf Page-Objekt zeigt.
   *
   * Beispiel für JSON-Response von Web-API:
   * ```
   * {
   *   "type": "success",
   *   "value": {
   *      "id": 614,
   *        "joke": "Chuck Norris once sold eBay to eBay on eBay.",
   *        "categories": []
   *   }
   * }
   * ```
   */
  private verarbeiteHttpResponse = (httpResponse:any) => {

    if (httpResponse.status === 200) {

      let joke = httpResponse.body.value.joke;

      this.witzNummer = httpResponse.body.value.id;

      this.witzText = joke.replace(/&quot\;/g, '"'); // &quot; mit Anführungszeichen ersetzen


      this.zeigeSpeichernButton = true;

    } else {

      this.witzText = `Fehler bei Zugriff auf Web-API: ${httpResponse.statusText} (${httpResponse.status})`;

      this.zeigeSpeichernButton = false;
    }
  };


  /**
   * Fehlerbehandlungsmethode für HTTP-Request.
   *
   * @param fehler  Objekt mit Details zu Fehler, u.a. `message`.
   */
  private verarbeiteHttpFehler = (fehler: HttpErrorResponse) => {

    this.witzText = "Fehler bei Abfrage Web-API von icndb.com: " + fehler.message;

    this.zeigeSpeichernButton = false;
  }


  /**
   * Event-Handler-Methode für "Speichern"-Button.
   */
  private async onSpeichernButton() {

    this.zeigeSpeichernButton = false;

    const wurdeGespeichert =
          await this.speicherService.speichereWitz(this.witzNummer, this.witzText);

    if (wurdeGespeichert) {

      this.dialogToastHelfer.zeigeToast("Witz wurde gespeichert.");

    } else {

      this.dialogToastHelfer.zeigeToast("Witz war schon gespeichert.");
    }
  }

}
