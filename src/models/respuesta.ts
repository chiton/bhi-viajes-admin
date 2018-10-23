import * as firebase from 'firebase';
import 'firebase/firestore';

export class Respuesta {
    id: string;
    name: string;
    email: string;
    date: firebase.firestore.Timestamp;
    trivia: string;
    response: string;
}