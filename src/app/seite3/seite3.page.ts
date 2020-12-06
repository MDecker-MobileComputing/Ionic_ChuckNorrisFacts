import { Component } from '@angular/core';
import { SpeicherService} from '../speicher.service';
import { DialogToastHelferService} from '../dialog-toast-helfer.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-seite3',
  templateUrl: './seite3.page.html',
  styleUrls: ['./seite3.page.scss'],
})
export class Seite3Page {

/**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private speicherService  : SpeicherService,
               private dialogToastHelfer: DialogToastHelferService,
               private alertCtrl        : AlertController ) {}


  /**
   * Button-Event-Handler um ALLE gespeicherten Facts zu löschen (nach Sicherheitsabfrage).
   */
  private async onAlleLoeschen() {

    const jaButton = {
        text: "Weiter",
        handler: async () => {

          await this.speicherService.alleLoeschen();

          this.dialogToastHelfer.zeigeToast("Löschung durchgeführt.");
        }
    };

    const abbrechenButton = {
        text: "Abbrechen",
        role: "Cancel",
        handler: () => {

            this.dialogToastHelfer.zeigeToast("Löschen abgebrochen.");
        }
    };

    const sicherheitsfrage = `Wollen Sie wirklich alle gespeicherten <i>Chuck Norris Facts</i> löschen?`;

    const meinAlert =
          await this.alertCtrl.create({
              header         : "Sicherheitsfrage",
              message        : sicherheitsfrage,
              backdropDismiss: false,
              buttons        : [ jaButton, abbrechenButton ]
          });

    await meinAlert.present();
  }

}
