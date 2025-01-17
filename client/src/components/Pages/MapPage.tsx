import * as L from "leaflet";
import { MapContainer, TileLayer,Marker, Popup, useMapEvents, Tooltip} from 'react-leaflet'
import Context from '../context/context';
import { useContext, useEffect, useState } from 'react';
import Layout from "../Layout/Layout";
import SearchComponent from "../UI/SearchComponent";
import './MapPage.css'
import Event from "../Event";
import QueryContext from "../context/queryContext";
import LoadingContext from "../context/loadingContext";
import AllEventsContext from "../context/allEventsContext";

function LocationMarker () {
  const [position, setPosition] = useState<L.LatLng | null>(null)

  var ownPositionIcon = new L.Icon({
    iconUrl: '/Map_marker.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const map = useMapEvents({
    locationfound(e: L.LocationEvent) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(()=> {
    map.locate()
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={ownPositionIcon}>
      <Tooltip>You are here</Tooltip>
    </Marker>
  )
}

const MapPage = () => {
  const {events} = useContext(AllEventsContext);
  const { isLoading} = useContext(LoadingContext);
  const {query} = useContext(QueryContext);
  var eventPositionIcon = new L.Icon({
    iconUrl: '/Map_marker_events.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function getMarkers(){
    return(
      events.map(event => {
        if(event.coordinates.length ===2){
          return event.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 && <Marker
          position={[event.coordinates[0],event.coordinates[1]]}
          icon={eventPositionIcon}>
          <Popup>
          <Event link={true} data={event}/>
          </Popup>
        </Marker>
        }
      })
    )
  }

  return (
    <Layout>
        <SearchComponent />
        {!isLoading &&
            <MapContainer className="mapContainer" center={[52.516357, 13.378979]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
            url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=gLEFUdwGIyJxOzqWgXnDyQdBUquHAVUDvqJFUliKpH3e5FQ68AZTwUphVyo81Tmn"
          />
          <LocationMarker />
            {getMarkers()}
          </MapContainer>}
      </Layout>
  )
}


export default MapPage;
