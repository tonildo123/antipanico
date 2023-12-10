import { createStackNavigator } from '@react-navigation/stack';
import BobyComponent from './BobyComponent';
import ProfileComponent from './ProfileComponent';
import { NavigationContainer } from '@react-navigation/native';
import { MD3Colors } from 'react-native-paper';
import AddressComponent from './AddressComponent';
import WebViewComponent from './WebViewComponent';
import SPComponent from './SPComponent';

const Stack = createStackNavigator();

function InitComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BobyComponent} options={{
          title: 'San Pablo Seguridad',
          headerStyle: {
            backgroundColor: MD3Colors.error50,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Profile" component={ProfileComponent} options={{
          title: 'San Pablo Seguridad',
          headerStyle: {
            backgroundColor: MD3Colors.error50,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',

          },
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Address" component={AddressComponent} options={{
          title: 'San Pablo Seguridad',
          headerStyle: {
            backgroundColor: MD3Colors.error50,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',

          },
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Web" component={WebViewComponent} options={{
          title: 'San Pablo Seguridad',
          headerStyle: {
            backgroundColor: MD3Colors.error50,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',

          },
          headerTitleAlign: 'center',
        }} />
         <Stack.Screen name="sp" component={SPComponent} options={{
          title: 'San Pablo Seguridad',
          headerStyle: {
            backgroundColor: MD3Colors.error50,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',

          },
          headerTitleAlign: 'center',
        }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default InitComponent;