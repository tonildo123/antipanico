import * as firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyABDggLbGI1cpYJruXzDPLDDZuLLQWgjVw",
  authDomain: "antipanico-411a3.firebaseapp.com",
  projectId: "antipanico-411a3",
  storageBucket: "antipanico-411a3.appspot.com",
  messagingSenderId: "139395984733",
  appId: "1:139395984733:android:54df9c14480a40dae70cb4"
};


firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage(); // Inicializa el módulo de Firebase Storage

export const uploadImageToStorage = async (imageUri, imageName) => {
  try {
    const reference = storage.ref(`images/${imageName}`);
    await reference.putFile(imageUri);

    // Obtener la URL de la imagen cargada
    const url = await reference.getDownloadURL();
    console.log(url)
    return url;
  } catch (error) {
    console.error('Error al subir la imagen a Firebase Storage:', error);
    throw error;
  }
};


export default firebase;