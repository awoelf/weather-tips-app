import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_700Bold, Inter_400Regular } from '@expo-google-fonts/dev';

import { WEATHER_API_KEY } from '@env'
import { colors, size, fonts } from './utils';
import Header from './components/Header';
import InfoBlock from './components/InfoBlock';



 

export default function App() {
  const [weather, setWeather] = useState(null); // A state that holds the information about weather.
  const [errorMsg, setErrorMsg] = useState(null); // State that holds information about error messages
  const [unitSystem, setUnitSystem] = useState('I'); // Determines imperial or 

  let [fontsLoaded] = useFonts({
    Comfortaa_700Bold, Inter_400Regular
  });

  // useEffect is a custom hook that runs once initially.
  useEffect(() => {
    loadApp()
  }, [unitSystem]);  // When unitSystem changes, useEffect will run.

  async function loadApp() {
    setWeather(null);
    setErrorMsg(null);
    try {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if(status !== 'granted') {
        setErrorMsg('Access to location is required to run this app.');
        return
      };

      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;

      const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&units=${unitSystem}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();
      
      if(response.ok) {
        setWeather(result);
      } else {
        setErrorMsg(result.message)
      }
    } catch(error) {
      setErrorMsg(error.message);
    };
  };

  //TODO change to a splash screen to get rid of scary yellow text.
  if (!fontsLoaded) {
    return (
      <View>
        <AppLoading /> 
      </View>
    )
  } else {
    // Normal display
    if(weather) { 
      return (
        <View style={styles.container}>
          <StatusBar /> 
          <Text><Header weather={weather}></Header></Text>
          <Text><InfoBlock></InfoBlock></Text>
        </View>
      )
    // Error page
    } else if (errorMsg){
      return(
        <View style={styles.container}>
          <StatusBar />
           <Text style={styles.text}>{errorMsg}</Text>
        </View>
        
      );
    // Misc. loading. Will be deleted when splash page is implemented.
    } else {
      return (
        <View style={styles.container}>
          <StatusBar />
          <Text style={styles.text}>Loading...</Text>
        </View>
      )
    }
  };
    
  };
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR,
  },
  text: {
    fontFamily: fonts.HEADER,
    fontSize: size.BODY,
    color: colors.FONT_COLOR,
    textAlign: 'center',
    top: Dimensions.get('window').height/2,
  }
});
