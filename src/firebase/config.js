import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCEV_8Ic48kvC9dHxJN0lVp6V3E7XpMYJU',
    authDomain: 'go-chore-app.firebaseapp.com',
    projectId: 'go-chore-app',
    storageBucket: 'go-chore-app.appspot.com',
    messagingSenderId: '600236035946',
    appId: '1:600236035946:web:fa175916982fbfe9641f13',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }
