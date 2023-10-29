import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View,Alert } from 'react-native';
import { TextInput, Button, Card, MD3Colors, Text, List } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import json from '../utils/ciudades-argentinas.json'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { enableLatestRenderer } from 'react-native-maps';
import useGeolocalizacion from '../hooks/useGeolocalizacion';
import useFotos from '../hooks/useFotos';
import { setAddressInfo, setClearAddressInfo } from '../state/AddressSlice';
import { useDispatch } from 'react-redux';

enableLatestRenderer();


const AddressComponent = ({ navigation }) => {
  const distpach = useDispatch()
  const {uploadImageToStorage} = useFirebase()
  const { obtenerUbicacion, latitud, longitud } = useGeolocalizacion();
  const { nombreImagen, foto, handleFoto, handleImagen } = useFotos()
  const tucumanData = json.find(item => item.nombre === "Tucuman");
  const ciudadesDeTucuman = tucumanData ? tucumanData.ciudades : [];
  const [calle, setCalle] = useState('');
  const [altura, setAltura] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [isLocalidadesVisible, setLocalidadesVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    obtenerUbicacion()
  }, [])

  const handleLocalidadChange = (localidad) => {
    setSelectedLocalidad(localidad);
    setLocalidadesVisible(false);
  };

  const guardarDatos = async () => {   

    
      try {
        await AsyncStorage.setItem('DNI-STORAGE', dni);
        const url = await uploadImageToStorage(foto, nombreImagen)
        firestore().collection('address').add({
          calle: calle,
          altura: altura,
          foto: url,
          localidad: selectedLocalidad,
          latitud: latitud,
          longitud:longitud
        })
        const address = {
          calle: calle,
          altura: altura,
          foto: url,
          localidad: selectedLocalidad,
          latitud: latitud,
          longitud:longitud
        }
        distpach(setAddressInfo(address))
        Alert.alert('Cargado correctamente!')
      } catch (e) {
        console.log(e)
        Alert.alert('ocurrio un error')
      }
        
    };
  
    const handleUpdate =async (values) =>{
  
      try {
        const url = await uploadImageToStorage(foto, nombreImagen)
        firestore().collection('address').doc(id).update({
          calle: calle,
          altura: altura,
          foto: url,
          localidad: selectedLocalidad,
          latitud: latitud,
          longitud:longitud
        })
        distpach(setClearAddressInfo())
        const profile = {
          calle: calle,
          altura: altura,
          foto: url,
          localidad: selectedLocalidad,
          latitud: latitud,
          longitud:longitud
        }
        distpach(setAddressInfo(profile))
        Alert.alert('Actualizado correctamente!')
      } catch (error) {
        console.log(error)
        Alert.alert('Error al actualizar!')
      }
    
    } 



  return (
    <ScrollView>
      <HeaderComponent navigation={navigation} />
      <Card>
        <Card.Cover source={{ uri: foto }} style={styles.image} />
      </Card>
      {!visible && <Button
        icon="camera"
        mode="outlined"
        onPress={() => { setVisible(!visible) }}>
        Foto de perfil
      </Button>}
      {visible &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            icon="camera"
            mode="outlined"
            onPress={() => {
              setVisible(!visible)
              handleFoto()
            }}>
            CAMARA
          </Button>
          <Button
            icon="camera"
            mode="outlined"
            onPress={() => {
              setVisible(!visible)
              handleImagen()
            }}>
            SELECCIONAR
          </Button>
        </View>}
      <TextInput
        label="Calle"
        value={calle}
        onChangeText={(text) => setCalle(text)}
      />
      <TextInput
        label="Altura"
        value={altura}
        onChangeText={(text) => setAltura(text)}
      />
      <Button onPress={() => setLocalidadesVisible(!isLocalidadesVisible)} mode="outlined">
        {isLocalidadesVisible ? 'OCULTAR' : 'VER LOCALIDADES'}
      </Button>
      {isLocalidadesVisible && (
        <List.Section>
          {ciudadesDeTucuman.map((localidad) => (
            <List.Item
              key={localidad.id}
              title={localidad.nombre}
              onPress={() => handleLocalidadChange(localidad.nombre)}
            />
          ))}
        </List.Section>
      )}
      {
        latitud && longitud &&
        <MapView
          style={{ width: '100%', height: 200 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          initialRegion={{
            latitude: latitud,
            longitude: longitud,
            latitudeDelta: 0.019046017524171788,
            longitudeDelta: 0.012100450694561005,
          }}
        >
          <Marker
          coordinate={{
            latitude: latitud,
            longitude: longitud,
          }}
          title="Usted esta aqui"
          description="Sera la ubicacion cargada en el sistema"
        />
        </MapView>  
      }

      <Button style={{ backgroundColor: MD3Colors.error50, marginVertical: 12 }} onPress={guardarDatos}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}> GUARDAR </Text>
      </Button>
      {nombreImagen && <Text style={{ color: 'grey', fontWeight: 'bold' }}> {nombreImagen} </Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
  },
  mapPreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  localidadesHeader: {
    display: 'flex',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  localidadesHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});



export default AddressComponent