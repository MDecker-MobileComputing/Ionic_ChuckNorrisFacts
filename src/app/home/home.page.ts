import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** URL for REST endpoint of ICNDB's Web API. */
  readonly URL_ICNDB = "https://api.icndb.de/jokes/random";

  readonly OPTIONS_OBJECT: object = { observe: "response" };


  /** Member-Variable mit "Chuck Norris Fact", der mit Interpolation dargestellt wird. */
  private witz = "";


  /**
   * Constructor für Dependency Injection.
   */
  constructor(private httpClient: HttpClient) {}


  /**
   * Event-Handler für Button "Witz laden".
   */
  public onJokeLadenButton() {

    this.httpClient.get(this.URL_ICNDB, this.OPTIONS_OBJECT).subscribe((httpResponse:any) => {

      console.log(`httpResponse: ${httpResponse.status}`);
      
      if (httpResponse.status === 200) {

        this.witz = httpResponse.body.value.joke;
        console.log(`httpResponse.body=${httpResponse.body.value.joke}`);

      } else {
        
        this.witz = `Fehler bei Zugriff auf Web-API: ${httpResponse.statusText} (${httpResponse.status})`;
      }      

    });

  }

}
