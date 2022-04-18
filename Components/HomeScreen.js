import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import React, { useState } from 'react';
import { AccountScreen } from './AccountScreen';
import {
    useFonts,
    Oswald_500Medium,
} from '@expo-google-fonts/oswald';

export function HomeScreen({ navigation }) {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const image = { uri: "https://wallpapercave.com/dwp2x/wp10055131.jpg" };

    let [fontsLoaded] = useFonts({
        Oswald_500Medium,
    });

    return (
        <View style={{ backgroundColor: '#121212', height: 800 }}>
            {/* <ImageBackground source={image} style={styles.image}> */}
            {fontsLoaded &&   <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.login}>Login/Register to access app features</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={() => setShowLogin(true)}></Button>
                        <Button title="Register as New User" onPress={() => setShowRegister(true)}></Button>
                    </View>
                </View>}
            {/* </ImageBackground> */}
            <AccountScreen showLogin={showLogin} showRegister={showRegister} />
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 50,
        padding: 20,
        display: 'flex',
        // height: 700,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleContainer: {
        display: 'flex',
        height: 60,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        display: 'flex',
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 400,
        marginLeft: 0
    },
    // emptyContainer: {
    //     height: 400
    // },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    titleText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    // image: {
    //     flex: 1,
    //     justifyContent: "center"
    // },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        // flex: 1,
        // resizeMode: 'cover',
        // justifyContent: 'center',
    },
    login: {
        // fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        fontFamily: 'Oswald_500Medium'
    }
})