import { Alert, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFirebase from '../hooks/useFirebase';
import NetInfo from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';
import { set, ref, getDatabase } from '@react-native-firebase/database'
import useGeolocalizacion from '../hooks/useGeolocalizacion';

const BobyComponent = ({ navigation }) => {

    const { completed, dni } = useSelector(state => state.user)
    const { getFirebaseProfile, getFirebaseAddress, } = useFirebase()
    const {obtenerUbicacion, latitud, longitud} = useGeolocalizacion()

    useEffect(() => {
        NetInfo.addEventListener(state => {
            state.isConnected ? handleDatosCompleted() : Alert.alert('Debe conectarse a un RED ó WIFI');
        });

    }, [])
    useEffect(() => {
        obtenerUbicacion()
    }, [])
    

    handleDatosCompleted = () => {
        completed ? null : traerDNI();
    }


    const traerDNI = async () => {

        const dni_stored = await AsyncStorage.getItem('DNI-STORAGE');
        if (dni_stored !== null && dni_stored !== undefined && dni_stored !== '') {

            getFirebaseProfile(dni_stored);
            getFirebaseAddress(dni_stored)
            
        }

    }
    const handleClick = () => {
        const now = new Date();
        const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const database = ref(getDatabase(), 'notifications/'); 

        set(database, {
            dni: dni,
            ubicacion: {
                latitudActual: latitud,
                longitudActual: longitud
            },
            fecha: formattedDate,
            hora: formattedTime

        })
            .then(() => {
                Alert.alert('Alerta enviada')
            })
            .catch((e) => {
                console.log('error--->', e)
                Alert.alert('Error, no se pudo alertar')
            });
    };



    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} />
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={handleClick}>
                <IconButton
                    icon="bell-ring"
                    iconColor={completed ? MD3Colors.error50 : 'grey'}
                    size={256}
                />
                <Text style={{ color: completed ? MD3Colors.error50 : 'grey', fontWeight: 'bold', fontSize: 25 }}>BOTON ANTIPANICO</Text>
            </TouchableOpacity>
        </View>

    )
}

export default BobyComponent