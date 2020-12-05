import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** URL for REST endpoint of ICNDB's Web API. */
  readonly URL_ICNDB = "https://api.icndb.com/jokes/random";

  readonly OPTIONS_OBJECT: object = { observe: "response" };


  /** Member-Variable mit "Chuck Norris Fact", der mit Interpolation dargestellt wird. */
  private witz = "asdf";


  /**
   * Constructor für Dependency Injection.
   */
  constructor(private httpClient: HttpClient) {}


  /**
   * Event-Handler für Button "Witz laden".
   */
  private onJokeLadenButton() {

    const verarbeiteHttpResponse = (httpResponse:any) => {

      console.log(`httpResponse: ${httpResponse.status}`);
        
      if (httpResponse.status === 200) {
  
        let joke = httpResponse.body.value.joke;

        this.witz = joke.replace(/&quot\;/g, '"');
        console.log(`httpResponse.body=${this.witz}`);
  
      } else {
        
        this.witz = `Fehler bei Zugriff auf Web-API: ${httpResponse.statusText} (${httpResponse.status})`;
      }          
    };

    this.httpClient.get(this.URL_ICNDB, this.OPTIONS_OBJECT).subscribe(verarbeiteHttpResponse);
  }


}
