import  {useState} from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const useFotos = () => {
  
    const [foto, setFoto] = useState('https://via.placeholder.com/150x150');
    const [nombreImagen, setNombreImagen] = useState();

    const handleImagen = () => {
        const options = {
          title: 'Seleccione una imagen',
          storageOption: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        launchImageLibrary(options, response => {
    
          if (response.errorCode) {
            console.log('response error= ' + response.errorCode);
          } else if (response.didCancel) {
            console.log('user cancel action ');
          } else {
            const path = response.assets[0].uri;
            const nombre = response.assets[0].fileName;
            setFoto(path)
            setNombreImagen(nombre);
          }
    
        });
    
    
      };
    
      const handleFoto = () => {
        const options = {
          title: 'Tomar una foto',
          storageOption: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        launchCamera(options, response => {
    
          if (response.errorCode) {
            console.log('response error= ' + response.errorCode);
          } else if (response.didCancel) {
            console.log('user cancel action ');
          } else {
            const uri = response.assets[0].uri;
            const nombre = response.assets[0].fileName;
            setFoto(uri);
            setNombreImagen(nombre);
    
          }
    
        });
    
    
      };
    

  return {handleFoto, handleImagen, foto, nombreImagen}
}

export default useFotos