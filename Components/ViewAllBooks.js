import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Rating, Chip, Button, Icon } from 'react-native-elements';
import { SelectedBook } from './SelectedBook';
import {
    useFonts,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
} from '@expo-google-fonts/oswald';

export function ViewAllBooks({ allBooks }) {

    const [listAll, setListAll] = useState([{}])
    const [selectedBook, setSelectedBook] = useState('')
    const [showSelected, setShowSelected] = useState(false)
    let [fontsLoaded] = useFonts({
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
    });

    useEffect(() => {
        let getAllData = []
        allBooks.forEach(element => {
            // listAll.push(`${element.volumeInfo.title} by ${element.volumeInfo.authors}`)
            // allImages.push(element.volumeInfo.imageLinks.smallThumbnail)
            getAllData.push({
                title: element.volumeInfo.title,
                author: element.volumeInfo.authors,
                image: element.volumeInfo.imageLinks.smallThumbnail,
                rating: element.volumeInfo.averageRating,
                pages: element.volumeInfo.pageCount,
                genre: element.volumeInfo.categories[0]
            })
        })
        setListAll(getAllData)
    }, [allBooks])

    const displaySelectedBook = (title) => {
        setSelectedBook(title)
        setShowSelected(true)
    }

    const displayBooks = (books) => {
        console.log('books: ', books)
        return (
            <View>
                <TouchableOpacity onPress={() => displaySelectedBook(books.item.title)}>
                <View style={styles.listContainer}>
                    <View>
                        <Image
                            style={styles.bookLogo}
                            source={{
                                uri: books.item.image,
                            }}
                        />
                    </View>
                    <View style={styles.bookInfo}>
                        <Text style={styles.title}>{books.item.title}</Text>
                        <Text style={styles.author}>by {books.item.author}</Text>
                        {/* <Rating
                            type="star"
                            startingValue={books.item.rating}
                            readonly
                            imageSize={25}
                            style={{ paddingVertical: 20, paddingRight: 30 }}
                        /> */}
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium' }}>Pages: {books.item.pages}</Text>
                            <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium' }}>Rating: {books.item.rating}</Text>
                        </View>
                        <Chip title={books.item.genre} containerStyle={{ marginTop: 40 }} type="outline" />
                        {/* <Button
                            title={'View this Book'}
                            containerStyle={{
                                width: 160,
                                marginVertical: 10,
                            }}
                            onPress={() => displaySelectedBook(books.item.title)}
                        /> */}
                        {/* <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity                             onPress={() => displaySelectedBook(books.item.title)}
>
                            <Text style={{ color: 'white', paddingRight: 5 }}>View this book</Text>
                            <Icon name='east' color="white" />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {!showSelected && fontsLoaded && <><Text style={styles.top10}>Top 10 results</Text>
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={listAll}
                        renderItem={(books) => displayBooks(books)}
                        keyExtractor={(books, index) => index.toString()}
                    ></FlatList>
                </View></>}
            {showSelected && <SelectedBook selected={selectedBook} allBooks={allBooks} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0
    },
    top10: {
        // fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20,
        fontFamily: 'Oswald_700Bold',
        color: 'white'
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 30
    },
    bookLogo: {
        width: 120,
        height: 200
    },
    bookInfo: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        fontFamily: 'Oswald_700Bold',
        color: 'white'
    },
    author: {
        color: 'grey',
        fontFamily: 'Oswald_500Medium'
    }
})