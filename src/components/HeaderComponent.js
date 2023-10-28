import React from 'react'
import { StyleSheet, PermissionsAndroid } from 'react-native';
import { Appbar, Button, MD3Colors, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderComponent = ({ navigation }) => {

  const requestGeolocalizacionPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Access fine location Permission",
          message:
            "Cool Maps App needs access to your location " +
            "so you can get location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");

        navigation.navigate('Address')
        
      } else {
        console.log("mapa permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <Appbar.Header style={styles.header}>
      <Button onPress={() => navigation.navigate('Home')}
        icon={() => <Icon name="cellphone" size={24} color={MD3Colors.error50} />}
      ><Text style={styles.text}>INICIO</Text></Button>
      <Button
        onPress={() => navigation.navigate('Profile')}
        icon={() => <Icon name="account" size={24} color={MD3Colors.error50} />}
      ><Text style={styles.text}>PERFIL</Text></Button>
      <Button
        onPress={() => {requestGeolocalizacionPermission()}}
        icon={() => <Icon name="home" size={24} color={MD3Colors.error50} />}
      ><Text style={styles.text}>DOMICILIO</Text></Button>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: { display: 'flex', justifyContent: 'space-evenly' },
  text: { color: MD3Colors.error50, fontWeight: 'bold' },
});

export default HeaderComponent