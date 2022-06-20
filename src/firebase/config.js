import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBRgyoN1RwNaARkrq6MDdCbhZ2b2LOTuFk",
    authDomain: "beyond-recipe.firebaseapp.com",
    projectId: "beyond-recipe",
    storageBucket: "beyond-recipe.appspot.com",
    messagingSenderId: "748646714086",
    appId: "1:748646714086:web:06f53c7b30994b2ad54927"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }