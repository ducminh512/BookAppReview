import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Rating, Chip, Button, BottomSheet, ListItem, Icon, Avatar, Switch } from 'react-native-elements';
import { HomeScreen } from './HomeScreen';
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../Redux/reduxSlice'
import { LikedBooks } from './LikedBooks';

export function Settings() {

    let settings = ['Theme', 'Profile', 'Liked Books']

    const isLogin = useSelector((state) => state.books.loggedIn)
    const dispatch = useDispatch()

    const [showTheme, setShowTheme] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showLiked, setShowLiked] = useState(false)

    const openSettings = (l, i) => {
        console.log(l, i)
        switch (l) {
            case 'Theme':
                setShowTheme(true)
                setShowProfile(false)
                setShowLiked(false)
                break;
            case 'Profile':
                setShowProfile(true)
                setShowTheme(false)
                setShowLiked(false)
                break;
            case 'Liked Books':
                setShowLiked(true)
                setShowTheme(false)
                setShowProfile(false)
                break;
            default:
                break;
        }
    }

    return (
        <View>
            {isLogin && (!showTheme && !showProfile && !showLiked) && <View style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar
                        size={64}
                        rounded
                        icon={{ name: 'person' }}
                        containerStyle={{ backgroundColor: '#00a7f7' }}
                    />
                </View>

                {settings.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={{
                            backgroundColor: '#121212',
                            borderBottomColor: 'grey', borderBottomWidth: 1,
                            borderTopColor: 'grey', borderTopWidth: 1
                        }}
                        onPress={() => openSettings(l, i)}
                    // onPress={() => saveBookmark(i)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>
                                <View style={styles.settingsList}>
                                    <Text style={{ color: 'white' }}>{l}</Text>
                                </View>
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
                <View style={styles.signout}>
                    <Button
                        title={'Sign Out'}
                        onPress={() => dispatch(setLogin(false))} />
                </View>
                <View style={styles.logo}>
                    <Image
                        style={styles.appLogo}
                        source={require('../assets/appLogo.png')}
                    />
                    <Text>Books App</Text>
                </View>

            </View>}
            {!isLogin && <HomeScreen />}
            {showLiked && <LikedBooks />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        height: 800
    },
    avatar: {
        alignItems: 'center',
        padding: 15
    },
    settingsList: {
        padding: 10,
        color: 'white'
    },
    signout: {
        padding: 100,
    },
    appLogo: {
        width: 150,
        height: 150
    },
    logo: {
        alignItems: 'center'
    }
})