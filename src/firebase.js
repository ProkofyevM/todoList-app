import { initializeApp } from 'firebase/app'
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyBW_t0cWbsUpN7MvTd6i9xkXWkQpxbpJrM',
	authDomain: 'todoproject-49d21.firebaseapp.com',
	projectId: 'todoproject-49d21',
	storageBucket: 'todoproject-49d21.appspot.com',
	messagingSenderId: '1051692566200',
	appId: '1:1051692566200:web:8f712ee3ae887e6037164d',
	measurementId: 'G-2N5D34X3DB',
	databaseURL:
		'https://todoproject-49d21-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);
export const db = getDatabase(app)
