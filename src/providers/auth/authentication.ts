import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthenticationProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private platform : Platform) {
		afAuth.authState.subscribe(user => {
			this.user = user;
			console.log(this.user);
		});
	}

	public signInWithGoogle() {
		if(!this.user){
			return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
		}
		else{
			alert("Already auth!");
		}
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova || this.platform.is("core")) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// The signed-in user info.
					let user = result.user;
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			}).
			catch(error => { alert(error.message);});
		}
	}
}