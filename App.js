import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './Components/HomeScreen';
import { UserScreen } from './Components/UserScreen';
// import { RegisterScreen } from './Components/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { LoginScreen } from './Components/LoginScreen';
import { BottomTabs } from './Components/BottomTabs';
import { store } from './Redux/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <View style={styles.container}> */}
        {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Books App"
          component={HomeScreen}
        // options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="User" component={UserScreen} options={{ title: 'Books App' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Books App' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Books App' }} />
      </Stack.Navigator> */}
        {/* <HomeScreen />
        <StatusBar style="auto" /> */}
        {/* </View> */}
        <BottomTabs />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
  },
});
