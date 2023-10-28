import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { TextInput, Button, Card, MD3Colors, Text } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo, setClearUserInfo } from '../state/ProfileSlice';
import firestore from '@react-native-firebase/firestore';
import useFotos from '../hooks/useFotos';

const ProfileComponent = ({ navigation }) => {

  const state = useSelector(state => state)
  const distpach = useDispatch()
  const { foto,nombreImagen, handleFoto, handleImagen } = useFotos()
  const [nombre, setNombre] = useState(state.user.nombre);
  const [apellido, setApellido] = useState(state.user.apellido);
  const [dni, setDni] = useState(state.user.dni);
  const [telefono, setTelefono] = useState(state.user.telefono);
  const [visible, setVisible] = useState(false);


  const guardarDatos = async () => {
    

    if (state.user.dni !== null) {
      await AsyncStorage.setItem('DNI_STORAGE', dni);
    }

    // try {
    //   const imageURL = await uploadImage(foto, 'GuardiaUrbanaFolder', nombreImagen);
    //   firestore().collection('UsersGuardiaUrbana').add({
    //     nombre: nombre,
    //     apellido: apellido,
    //     foto: imageURL,
    //     telefono: telefono,
    //     dni: dni,
    //   })
    // } catch (error) {
    //   console.log(error)
    //   Alert.alert('ocurrio un error')
    // } finally {
      const user = {
        nombre: nombre,
        apellido: apellido,
        foto: foto,
        telefono: telefono,
        dni: dni,
      }
      distpach(setUserInfo(user))
      Alert.alert('Cargado correctamente!')
    // }
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
        label="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        label="Apellido"
        value={apellido}
        onChangeText={(text) => setApellido(text)}
      />
      <TextInput
        label="DNI"
        value={dni}
        onChangeText={(text) => setDni(text)}
      />

      <TextInput
        label="TELEFONO"
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
      />
      <Button style={{ backgroundColor: MD3Colors.error50, marginVertical: 12 }} onPress={guardarDatos}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>GUARDAR</Text>
      </Button>
      {nombreImagen && <Text style={{ color: 'grey', fontWeight: 'bold' }}> {nombreImagen} </Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
});



export default ProfileComponent