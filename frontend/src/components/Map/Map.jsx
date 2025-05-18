import { useState } from "react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

const Map = ({ lat = 37.5666103, lng = 126.9783882 }) => {
    const [currentPosition, setCurrentPosition] = useState(null);


  return (
    <MapDiv
      style={{
        width: "100%",
        height: "300px",
      }}
    >
      <NaverMap defaultCenter={{ lat, lng }} defaultZoom={15}>
        <Marker defaultPosition={{ lat, lng }} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
