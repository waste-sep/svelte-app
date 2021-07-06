import * as Firebase from '@firebase/app';
import '@firebase/auth';

if (!Firebase.firebase.apps.length) {
	Firebase.firebase.initializeApp({
		apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || 'API_KEY',
		appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || 'APP_ID',
		projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || 'PROJECT_ID',
		authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || 'AUTH_DOMAIN'
	});
} else {
	Firebase.firebase.app();
}

export const auth = Firebase.firebase.auth();
export const provider = new Firebase.firebase.auth.GoogleAuthProvider();
