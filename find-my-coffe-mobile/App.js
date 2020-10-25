import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import EstablishmentService from "./src/services/establishments_service";
import Establishment from "./src/components/Establishment";
import NearstCoffees from "./src/components/NearstCoffees";

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Ative as permissões de uso do GPS para acessar o APP");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        await loadCoffees();
      }
    })();
  }, [latitude, longitude]);

  async function loadCoffees() {
    try {
      const response = await EstablishmentService.index(latitude, longitude);
      setLocations(response.data.results);
    } catch (error) {
      setLocations([]);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <NearstCoffees latitude={latitude} longitude={longitude} />
      {selected && <Establishment place={selected} />}

      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          title="Seu Local"
          icon={require("./src/images/my-location-pin.png")}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
        {locations.map((item) => {
          return (
            <Marker
              key={item.place_id}
              title={item.name}
              icon={require("./src/images/coffee-big-pin.png")}
              coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
              }}
              onPress={() => setSelected(item)}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
