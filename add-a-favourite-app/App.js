import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import FavouriteListScreen from './screens/FavouriteListScreen';

const Stack = createNativeStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={ () => ({
          headerStyle: {backgroundColor: '#d6cabc'},
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
        })}
      >
        <Stack.Screen 
          name='Home' 
          component={HomeScreen}
          options={({navigation})=>({
            headerRight: ()=>(
              <Pressable onPress={()=>{navigation.navigate('Favourite List')}}>
                <Text style={{fontWeight: 'bold'}}>VIEW FAVORITES</Text>
              </Pressable>
            )
          })}
        />
        <Stack.Screen name='Video Details' component={VideoDetailScreen}/>
        <Stack.Screen name='Favourite List' component={FavouriteListScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App