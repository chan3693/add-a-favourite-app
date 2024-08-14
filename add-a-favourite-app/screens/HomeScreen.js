import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';


const HomeScreen = ({navigation}) => {
    const [videoList, setVideoList] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect( () =>{
        fetch('https://api.dailymotion.com/user/x1audmk/videos?limit=20')
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
            console.log(`objects received : ${jsonData.list.length}`);
            setVideoList(jsonData.list)
        })
        .catch( (error) => { 
            console.log(`Error while connecting to API : ${JSON.stringify(error)}`) 
        })
        .finally( () => setLoading(false))
    }, [])

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
                isLoading ?
                ( <ActivityIndicator size="large"/> ) :
                ( <FlatList
                    data={videoList}
                    keyExtractor={(item)=> {return item.id}}
                    renderItem={renderDataItem}
                /> )
            }
        </View>
    )

}

const styles = StyleSheet.create({
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

})

export default HomeScreen