import { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Pressable,TouchableOpacity, Alert } from 'react-native'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../config/FirebaseConfig'

const FavouriteListScreen = ({navigation}) => {
    const [favouritesList, setFavouritesList] = useState([])

    useEffect( () => {
        getAllFavourites()
    }, [])

    const getAllFavourites = async () => {
        try{
            const collectionRef = collection(db, 'Favourite DB')
            const querySnapshot = await getDocs(collectionRef)
            const resultsFromDB = []

            querySnapshot.forEach( (eachDoc) => {
                console.log(`eachDoc : ${JSON.stringify(eachDoc)}`)
                const fav = {
                    id: eachDoc.id,
                    ...eachDoc.data()
                }
                console.log(`fav : ${JSON.stringify(fav)}`)
                resultsFromDB.push(fav)
            })
            setFavouritesList(resultsFromDB)
        } catch(err){
            console.log(`Error while retrieving all fav : ${err}`)
        }
    }

    const btnClearFavourites = async () => {
        try{
            const collectionRef = collection(db, 'Favourite DB')
            const querySnapshot = await getDocs(collectionRef)

            querySnapshot.forEach( (eachDoc) => {
                deleteDoc(eachDoc.ref)
                console.log(`${eachDoc.id} deleted successfully`);
            })
            setFavouritesList([])
        } catch(err){
            console.log(`Error while deleting all fav : ${err}`)
        }
    }

    const renderDataItem = ({item}) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                console.log(`${item.title} selected`)
                navigation.navigate('Video Details', {videoId: item.id})
            }}
        >
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    )

    return(
        <View style={styles.container}>
            {
                favouritesList.length === 0 ?
                ( <Text style={styles.msgTitle}>No favorites found</Text> ) :
                ( 
                    <>                    
                        <FlatList
                            data={favouritesList}
                            keyExtractor={(item)=> {return item.id}}
                            renderItem={renderDataItem}
                        />
                        <Pressable 
                            style={styles.buttonStyle} 
                            onPress={btnClearFavourites} 
                        >
                            <Text style={styles.buttonTextStyle}>CLEAR FAVORITES</Text>
                        </Pressable>
                </>

                )
            }
       
        </View>
    )

}

const styles = StyleSheet.create({
    msgTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'teal',
        textAlign: 'center'
      },
    container : {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%'
    },
    itemContainer: {
        borderRadius: 10,
        padding: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
        marginVertical: 8,
        marginHorizontal: 14,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#01608e'
    },
    buttonStyle: {
        height: 50,
        margin: 20,
        padding: 5,
        backgroundColor:'teal',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        color:'white',
        fontSize: 20
    }

})

export default FavouriteListScreen