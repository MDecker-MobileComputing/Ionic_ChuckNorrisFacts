import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

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
  public async holeAlleWitze(): Promise<object[]> {

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


  /**
   * Methode löscht *ALLE* gespeicherten Witze.
   */
  public async alleLoeschen(): Promise<void> {

    await this.storage.clear();
  }

}
