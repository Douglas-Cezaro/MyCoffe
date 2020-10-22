import React, { Fragment, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import EstablishmentsService from "./services/establishments_service";
import Establishment from "./components/Establishment";
import NearstCoffees from "./components/NearstCoffees";

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState({});

  const { REACT_APP_GOOGLE_KEY } = process.env;

  useEffect(() => {
    setCurrentLocation();
  }, [longitude, latitude]);

  // Pegar localização do browser
  async function setCurrentLocation() {
    try {
      await navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
      await loadCoffeShops();
    } catch (error) {
      alert("Habilite a localização para utilizar o aplicativo!");
    }
  }
  // Load all coffee shops
  async function loadCoffeShops() {
    if (latitude !== 0 && longitude !== 0) {
      const response = await EstablishmentsService.index(latitude, longitude);
      setLocation(response.data.results);
    }
  }

  const selectedCoffe = async (item) => {
    const response = await EstablishmentsService.show(item);
    setSelected(response.data.result);
  };
  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        >
          {location.map((item, index) => {
            return (
              <Marker
                key={index}
                icon="/images/coffee-pin.png"
                title={item.name}
                animation="4"
                position={{
                  lat: item.geometry.location.lat,
                  lng: item.geometry.location.lng,
                }}
                onClick={() => setSelected(item)}
              />
            );
          })}
          {selected.place_id && <Establishment place={selected} />}
          <Marker
            key="my location"
            icon="/images/my-location-pin.png"
            title="Seu local"
            animation="2"
            position={{
              lat: latitude,
              lng: longitude,
            }}
          />
          ;
          {latitude !== 0 && longitude !== 0 && (
            <NearstCoffees
              latitude={latitude}
              longitude={longitude}
              onclickSelected={selectedCoffe}
            />
          )}{" "}
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
};

export default App;
