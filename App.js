import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useFonts, Comfortaa_700Bold, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/dev';

import { WEATHER_API_KEY, WEATHER_URL, WEATHER_ALERT_URL } from '@env'
import { colors, size, fonts } from './utils';
import Temperature from './components/Temperature';
import WeatherDetails from './components/WeatherDetails';
import Alerts from './components/Alerts';


export default function App() {
  const [weather, setWeather] = useState(null); // A state that holds the information about weather.
  const [errorMsg, setErrorMsg] = useState(null); // State that holds information about error messages
  const [unitSystem, setUnitSystem] = useState('I'); // Determines imperial or celsius units
  const [alert, setAlert] = useState(null);
 
  let [fontsLoaded] = useFonts({
    Comfortaa_700Bold, Inter_400Regular, Inter_700Bold
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

      const weatherUrl = `${WEATHER_URL}lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&units=${unitSystem}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherResult = await weatherResponse.json();

      const alertUrl = `${WEATHER_ALERT_URL}lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
      const alertResponse = await fetch(alertUrl);
      const alertResult = await alertResponse.json();
      
      (weatherResponse.ok) ? setWeather(weatherResult) : setErrorMsg(weatherResult.message);
      (alertResponse.ok) ? setAlert(alertResult) : setErrorMsg(alertResult.message);

    } catch(error) {
      setErrorMsg(error.message);
    };
  };

  //TODO change to a splash screen to get rid of scary yellow text.
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Help</Text>
      </View>
    )
  } else {
    // Normal display
    if(weather) {
      let { data: [{ pod }]} = weather; 
      return (
        <View style={[pod == String('d') ? styles.mainDay : styles.mainNight]}>
          <View style={styles.header}>
            <StatusBar /> 
            <Text><Temperature weather={weather} /></Text>
          </View>
          {parseInt(alert) ?
            <View style={styles.infoBox}>
              <Text><Alerts alert={alert}></Alerts></Text>
            </View> : null
          }
          <View style={styles.infoBox}>
            <Text><WeatherDetails weather={weather} /></Text>
          </View>
        </View>
      )
    // Error page
    } else if (errorMsg){
      return(
        <View style={styles.main}>
          <StatusBar />
          <Text style={styles.text}>{errorMsg}</Text>
        </View>
      );
    // Misc. loading. Will be deleted when splash page is implemented.
    } else {
      return (
        <View style={styles.main}>
          <StatusBar />
          <Text style={styles.loadText}>Loading...</Text>
        </View>
      )
    }
  };
    
};
 

const styles = StyleSheet.create({
  mainDay: {
    flex: 1, 
    backgroundColor: colors.BACKGROUND_COLOR_DAY
  },
  mainNight: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR_NIGHT
  },
  text: {
    fontFamily: fonts.BODY,
    fontSize: size.BODY,
    color: colors.FONT_COLOR,
    textAlign: 'center'
  },
  loadText: {
    fontFamily: fonts.HEADER,
    fontSize: size.BODY,
    color: colors.FONT_COLOR,
    textAlign: 'center',
    top: Dimensions.get('window').height/2
  },
  infoBox: {
    backgroundColor: colors.BOX_BACKGROUND,
    paddingVertical: 20,
    marginHorizontal: 30,
    marginVertical: 4,
    borderRadius: 15,
    alignItems: 'center',
    width: 300
  },
  header: {
    marginBottom: 5
  }
});
