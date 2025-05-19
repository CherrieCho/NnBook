import { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

const Map = ({ lat, lng, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });

  useEffect(() => {
    setMarkerPosition({ lat, lng });
  }, [lat, lng]);

  const handleMapClick = (e) => {
    const { _lat, _lng } = e.coord;
    const newPosition = { lat: _lat, lng: _lng };
    setMarkerPosition(newPosition);
    if (onLocationSelect) {
      onLocationSelect(newPosition);
    }
  };

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "300px",
      }}
    >
      <NaverMap
        defaultCenter={{ lat, lng }}
        zoom={15}
        minZoom={15}
        maxZoom={15}
        draggable={false}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
