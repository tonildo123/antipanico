import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, MD3Colors, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SPComponent = () => {
    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Numeros utiles</Text>
            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={styles.button}
                icon={() => <Icon name="police-badge" size={68} color={MD3Colors.primary99} style={styles.icon} />}
            >
                <Text variant="displaySmall" style={styles.text}>POLICIA</Text>
            </Button>
            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={styles.button}
                icon={() => <Icon name="fire-truck" size={68} color={MD3Colors.primary99} style={styles.icon} />}
            >
                <Text variant="displaySmall" style={styles.text}>BOMBEROS</Text>
            </Button>
            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={styles.button}
                icon={() => <Icon name="ambulance" size={68} color={MD3Colors.primary99} style={styles.icon} />}
            >
                <Text variant="displaySmall" style={styles.text}>AMBULANCIA</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center', // Centrar horizontalmente
        padding: 16,
        width: '100%', // Ocupar el 100% del ancho
    },
    button: {
        flex: 1,
        width: '100%', // Ocupar el 100% del ancho
        marginVertical: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    icon: {
        alignSelf: 'center', // Centrar el icono horizontalmente
    },
    text: {
        color: MD3Colors.primary99,
        fontWeight: 'bold',
    },
});

export default SPComponent;
