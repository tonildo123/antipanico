import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { TextInput, Button, Card, MD3Colors, Text } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo, setClearUserInfo } from '../state/ProfileSlice';
import useFotos from '../hooks/useFotos';
import firestore from '@react-native-firebase/firestore';
import useFirebase from '../hooks/useFirebase';

const ProfileComponent = ({ navigation }) => {

  const state = useSelector(state => state.user)
  const distpach = useDispatch();
  const { uploadImageToStorage } = useFirebase()
  const { foto, nombreImagen, handleFoto, handleImagen } = useFotos()
  const [nombre, setNombre] = useState(state.nombre);
  const [apellido, setApellido] = useState(state.apellido);
  const [dni, setDni] = useState(state.dni);
  const [telefono, setTelefono] = useState(state.telefono);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   console.log(JSON.stringify(state, null, 5))
  }, [])
  


  const guardarDatos = async () => {
    setLoading(true)

      await AsyncStorage.setItem('DNI-STORAGE', dni);
      const url = await uploadImageToStorage(foto, nombreImagen)
      firestore()
        .collection('ProfileUsers')
        .add({
          nombre: nombre,
          apellido: apellido,
          foto: url,
          telefono: telefono,
          dni: dni,
        })
        .then((documentRef) => {

          const user = {
            id: documentRef.id,
            nombre: nombre,
            apellido: apellido,
            foto: url,
            telefono: telefono,
            dni: dni,
          };
          distpach(setUserInfo(user));
          setLoading(false)
          Alert.alert('Cargado correctamente!');
        })
        .catch((error) => {
          console.error('Error al agregar documento: ', error);
          setLoading(false)
          Alert.alert('Ocurrio un error!');
        });

    };

    const handleUpdate = async () => {
      setLoading(true)

      try {
        firestore().collection('ProfileUsers').doc(state.id).update({
          nombre: nombre,
          apellido: apellido,
          foto: foto,
          telefono: telefono,
          dni: dni,
        })
        distpach(setClearUserInfo())
        const profile = {
          id:state.id,
          nombre: nombre,
          apellido: apellido,
          foto: foto,
          telefono: telefono,
          dni: dni,
        }
        distpach(setUserInfo(profile))
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
          <Card.Cover source={{ uri: state.foto ?? foto }} style={styles.image} resizeMode='contain' />
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
        <Button style={{ backgroundColor: MD3Colors.error50, marginVertical: 12 }} 
          onPress={state.completed ? handleUpdate : guardarDatos}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{loading ? 'Cargando...' : 'GUARDAR'}</Text>
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