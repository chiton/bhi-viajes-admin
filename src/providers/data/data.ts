import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../../models/viaje';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  private collection : AngularFirestoreCollection<Viaje> = this.db.collection('viajes');

  constructor(private db: AngularFirestore) {
  }

  private getViajesWithIds(): Observable<any[]> {
    return this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Viaje;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  public getViajes() : Observable<any[]> {
     return this.getViajesWithIds(); 
  }

  public addViaje(viaje : Viaje){
    this.collection.add(viaje);
  }

  public removeViaje(viaje : Viaje){
    this.collection.doc(viaje.id).delete();
  }

  public updateViaje(viaje : Viaje){
    let id : string = viaje.id;
    delete viaje.id;
    this.collection.doc(id).update(viaje);
  }
}
