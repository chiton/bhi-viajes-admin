import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../../models/viaje';
import 'rxjs/add/operator/map';
import { Trivia } from '../../models/trivia';
import { Respuesta } from '../../models/respuesta';

@Injectable()
export class DataProvider {
  private viajesCollection : AngularFirestoreCollection<Viaje> = this.db.collection<Viaje>('viajes', ref => ref.orderBy('departureDate'));
  private triviasCollection : AngularFirestoreCollection<Trivia> = this.db.collection<Trivia>('trivias');
  private respuestasCollection : AngularFirestoreCollection<Respuesta> = this.db.collection<Respuesta>('respuestas', ref => ref.orderBy('date'));

  constructor(private db: AngularFirestore) {
  }

  // Viajes //////

  private getViajesWithIds(): Observable<any[]> {
    return this.viajesCollection.snapshotChanges().map(actions => {
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
    this.viajesCollection.add(viaje)
    .catch(error => { alert(error.message); });
  }

  public removeViaje(viaje : Viaje){
    this.viajesCollection.doc(viaje.id).delete()
    .catch(error => { alert(error.message); });
  }

  public updateViaje(viaje : Viaje){
    let id : string = viaje.id;
    delete viaje.id;
    this.viajesCollection.doc(id).update(viaje)
    .catch(error => { alert(error.message); });
  }

  // Trivias //////

  private getTriviasWithIds(): Observable<any[]> {
    return this.triviasCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Trivia;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  public getTrivias() : Observable<any[]> {
     return this.getTriviasWithIds(); 
  }

  public addTrivia(trivia : Trivia){
    this.triviasCollection.add(trivia)
    .catch(error => { alert(error.message); });
  }

  public removeTrivia(trivia : Trivia){
    this.triviasCollection.doc(trivia.id).delete()
    .catch(error => { alert(error.message); });
  }

  public updateTrivia(trivia : Trivia){
    let id : string = trivia.id;
    delete trivia.id;
    this.triviasCollection.doc(id).update(trivia)
    .catch(error => { alert(error.message); });
  }
  
  // Respuestas //////

  private getRespuestasWithIds(): Observable<any[]> {
    return this.respuestasCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Respuesta;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

 public getRespuestas() : Observable<any[]> {
    return this.getRespuestasWithIds(); 
 }

 public addRespuesta(respuesta : Respuesta){
   this.respuestasCollection.add(respuesta)
   .catch(error => { alert(error.message); });
 }

 public removeRespuesta(respuesta : Respuesta){
   this.respuestasCollection.doc(respuesta.id).delete()
   .catch(error => { alert(error.message); });
 }

 public updateRespuesta(respuesta : Respuesta){
   let id : string = respuesta.id;
   delete respuesta.id;
   this.respuestasCollection.doc(id).update(respuesta)
   .catch(error => { alert(error.message); });
 }
}
