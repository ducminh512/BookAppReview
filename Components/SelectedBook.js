import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating, Chip, Button, BottomSheet, ListItem, Icon, Overlay } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { setBookmark, setBookDetails, setLikedBooks } from '../Redux/reduxSlice'
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import {
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function SelectedBook({ selected, allBooks, goBack }) {

    const [showBookData, setShowBookData] = useState([])
    const [showSynopsis, setShowSynopsis] = useState(false)
    const [openSheet, setOpenSheet] = useState(false)
    const [selectedOption, setSelectedOption] = useState(-1)
    const [review, setReview] = useState(false)
    const [userReview, setUserReview] = useState('')
    const [liked, setLiked] = useState(false)

    const loggedIn = useSelector((state) => state.books.loggedIn)
    // const bookMark = useSelector((state) => state.books.bookmark)
    const bookDetails = useSelector((state) => state.books.bookdetails)
    const likedBooks = useSelector((state) => state.books.likedBooks)

    const dispatch = useDispatch()

    let bookOptions = ['Want to Read', 'Start Reading', 'Read', 'Cancel']

    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        // Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        // Roboto_900Black_Italic,
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
    });

    useEffect(() => {
        let titleIndex = selected.indexOf("by");
        // console.log(titleIndex)
        let selectedBookData = []
        if (titleIndex === -1) {
            selectedBookData = allBooks.filter((book) => book.volumeInfo.title === selected)
        } else {
            let bookTitle = selected.substr(0, titleIndex - 1)
            // console.log(bookTitle)
            // console.log(allBooks)
            selectedBookData = allBooks.filter((book) => book.volumeInfo.title === bookTitle)
            // console.log(selectedBookData)
        }
        if (selectedBookData.length > 1) {
            selectedBookData.splice(1, 1)
        }
        setShowBookData(selectedBookData)
    }, [])

    useEffect(() => {
        let isRead = false
        let isCurrent = false
        let isWantTo = false
        if (showBookData.length > 0) {
            if(bookDetails.read.length > 0) {
                isRead = (bookDetails.read[0].volumeInfo.title === showBookData[0].volumeInfo.title)
                if (isRead) {
                    setSelectedOption(2)
                }
            }
            if(bookDetails.current.length > 0) {
                isCurrent = (bookDetails.current[0].volumeInfo.title === showBookData[0].volumeInfo.title)
                if (isCurrent) {
                    setSelectedOption(1)
                }
            }
            if(bookDetails.wantTo.length > 0) {
                isWantTo = (bookDetails.wantTo[0].volumeInfo.title === showBookData[0].volumeInfo.title)
                if (isWantTo) {
                    setSelectedOption(0)
                }
            }
        }
    }, [showBookData])

    const showFullSynopsis = () => {
        setShowSynopsis(!showSynopsis)
        // console.log('message: ', bookMark)
    }

    const saveBookmark = (i) => {
        console.log(i)
        setOpenSheet(false)
        if (i !== 3) {
            setSelectedOption(i)
        }
        dispatch(setBookmark(bookOptions[i]))
        switch (bookOptions[i]) {
            case 'Want to Read':
                dispatch(setBookDetails({ ...bookDetails, wantTo: [...bookDetails.wantTo, showBookData[0]] }))
                break;
            case 'Start Reading':
                dispatch(setBookDetails({ ...bookDetails, current: [...bookDetails.current, showBookData[0]] }))
                break;
            case 'Read':
                dispatch(setBookDetails({ ...bookDetails, read: [...bookDetails.read, showBookData[0]] }))
                break;
            default:
                break;
        }
    }

    const openReview = () => {
        setReview(true)
    }

    const addLikedBooks = () => {
        setLiked(!liked)
        // if(liked) {
        let newlyLiked = likedBooks
        newlyLiked.push(showBookData)
        setLikedBooks(likedBooks)
        // }
    }

    const displayBookInfo = (book) => {
        // console.log(book.item.volumeInfo.description.length)

        return (
            <>
                {fontsLoaded && <View style={styles.flatList}>
                    <TouchableOpacity onPress={goBack}>
                        <Text style={styles.showMore}>Back</Text>
                    </TouchableOpacity>

                    <View style={styles.bookContainer}>

                        <View style={{ borderColor: 'teal', borderWidth: 1, borderRadius: 10, padding: 20, width: 300 }}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: book.item.volumeInfo.imageLinks.smallThumbnail,
                                    }}
                                />
                            </View>
                            <View style={styles.titleInfo}>
                                <Text style={styles.title}>{book.item.volumeInfo.title}</Text>
                                <Text style={styles.author}>by {book.item.volumeInfo.authors}</Text>
                                <Chip title={book.item.volumeInfo.categories[0]} containerStyle={{ marginVertical: 10 }} />
                                <View style={styles.rating}>
                                    {/* <Rating
                                    type="star"
                                    startingValue={book.item.volumeInfo.averageRating}
                                    readonly
                                    imageSize={30}
                                    style={{ paddingVertical: 10 }}
                                /> */}
                                    <Text style={styles.ratingNumber}>{book.item.volumeInfo.averageRating} ({book.item.volumeInfo.ratingsCount} ratings)</Text>
                                </View>
                                <TouchableOpacity onPress={() => addLikedBooks()}>
                                    <MaterialCommunityIcons
                                        name={liked ? "heart" : "heart-outline"}
                                        size={32}
                                        color={liked ? "red" : "white"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.synopsis}>Synopsis</Text>
                        {!showSynopsis && <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>{book.item.volumeInfo.description.substr(0, 450)}...
                            <TouchableOpacity onPress={() => showFullSynopsis()}>
                                <Text style={styles.showMore}>Show more</Text>
                            </TouchableOpacity>
                        </Text>}
                        {showSynopsis && <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>{book.item.volumeInfo.description}
                            <TouchableOpacity onPress={() => showFullSynopsis()}>
                                <Text style={styles.showMore}>Show less</Text>
                            </TouchableOpacity></Text>}
                    </View>
                    <View style={styles.bottomContent}>
                        <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium' }}><Text style={styles.bottom}>Published:</Text> {book.item.volumeInfo.publishedDate}</Text>
                        <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium' }}><Text style={styles.bottom}>Pages:</Text> {book.item.volumeInfo.pageCount}</Text>
                    </View>
                    <View style={styles.yourRating}>
                        {!loggedIn && <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login to access additional features</Text>}
                        {loggedIn && <><Text>Rate the book</Text>
                            <Rating
                                type="star"
                                startingValue={0}
                                imageSize={30}
                                style={{ paddingVertical: 10 }}
                            />
                            <Button
                                title={userReview === '' ? 'Write a Review' : 'Edit Review'}
                                containerStyle={{
                                    width: 200,
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                }}
                                onPress={() => openReview()}
                            />
                            <Button
                                title={selectedOption === -1 ? 'Save to My Books' : bookOptions[selectedOption]}
                                containerStyle={{
                                    width: 200,
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                }}
                                onPress={() => setOpenSheet(true)}
                            /></>}
                        <BottomSheet modalProps={{}} isVisible={openSheet}>
                            {bookOptions.map((l, i) => (
                                <ListItem
                                    key={i}
                                    // containerStyle={l.containerStyle}
                                    onPress={() => saveBookmark(i)}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            <View style={styles.bottomSheet}>
                                                <Text>{l}</Text>
                                                {i !== 3 && selectedOption === i ? <Text><Icon name='done' color="green" /></Text> :
                                                    i === 3 ? <Text><Icon name='close' color="red" /></Text> : <></>}
                                            </View>
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))}
                        </BottomSheet>
                    </View>
                    {userReview !== '' && <View>
                        <Text style={{ color: 'white', fontFamily: 'Oswald_700Bold', paddingBottom: 10 }}>My Review: </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Oswald_500Medium', height: 175,
                            width: 350, borderColor: 'teal', borderWidth: 1, padding: 10
                        }}>{userReview}</Text>
                    </View>}
                    <Overlay isVisible={review}
                        overlayStyle={{ backgroundColor: '#121212', borderColor: 'white', borderWidth: 1 }}
                    >
                        <View style={{
                            height: 260,
                            width: 300,
                            padding: 10
                        }}>
                            <Text style={{ color: 'white', paddingBottom: 10 }}>Please provide your review below</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                style={{ color: 'white', borderColor: 'white', borderWidth: 1 }}
                                onChangeText={(value) => setUserReview(value)}
                            />
                            <Button
                                title={'Submit'}
                                containerStyle={{
                                    // width: 200,
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                }}
                                onPress={() => setReview(false)}
                            />
                        </View>
                    </Overlay>
                </View>
                }
            </>
        )
    }

    return (
        <View style={styles.container}>
            {showBookData.length > 0 && <FlatList
                data={showBookData}
                renderItem={(book) => displayBookInfo(book)}
                showsVerticalScrollIndicator={false}
            ></FlatList>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 5,
        // padding: 20
    },
    tinyLogo: {
        width: 130,
        height: 200,
    },
    flatList: {
        paddingBottom: 60
    },
    bookContainer: {
        padding: 10,
        marginLeft: 25
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 20
    },
    titleInfo: {
        alignItems: 'center',
        padding: 5
    },
    title: {
        // fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        fontFamily: 'Oswald_700Bold'
    },
    author: {
        color: 'grey',
        fontSize: 14,
        fontFamily: 'Oswald_500Medium'
    },
    rating: {
        display: 'flex',
        flexDirection: 'row'
    },
    ratingNumber: {
        padding: 15,
        color: 'white',
        fontFamily: 'Oswald_500Medium'
    },
    synopsis: {
        // fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: 'white',
        fontFamily: 'Oswald_700Bold'
    },
    showMore: {
        textDecorationLine: 'underline',
        color: 'teal',
        fontSize: 14,
    },
    bottomContent: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
    },
    bottom: {
        fontWeight: 'bold',
        color: 'white'
    },
    yourRating: {
        alignItems: 'center',
        padding: 30
    },
    bottomSheet: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 400,
    },
})