import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { useSelector, useDispatch } from 'react-redux'
import {
    useFonts,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
} from '@expo-google-fonts/oswald';

export function LikedBooks() {

    const [carouselItems, setCarouselItems] = useState([{
                image: 'https://www.freepnglogos.com/uploads/number-0-png/number-0-newest-submissions-puns-8.png',
                title: 'Books Liked'
    }])
    const likedBooks = useSelector((state) => state.books.likedBooks)

    let [fontsLoaded] = useFonts({
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
    });

    useEffect(() => {
        console.log(likedBooks)
        setCarouselItems(likedBooks)
    }, [likedBooks])

    // const _renderItem = ({ item, index }) => {
    //     console.log('item: ', item)
    //     return (
    //         <View style={{
    //             backgroundColor: 'teal',
    //             borderRadius: 5,
    //             height: 220,
    //             width: 180,
    //             padding: 20,
    //             marginLeft: 55,
    //             marginRight: 25,
    //             alignItems: 'center', 
    //             // borderColor: 'yellow',
    //             // borderWidth: 2
    //         }}>
    //             <Image
    //                 style={styles.bookLogo}
    //                 source={{
    //                     uri: item.image,
    //                 }}
    //             />
    //             <Text style={{ fontSize: 14, paddingTop: 15, color: 'white', fontFamily: 'Oswald_500Medium' }}>{item.title}</Text>
    //             {/* <Text>{item.text}</Text> */}
    //         </View>

    //     )
    // }

    return (
        <ScrollView>
            {/* {fontsLoaded && <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#121212' }}>
                <View style={styles.carouselContainer}>
                    {bookDetails.current.length > 0 && <Text style={styles.read}>Currently Reading <Text>({carouselItems.length})</Text></Text>}
                    <Carousel
                        layout={"stack"}
                        layoutCardOffset={9}
                        // ref={c => {
                        //     _carousel = c;
                        //   }}
                        data={carouselItems}
                        sliderWidth={300}
                        itemWidth={300}
                        renderItem={_renderItem}
                        onSnapToItem={index => setActiveIndex(index)} />
                </View>
            </View>} */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20
    },
    bookLogo: {
        width: 75,
        height: 120,
    },
    carouselContainer: {
        alignItems: 'center',
        padding: 20
    },
    read: {
        padding: 10,
        color: 'white', 
        fontFamily: 'Oswald_500Medium'
    },
    login: {
        // display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 300,
        backgroundColor: '#121212',
        height: 800,
    },
    logintext: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Oswald_500Medium'
    }
})