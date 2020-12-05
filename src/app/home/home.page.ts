import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readonly URL_ICNDB = "https://api.icndb.com/jokes/random";

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

    this.witz = "Beispiel-Witz";
  }

}
