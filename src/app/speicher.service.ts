import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/**
 * Service-Klasse kapselt Persistenz mit
 * [ionic-storage]( https://ionicframework.com/docs/angular/storage#ionic-storage ).
 */
@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor(private storage: Storage){}


  /**
   * Methode zum Abspeichern eines Witz in *Ionic Storage*.
   *
   * @param witzNummer  Nummer (ICNDB-ID) des Witz
   *
   * @param witzText  Text des Witz
   *
   * @return  Promise auf bool'schen Wert; `true` wenn Witz gespeichert wurde,
   *          `false` wenn Witz nicht gespeichert wurde weil er schon gespeichert
   *          war.
   */
  public async speichereWitz(witzNummer: number, witzText: string): Promise<boolean> {

    const witzNummerAlsString = witzNummer + "";

    let ergebnisVonStorage = await this.storage.get(witzNummerAlsString);

    if (ergebnisVonStorage === null) {

      const witzObjekt = {
        text: witzText,
        zeitstempel: Date.now()
      };

      await this.storage.set( witzNummerAlsString, witzObjekt );

      return true;

    } else {

      return false;
    }
  }


  /**
   * Methode um alle gespeicherten Witze zurückzugeben.
   *
   * @return  Promise auf Array von Objekten; jedes der Objekte in diesem
   *          Array enthält unter dem Schlüssel `text` den eigentlichen
   *          *Chuck Norris Fact*  und unter dem Schlüssel `zeitstempel`
   *          die Anzahl Millisekunden seit dem 1. Januar 1970, 0:00 Uhr
   *          (UTC).
   */
  public async holeAlleWitz(): Promise<object[]> {

    const ergebnisPromise = new Promise<object[]>( (resolveCallback, rejectCallback) => {

      const ergebnisArray: object[] = [];

      this.storage.forEach( (wert, schluessel, nummer) => {

        ergebnisArray.push(wert);

      }).then( () => {

        resolveCallback(ergebnisArray);
      });
    });

    return ergebnisPromise;
  }

}
