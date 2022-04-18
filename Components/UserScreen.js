import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { SelectedBook } from './SelectedBook';
import { ViewAllBooks } from './ViewAllBooks';
import { Icon, Chip } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setBookmark, setBookDetails } from '../Redux/reduxSlice'
import {
    useFonts,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
} from '@expo-google-fonts/oswald';

export function UserScreen() {

    const [bookData, setBookData] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState('')
    const [showBook, setShowBook] = useState(false)
    const [allBooks, setAllBooks] = useState([])
    const [bookImage, setBookImage] = useState([])
    const [showViewAll, setShowViewAll] = useState(false)
    const [userQuery, setUserQuery] = useState('')
    const [selectedQuery, setSelectedQuery] = useState([])
    const [searched, setSearched] = useState(false)
    const dispatch = useDispatch()
    let [fontsLoaded] = useFonts({
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
    });

    const filterBooks = async (query) => {
        // console.log('query: ', query)
        setUserQuery(query)
        if (query.length >= 3) {
            try {
                let filterSearchData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query} :keyes&key=AIzaSyAajcnCCg4sfhvrnUV1RuQ-vmWBpejnqAs`)
                let filterResponse = await filterSearchData.json()
                // console.log('response: ', filterResponse.items)
                setAllBooks(filterResponse.items)
                let filteredTitles = []
                let allImages = []
                filterResponse.items.forEach(element => {
                    filteredTitles.push(`${element.volumeInfo.title} by ${element.volumeInfo.authors}`)
                    allImages.push(element.volumeInfo.imageLinks.smallThumbnail)
                });
                console.log('filteredTitles: ', filteredTitles.splice(5, 5))
                filteredTitles.push('View All 10 Results')
                setFilteredBooks(filteredTitles)
                setBookImage(allImages)
            } catch (error) {
                console.log(error)
            }
        }
    };

    const showSearchedBooks = async () => {
        try {
            let fetchSearchData = await fetch('https://www.googleapis.com/books/v1/volumes?q=business&inauthor=abc&key=AIzaSyAajcnCCg4sfhvrnUV1RuQ-vmWBpejnqAs')
            let searchResponse = await fetchSearchData.json()
            // console.log('response: ', searchResponse)
            setBookData(searchResponse.items)
        } catch (error) {
            console.log(error)
        }
    }

    const saveSelectedBook = (book, index) => {
        // console.log('book: ', book, index)
        if (index === filteredBooks.length - 1) {
            setShowViewAll(true)
        } else {
            setFilteredBooks([])
            setSelectedBook(book)
            setShowBook(true)
        }
        setSearched(true)
        setSelectedQuery([...selectedQuery, userQuery])
    }

    const goBack = () => {
        setShowBook(false)
        dispatch(setBookmark(''))
    }

    const deleteChip = (i) => {
        // console.log(i)
        let deleteSelection = []
        deleteSelection = selectedQuery.splice(i, 1)
        // console.log(deleteSelection)
        setSelectedQuery(deleteSelection)
    }

    return (
        <View style={styles.container}>
            {!showBook && !showViewAll && fontsLoaded && <><View>
                <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium', fontSize: 16 }}>Enter book title or name of the author</Text>
                <View style={styles.autocompleteContainer}>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        // value={selectedBook}
                        // containerStyle={styles.autocompleteContainer}
                        data={filteredBooks}
                        onChangeText={(text) => filterBooks(text)}
                        placeholder="Type 3 or more letters"
                        flatListProps={{
                            keyExtractor: (_, idx) => idx,
                            renderItem: ({ item, index }) => <TouchableOpacity onPress={() => saveSelectedBook(item, index)}>
                                {index !== filteredBooks.length - 1 && <View style={styles.suggestions}>
                                    <View style={styles.book}>
                                        <Image
                                            style={styles.bookLogo}
                                            source={{
                                                uri: bookImage[index],
                                            }}
                                        />
                                        <View style={styles.bookInfo}>
                                            <Text style={styles.bookTitle}>{item.substr(0, item.indexOf("by") - 1)}</Text>
                                            <Text style={styles.bookAuthor}>{item.substr(item.indexOf("by"), item.length - 1)}</Text>
                                        </View>
                                    </View>
                                </View>}
                                {index === filteredBooks.length - 1 && <Text style={styles.viewAll}>{item}</Text>}
                            </TouchableOpacity>,
                        }}
                    />
                </View>
            </View>
                <View style={styles.recentContainer}>
                    {searched && <>
                        <Text style={styles.recent}>Recent Searches <Text>({selectedQuery.length})</Text></Text>
                        {selectedQuery.map((element, index) => {
                            return <View style={styles.chip}><Chip
                                title={element}
                                key={index}
                                icon={{
                                    name: 'close',
                                    type: 'font-awesome',
                                    size: 20,
                                    color: 'white',
                                }}
                                onPress={() => deleteChip(index)}
                                iconRight
                                containerStyle={{ marginVertical: 10, width: 175 }}
                            /></View>
                        })}</>}
                </View>
                <View style={styles.noRecentContainer}>
                    {!searched && <><Text style={styles.noRecent}>No Recent Searches</Text>
                        <Icon
                            name='search' color={'white'} size={50} /></>}
                </View>
            </>}

            {showBook && <SelectedBook selected={selectedBook} allBooks={allBooks} goBack={() => goBack()} />}
            {showViewAll && <ViewAllBooks allBooks={allBooks} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#121212',
        height: 800
    },
    tinyLogo: {
        width: 150,
        height: 300,
    },
    flatList: {
        paddingBottom: 60
    },
    bookContainer: {
        padding: 20,
        borderWidth: 1
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 20
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 50,
        zIndex: 1
    },
    noRecentContainer: {
        marginTop: 100,
        alignItems: 'center'
    },
    recentContainer: {
        marginTop: 100
    },
    resultsContainer: {
        marginTop: 30
    },
    suggestions: {
        display: 'flex',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    book: {
        display: 'flex',
        flexDirection: 'row'
    },
    bookInfo: {
        display: 'flex'
    },
    bookLogo: {
        width: 35,
        height: 60,
    },
    bookTitle: {
        color: 'black',
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    bookAuthor: {
        color: 'grey',
        fontSize: 14,
        paddingLeft: 10,
    },
    viewAll: {
        padding: 10
    },
    noRecent: {
        fontSize: 20,
        padding: 10,
        color: 'white',
        fontFamily: 'Oswald_500Medium'
    },
    recent: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Oswald_500Medium'
        // fontWeight: 'bold'
    },
    chip: {
        // display: 'flex',
        // flexDirection: 'row',
        // width: 200
        // // justifyContent: 'center'
    }
})
