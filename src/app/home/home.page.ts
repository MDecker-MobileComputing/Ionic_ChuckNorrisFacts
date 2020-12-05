import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


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

  /** Member-Variable mit "Chuck Norris Fact", der mit Interpolation dargestellt wird. */
  private witz = "";


  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(private httpClient: HttpClient) {}


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
   */
  private verarbeiteHttpResponse = (httpResponse:any) => {

    console.log(`httpResponse: ${httpResponse.status}`);
        
    if (httpResponse.status === 200) {

      let joke = httpResponse.body.value.joke;

      this.witz = joke.replace(/&quot\;/g, '"'); // &quot; mit Anführungszeichen ersetzen

      console.log(`httpResponse.body=${this.witz}`);

    } else {
      
      this.witz = `Fehler bei Zugriff auf Web-API: ${httpResponse.statusText} (${httpResponse.status})`;
    }          
  };


  /**
   * Fehlerbehandlungsmethode für HTTP-Request.
   * 
   * @param fehler  Objekt mit Details zu Fehler, u.a. `message`.
   */
  private verarbeiteHttpFehler = (fehler: HttpErrorResponse) => {

    this.witz = "Fehler bei Abfrage Web-API von icndb.com: " + fehler.message;
  }

}
