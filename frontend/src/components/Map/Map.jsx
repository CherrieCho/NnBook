import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ lat, lng, onLocationSelect }) => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });

  useEffect(() => {
    setMarkerPosition({ lat, lng });
  }, [lat, lng]);

  const containerStyle = {
    width: "100%",
    height: "300px",
    marginBlock: "1rem",
  };

  const handleMarkerDragEnd = (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    const newPosition = { lat: newLat, lng: newLng };
    setMarkerPosition(newPosition);
    if (onLocationSelect) {
      onLocationSelect(newPosition);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={17}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
