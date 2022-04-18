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

export function MyBooks() {

    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselItems, setCarouselItems] = useState([{
                image: 'https://www.freepnglogos.com/uploads/number-0-png/number-0-newest-submissions-puns-8.png',
                title: 'Books Currently Reading'
    }])
    const [carouselWanttoRead, setCarouselWanttoRead] = useState([{
        image: 'https://www.freepnglogos.com/uploads/number-0-png/number-0-newest-submissions-puns-8.png',
        title: 'Books Want to Read'
}])
    const [carouselRead, setCarouselRead] = useState([{
        image: 'https://www.freepnglogos.com/uploads/number-0-png/number-0-newest-submissions-puns-8.png',
        title: 'Books Read'
}])
    const loggedIn = useSelector((state) => state.books.loggedIn)
    const bookMark = useSelector((state) => state.books.bookmark)
    const bookDetails = useSelector((state) => state.books.bookdetails)
    let [fontsLoaded] = useFonts({
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
    });

    useEffect(async () => {
        console.log('show: ', bookMark)
        switch (bookMark) {
            case 'Want to Read':
                let carouselWantTo = []
                bookDetails.wantTo.forEach(element => {
                    carouselWantTo.push({
                        image: element.volumeInfo.imageLinks.smallThumbnail,
                        title: `${element.volumeInfo.title} by ${element.volumeInfo.authors}`
                    })
                });
                console.log('carousel: ', carouselWantTo)
                setCarouselWanttoRead(carouselWantTo)
                break;
            case 'Start Reading':
                let carouselCards = []
                bookDetails.current.forEach(element => {
                    carouselCards.push({
                        image: element.volumeInfo.imageLinks.smallThumbnail,
                        title: `${element.volumeInfo.title} by ${element.volumeInfo.authors}`
                    })
                });
                console.log('carousel: ', carouselCards)
                setCarouselItems(carouselCards)
                break;
            case 'Read':
                let carouselReads = []
                bookDetails.read.forEach(element => {
                    carouselReads.push({
                        image: element.volumeInfo.imageLinks.smallThumbnail,
                        title: `${element.volumeInfo.title} by ${element.volumeInfo.authors}`
                    })
                });
                console.log('carousel: ', carouselReads)
                setCarouselRead(carouselReads)
                break;
            default:
                break;
        }
        // let carouselCards = []
        // bookDetails.forEach(element => {
        //     carouselCards.push({
        //         image: element.volumeInfo.imageLinks.smallThumbnail,
        //         title: `${element.volumeInfo.title} by ${element.volumeInfo.authors}`
        //     })
        // });
        // console.log('carousel: ', carouselCards)
        // setCarouselItems(carouselCards)

    }, [bookMark, bookDetails])


    const _renderItem = ({ item, index }) => {
        console.log('item: ', item)
        return (
            <View style={{
                backgroundColor: 'teal',
                borderRadius: 5,
                height: 220,
                width: 180,
                padding: 20,
                marginLeft: 55,
                marginRight: 25,
                alignItems: 'center', 
                // borderColor: 'yellow',
                // borderWidth: 2
            }}>
                <Image
                    style={styles.bookLogo}
                    source={{
                        uri: item.image,
                    }}
                />
                <Text style={{ fontSize: 14, paddingTop: 15, color: 'white', fontFamily: 'Oswald_500Medium' }}>{item.title}</Text>
                {/* <Text>{item.text}</Text> */}
            </View>

        )
    }

    return (
        <ScrollView>
            {loggedIn && fontsLoaded && <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#121212' }}>
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

                <View style={styles.carouselContainer}>
                    {bookDetails.wantTo.length > 0 && <Text style={styles.read}>Want to Read <Text>({carouselWanttoRead.length})</Text></Text>}
                    <Carousel
                        layout={"stack"}
                        layoutCardOffset={9}
                        // ref={c => {
                        //     _carousel = c;
                        //   }}
                        data={carouselWanttoRead}
                        sliderWidth={300}
                        itemWidth={300}
                        renderItem={_renderItem}
                        onSnapToItem={index => setActiveIndex(index)} />
                </View>

                <View style={styles.carouselContainer}>
                    {bookDetails.read.length > 0 && <Text style={styles.read}>Read <Text>({carouselRead.length})</Text></Text>}
                    <Carousel
                        layout={"stack"}
                        layoutCardOffset={9}
                        // ref={c => {
                        //     _carousel = c;
                        //   }}
                        data={carouselRead}
                        sliderWidth={300}
                        itemWidth={300}
                        renderItem={_renderItem}
                        onSnapToItem={index => setActiveIndex(index)} />
                </View>
            </View>}
            {!loggedIn && <View style={styles.login}><Text style={styles.logintext}>Login to add books to your library</Text></View>}
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