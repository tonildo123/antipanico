import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, MD3Colors, Text, List } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import json from '../utils/ciudades-argentinas.json'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { enableLatestRenderer } from 'react-native-maps';
import useGeolocalizacion from '../hooks/useGeolocalizacion';
import useFotos from '../hooks/useFotos';

enableLatestRenderer();


const AddressComponent = ({ navigation }) => {

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
    console.log('calle:', calle);
  };



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
        />
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