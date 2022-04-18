import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Overlay } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../Redux/reduxSlice'
import {
    useFonts,
    Oswald_500Medium,
} from '@expo-google-fonts/oswald';

export function AccountScreen({ showLogin, showRegister }) {

    const [loginModal, setLoginModal] = useState(showLogin)
    const [registerModal, setRegisterModal] = useState(showRegister)
    const dispatch = useDispatch()
    let [fontsLoaded] = useFonts({
        Oswald_500Medium,
    })

    useEffect(() => {
        // console.log(showLogin)
        setLoginModal(showLogin)
    }, [showLogin])

    useEffect(() => {
        // console.log(showLogin)
        setRegisterModal(showRegister)
    }, [showRegister])

    return (
        <>
            <Overlay isVisible={loginModal}
                overlayStyle={{ backgroundColor: '#121212', borderColor: 'white', borderWidth: 1 }}

            // onRequestClose={() => {
            //     Alert.alert("Modal has been closed.");
            //     setModalVisible(!modalVisible);
            // }}
            >
                {fontsLoaded && <View style={styles.loginContainer}>
                    <View>
                        <Text style={styles.inputText}>Username:</Text>
                        <Input
                            // onChangeText={onChangeText}
                            // value={text}
                            placeholder='Enter Username'
                            inputStyle={{ color: 'white' }}
                        />
                        <Text style={styles.inputText}>Password:</Text>
                        <Input
                            // onChangeText={onChangeNumber}
                            // value={number}
                            secureTextEntry={true}
                            placeholder='Enter Password'
                            inputStyle={{ color: 'white' }}
                        />
                    </View>
                    <View style={styles.actionContainer}>
                        <Button title="Login" color="#f194ff" onPress={() => dispatch(setLogin(true))}></Button>
                        <Button title="Cancel" color="#f194ff" onPress={() => setLoginModal(false)}></Button>
                    </View>
                </View>}
            </Overlay>
            <Overlay isVisible={registerModal}
                overlayStyle={{ backgroundColor: '#121212', borderColor: 'white', borderWidth: 1 }}
                // onRequestClose={() => {
            //     Alert.alert("Modal has been closed.");
            //     setModalVisible(!modalVisible);
            // }}
            >
                {fontsLoaded && <View style={styles.registerContainer}>
                    <View>
                        <Text style={styles.inputText}>First Name:</Text>
                        <Input
                            // onChangeText={onChangeText}
                            // value={text}
                            placeholder='Enter First Name'
                            inputStyle={{ color: 'white' }}
                        />
                        <Text style={styles.inputText}>Last Name:</Text>
                        <Input
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder='Enter Last Name'
                            inputStyle={{ color: 'white' }}
                        />
                        <Text style={styles.inputText}>Email Address (Use email as username while login):</Text>
                        <Input
                            // onChangeText={onChangeText}
                            // value={text}
                            placeholder='Enter Email Address'
                            inputStyle={{ color: 'white' }}
                        />
                        <Text style={styles.inputText}>Password:</Text>
                        <Input
                            // onChangeText={onChangeNumber}
                            // value={number}
                            secureTextEntry={true}
                            placeholder='Enter Password'
                            inputStyle={{ color: 'white' }}
                        />
                        <Text style={styles.inputText}>Confirm Password:</Text>
                        <Input
                            // onChangeText={onChangeNumber}
                            // value={number}
                            secureTextEntry={true}
                            placeholder='Confirm Password'
                            inputStyle={{ color: 'white' }}
                        />
                    </View>
                    <View style={styles.actionContainer}>
                        <Button title="Register" color="#f194ff" onPress={() => dispatch(setLogin(true))}></Button>
                        <Button title="Cancel" color="#f194ff" onPress={() => setRegisterModal(false)}></Button>
                    </View>
                </View>}
            </Overlay>
        </>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        // top: 50,
        height: 300,
        width: 300,
        padding: 10,
        // alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    registerContainer: {
        // top: 50,
        height: 600,
        width: 350,
        padding: 10,
        // alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    inputText: {
        paddingBottom: 10,
        fontSize: 15,
        color: 'white',
        fontFamily: 'Oswald_500Medium'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
        // width: 250,
    }
})