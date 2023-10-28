import {useState} from 'react'
import Geolocation from '@react-native-community/geolocation';

const useGeolocalizacion = () => {
    
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();

  const obtenerUbicacion = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitud(latitude)
        setLongitud(longitude)
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return {obtenerUbicacion, latitud, longitud}
}

export default useGeolocalizacion