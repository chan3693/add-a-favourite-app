import { useState, useEffect } from 'react'
import { Text, Image, StyleSheet, ActivityIndicator, ScrollView, Pressable, Alert } from 'react-native'
import Video from 'react-native-video'
import { addDoc, setDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../config/FirebaseConfig'

const VideoDetailScreen = ({route, navigation}) => {
    const { videoId } = route.params
    const [videoDetail, setVideoDetail] = useState(null)
    const [isLoading, setLoading] = useState(true)
   
    useEffect( () =>{
        console.log(`id : ${videoId}`)
        fetch(`https://api.dailymotion.com/video/${videoId}?fields=thumbnail_240_url,description,views_total,title,created_time`)
        .then( (response) => {
            console.log(`Response status : ${response.status}`);
            if (response.ok){
                console.log(`Response okay from server : ${JSON.stringify(response)}`);
                return response.json()
            }else{
                console.log(`Unsuccessful response from server : ${response.status}`);
            }
        })
        .then( (jsonData) => {
            console.log(`objects received : ${JSON.stringify(jsonData)}`);
            setVideoDetail(jsonData)
        })
        .catch((error) => {
            console.log(`Error while getting data : ${JSON.stringify(error)}`)
        })
        .finally( () => setLoading(false))
    }, [videoId])
    
    const btnAddToFavourite = async () => {
        try{
            const docRef = doc(db, 'Favourite DB', videoId)
            const querySnapshot = await getDoc(docRef)
            if(querySnapshot.exists()){
                console.log(`id : ${docRef.id} already in favourites`)
                Alert.alert("Already in favourites")
            }else{
                await setDoc(docRef, videoDetail)
                console.log(`id : ${docRef.id} successfully added favourite`)
                Alert.alert("Success", "Added to favourites")
            }
        }catch(err){
            console.log(`Error while adding to favourite : ${err}`)
        }
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {
                isLoading ?
                (<ActivityIndicator size="large"/> ) :
                (
                    <>
                        <Image style={styles.image} source={{uri: videoDetail.thumbnail_240_url}}/>
                        <Text style={styles.title}>{videoDetail.title}</Text>
                        <Text style={styles.description}>{videoDetail.description}</Text>
                        <Text style={styles.view}>Views : {videoDetail.views_total}</Text>
                        <Pressable style={styles.buttonStyle} onPress={btnAddToFavourite}>
                        <Text style={styles.buttonTextStyle}>FAVOURITE</Text>
                        </Pressable>
                    </>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
    image: {
      width: '100%',
      height: 240,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#01608e',
    //   textAlign: 'center'
    },
    description: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    view:{
        fontSize: 14,
        marginVertical: 10
    },
    buttonStyle: {
        height: 50,
        margin: 0,
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
  });

export default VideoDetailScreen