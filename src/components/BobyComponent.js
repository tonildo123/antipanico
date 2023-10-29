import { Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFirebase from '../hooks/useFirebase';

const BobyComponent = ({ navigation }) => {

    const {getFirebaseProfile, getFirebaseAddress,} =useFirebase()
    const handleClick = () => {
        console.log('View clickeado');
    };

    const traerDNI = async () => {
        const dni_stored = await AsyncStorage.getItem('DNI-STORAGE');
        if(dni_stored !== null && dni_stored !== undefined && dni_stored !== '' ){

            getFirebaseProfile(dni_stored);
            getFirebaseAddress(dni_stored)
        }
    }

    useEffect(() => {
        traerDNI();
    }, [])
    

    
    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} />
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={handleClick}>
                <IconButton
                    icon="bell-ring"
                    iconColor={MD3Colors.error50}
                    size={256}
                />
                <Text style={{ color: MD3Colors.error50, fontWeight: 'bold', fontSize: 25 }}>BOTON ANTIPANICO</Text>
            </TouchableOpacity>
        </View>

    )
}

export default BobyComponent