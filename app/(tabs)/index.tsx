import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [location, setLocation] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation showsCompass>
        <Marker
          coordinate={{
            latitude: location?.coords?.latitude || '',
            longitude: location?.coords?.longitude || '',
          }}
          title={"user name"}
          description={"description"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
