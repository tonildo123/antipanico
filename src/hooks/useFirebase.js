
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../state/ProfileSlice';
import { setAddressInfo } from '../state/AddressSlice';
import storage from '@react-native-firebase/storage';

const useFirebase = () => {
  const distpach = useDispatch()

  const uploadImageToStorage = async (imageUri, imageName) => {
    try {
      const reference = storage().ref(`images/${imageName}`);
      await reference.putFile(imageUri);
      const url = await reference.getDownloadURL();
      console.log(url)
      return url;

    } catch (error) {

      console.error('Error al subir la imagen a Firebase Storage:', error);
      throw error;
    }
  };

  const getFirebaseProfile = async (dniQuery) => {

    const suscriber = firestore()
      .collection('ProfileUsers')
      .where('dni', '==', dniQuery)
      .onSnapshot(querySnapshot => {
        const objeto = [];
        querySnapshot.forEach(documentSnapshot => {
          objeto.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          });
        });
        // console.log('objeto : ', objeto)

        if (objeto.length > 0) {
          const profile = {
            id:objeto[0].key,
            dni: objeto[0].dni,
            nombre: objeto[0].nombre,
            apellido: objeto[0].apellido,
            foto: objeto[0].foto,
            telefono: objeto[0].telefono,
          }
          distpach(setUserInfo(profile))
        }

      });

    return () => suscriber();

  }

  // para el domicilio

  const getFirebaseAddress = async (dniQuery) => {


    const suscriber = firestore()
      .collection('address')
      .where('dni', '==', dniQuery)
      .onSnapshot(querySnapshot => {
        const objeto = [];
        querySnapshot.forEach(documentSnapshot => {
          objeto.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          });
        });
        // console.log('objeto : ', objeto)

        if (objeto.length > 0) {

          const address = {
            id:objeto[0].key,
            calle: objeto[0].calle,
            altura: objeto[0].altura,
            localidad: objeto[0].localidad,
            foto: objeto[0].foto,
            latitud: objeto[0].latitud,
            longitud: objeto[0].longitud,
          }
          distpach(setAddressInfo(address))
        }

      });

    return () => suscriber();

  }

  return { getFirebaseProfile, getFirebaseAddress, uploadImageToStorage }
}

export default useFirebase