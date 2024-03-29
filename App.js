import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Comfortaa_700Bold, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/dev';
import Collapsible from 'react-native-collapsible';

import { WEATHER_API_KEY, WEATHER_URL, WEATHER_ALERT_URL, WEATHER_FORECAST_URL } from '@env'
import { colors, size, fonts } from './utils';
import Temperature from './components/Temperature';
import WeatherDetails from './components/WeatherDetails';
import Alerts from './components/Alerts';
import MiscDetails from './components/MiscDetails';
import WeatherTips from './components/WeatherTips';
import ChangeUnits from './components/ChangeUnits';
import Reload from './components/Reload';
import ExtremeHeat from './components/ExtremeHeat';
import MenuButton from './components/MenuButton';
import Forecast from './components/Forecast';

export default function App() {
  const [weather, setWeather] = useState(null); // A state that holds the information about weather.
  const [errorMsg, setErrorMsg] = useState(null); // State that holds information about error messages
  const [unitSystem, setUnitSystem] = useState('I'); // Determines imperial or celsius units
  const [alert, setAlert] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [forecast, setForecast] = useState(true);

  let [fontsLoaded] = useFonts({
    Comfortaa_700Bold, Inter_400Regular, Inter_700Bold
  });

  useEffect(() => {
    loadApp()
  }, [unitSystem]);

  async function loadApp() {
    setWeather(null);
    setErrorMsg(null);
    setCollapsed(true);
    try {

      await SplashScreen.preventAutoHideAsync();

      let { status } = await Location.requestForegroundPermissionsAsync();

      if(status !== 'granted') {
        setErrorMsg('Access to location is required to run this app.');
        return
      };

      const location = await Location.getCurrentPositionAsync();
      const {latitude, longitude} = location.coords;

      const weatherUrl = `${WEATHER_URL}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&units=${unitSystem}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherResult = await weatherResponse.json();

      const alertUrl = `${WEATHER_ALERT_URL}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
      const alertResponse = await fetch(alertUrl, {method: 'GET', dataType: 'json'});
      const alertResult = await alertResponse.json();
      
      const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&days=9&units=${unitSystem}`;
      const forecastResponse = await fetch(forecastUrl, {method: 'GET', dataType: 'json'});
      const forecastResult = await forecastResponse.json();
     

      (weatherResponse.ok) ? setWeather(weatherResult) : setErrorMsg(weatherResult.message);
      (alertResponse.ok) ? setAlert(alertResult) : setErrorMsg(alertResult.message);
      (forecastResponse.ok) ? setForecast(forecastResult) : setErrorMsg(forecastResult.message);

      setAppReady(true);

    } catch(error) {
      setErrorMsg(error.message);
    };
  };

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  };

    // Normal display
    if(weather && fontsLoaded) {
      let { data: [{ pod }]} = weather;
      return (
        <View style={[pod == String('d') ? styles.mainDay : styles.mainNight]} onLayout={onLayoutRootView}>
          <StatusBar /> 
          <ScrollView>
            <View style={styles.header}>
              <Temperature weather={weather}/>
            </View>
            <View style={{width: 40, position: 'absolute', left: 300, top: 30}}>
              <MenuButton collapsed={collapsed} setCollapsed={setCollapsed} />
              <Collapsible collapsed={collapsed}>
                  <ChangeUnits unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
                  <Reload load={loadApp} />
              </Collapsible>
            </View>
            <View style={{...styles.infoBox}}>
              <WeatherDetails weather={weather} unitSystem={unitSystem} />
            </View>
    
            <Alerts alert={alert}></Alerts>       
            
            <ExtremeHeat weather={weather} unitSystem={unitSystem} />
            
            <WeatherTips weather={weather} />
            
            <View style={styles.infoBox}>
              <Forecast forecast={forecast} />
            </View>

            <View style={styles.infoBox}>
              <MiscDetails weather={weather} unitSystem={unitSystem}/>
            </View>

            <View style={{marginTop: 10, marginBottom: 20}}>
              <Text style={styles.textFooter}>Created by awoelf @ github.com</Text>
            </View>
            
            
          </ScrollView>
        </View>
      )
    // Error page
    } else if (errorMsg){
      return(
        <View style={styles.mainDay} onLayout={onLayoutRootView}>
          <StatusBar />
          <Text style={styles.text}>{errorMsg}</Text>
        </View>
      );
    // Just in case something weird happens, return null.  
    } else {
      return(
        <View style={styles.mainDay}>
          <StatusBar />
          <Text style={styles.text}>Loading...</Text>
        </View>
      )
      
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
    fontFamily: fonts.HEADER,
    fontSize: size.HEADER2,
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
    alignItems: 'stretch'
  },
  header: {
    paddingTop: 30
  },
  smallButton: {
    width: 40,
    marginBottom: 10
  },
  textFooter: {
    fontFamily: fonts.HEADER,
    fontSize: size.BODY,
    color: colors.FONT_COLOR,
    textAlign: 'center',
  },
});
