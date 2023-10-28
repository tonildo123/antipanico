import { Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseSelector, useDispatch, useSelector } from 'react-redux';

const BobyComponent = ({navigation}) => {

    const state = useSelector(state => state)
    const distpach = useDispatch()

    const handleClick = () => {
        console.log('View clickeado');
    };

    useEffect(() => {
      
    console.log('DNI storaged', AsyncStorage.getItem('DNI_STORAGE'))
    console.log('state', JSON.stringify(state, null, 6))
      
    }, [])
    
    

    return (
        <View style={{ flex: 1}}>
            <HeaderComponent navigation={navigation}/>
            <TouchableOpacity
            style={{flex:1, justifyContent:'center', alignItems:'center'}}                
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