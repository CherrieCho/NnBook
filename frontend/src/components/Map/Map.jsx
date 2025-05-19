import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

const Map = ({ lat, lng }) => {

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "300px",
      }}
    >
      <NaverMap
        defaultCenter={{ lat, lng }}
        zoom={16}
        minZoom={16}
        maxZoom={16}
        draggable={false}
      >
        <Marker defaultPosition={{ lat, lng }} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
