import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, Card, MD3Colors, Text, List } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import json from '../utils/ciudades-argentinas.json'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { enableLatestRenderer } from 'react-native-maps';
import useGeolocalizacion from '../hooks/useGeolocalizacion';
import useFotos from '../hooks/useFotos';
import { setAddressInfo, setClearAddressInfo } from '../state/AddressSlice';
import { useDispatch, useSelector } from 'react-redux';
import useFirebase from '../hooks/useFirebase';
import firestore from '@react-native-firebase/firestore';

enableLatestRenderer();

const AddressComponent = ({ navigation }) => {

  const distpach = useDispatch()
  const { uploadImageToStorage } = useFirebase()
  const { obtenerUbicacion, latitud, longitud } = useGeolocalizacion();
  const { nombreImagen, foto, handleFoto, handleImagen } = useFotos()
  const tucumanData = json.find(item => item.nombre === "Tucuman");
  const ciudadesDeTucuman = tucumanData ? tucumanData.ciudades : [];
  const { dni } = useSelector(state => state.user)
  const { completed, id } = useSelector(state => state.address)
  const stret = useSelector(state => state.address.calle)
  const number = useSelector(state => state.address.altura)
  const locality = useSelector(state => state.address.localidad)
  const pick = useSelector(state => state.address.foto)
  const [calle, setCalle] = useState(stret);
  const [altura, setAltura] = useState(number);
  const [selectedLocalidad, setSelectedLocalidad] = useState(locality);
  const [isLocalidadesVisible, setLocalidadesVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerUbicacion()
  }, [])

  const handleLocalidadChange = (localidad) => {
    setSelectedLocalidad(localidad);
    setLocalidadesVisible(false);
  };

  const guardarDatos = async () => {

    if (dni == undefined || dni == null ) 
    {
      Alert.alert('Debe completar datos personales')
      return
    }
    setLoading(true)

    const url = await uploadImageToStorage(foto, nombreImagen)
    firestore().collection('address').add({
      dni: dni,
      calle: calle,
      altura: altura,
      foto: url,
      localidad: selectedLocalidad,
      latitud: latitud ?? '',
      longitud: longitud ?? ''
    }).
      then((documentRef) => {
        const address = {
          id: documentRef.id,
          calle: calle,
          altura: altura,
          foto: url,
          localidad: selectedLocalidad,
          latitud: latitud,
          longitud: longitud
        }
        distpach(setAddressInfo(address))
        setLoading(false)
        Alert.alert('Cargado correctamente!')
      }).catch((error) => {
        console.error('Error al agregar documento: ', error);
        setLoading(false)
        Alert.alert('Ocurrio un error!');
      });

  };

  const handleUpdate = async () => {
    setLoading(true)
    try {

      const url = nombreImagen ? await uploadImageToStorage(foto, nombreImagen) : pick
      firestore().collection('address').doc(id).update({
        dni: dni,
        calle: calle,
        altura: altura,
        foto: url,
        localidad: selectedLocalidad,
        latitud: latitud ?? '',
        longitud: longitud ?? ''
      })
      distpach(setClearAddressInfo())
      const address = {
        calle: calle,
        altura: altura,
        foto: url,
        localidad: selectedLocalidad,
        latitud: latitud,
        longitud: longitud
      }
      distpach(setAddressInfo(address))
      setLoading(false)
      Alert.alert('Actualizado correctamente!')
    } catch (error) {
      console.log(error)
      setLoading(false)
      Alert.alert('Error al actualizar!')
    }

  }



  return (
    <ScrollView>
      <HeaderComponent navigation={navigation} />
      <Card>
        <Card.Cover source={{ uri:pick ?? foto }} style={styles.image} resizeMode='contain' />
      </Card>
      {!visible && <Button
        icon="camera"
        mode="outlined"
        onPress={() => { setVisible(!visible) }}>
        Foto de residencia
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
        label="Calle + (piso + dpto (OPCIONAL))"
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

      <Button style={{ backgroundColor: MD3Colors.error50, marginVertical: 12 }}
        onPress={completed ? handleUpdate : guardarDatos}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{loading ? 'Cargando...' : 'GUARDAR'}</Text>
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