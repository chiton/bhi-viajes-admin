import * as firebase from 'firebase';
import 'firebase/firestore';

export class Viaje {
    id: string;
    name: string;
    departureDate: firebase.firestore.Timestamp;
    returnDate: firebase.firestore.Timestamp;
    lastEntry: firebase.firestore.Timestamp;
    coord: firebase.firestore.GeoPoint;
    image: string;
    details: string;
    summary: string;
    price: string;
}