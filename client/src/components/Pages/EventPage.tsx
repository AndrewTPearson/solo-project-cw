import EventList from "../EventList";
import Layout from "../Layout/Layout";
import SearchComponent from "../UI/SearchComponent";
import Context from "../context/context";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Event from "../Event";
import { Avatar, FloatButton } from "antd";
import './EventPage.css';
import { MapContainer, TileLayer,Marker} from 'react-leaflet'
import { User } from "../../types/User";
import { EventInterface } from "../../types/EventInterface";
import AllUsersContext from "../context/allUsersContext";
import UserContext from "../context/userContext";
import AllEventsContext from "../context/allEventsContext";
import UserEventsContext from "../context/userEventsContext";

const EventPage = () => {

const {events} = useContext(AllEventsContext);
const {addToJoinedEvents, removeJoinedEvent} = useContext(UserEventsContext);
const {users} = useContext(AllUsersContext);
const {activeUser} = useContext(UserContext);

const {state} = useLocation();
const [event, setEvent] = useState<EventInterface | null>(null)
const [joined, setJoined] = useState<boolean>();
const [listUsersJoining, setListUsersJoining] = useState<String[]>([]);
const [numberUsersJoining, setNumberUsersJoining] = useState<number>()


function getJoinedUsersInfo(userId) {
  if(userId !==null){
    if(users){
      let avatar = users.find(user => {
        return user._id === userId
      })
      return avatar ? <Avatar src={`https://res.cloudinary.com/dyjtzcm9r/image/upload/v1682429215/${avatar.profilePicture}`} /> : <></>;
    }
  }
}

useEffect(() => {
  function findEventByID (id) {
    const eventFound = events.find(event => event._id === id)
    if (eventFound) {
      setEvent(eventFound);
      console.log('Bug needs fixing, in Event Page line 48');
      setJoined(!! activeUser && eventFound.joined.includes(activeUser.name));
      // NB The above will never regard an event as joined, name should by ID but
      // TS screams whenever I set it to any variation on _id and don't have time to fix immediately
      setNumberUsersJoining(eventFound.joined.length);
      setListUsersJoining(eventFound.joined);
    }
  }
  if(events){
    findEventByID(state.id)
  }
}, [events])

  return (
    <Layout>
        <div className="event-page">
        {event ? <><Event link={false} data={event} numberUsersJoining={numberUsersJoining} isEventFromOwner={!! activeUser && event.owner === activeUser._id?.$oid}></Event>

          <MapContainer className="event-page-map-container"
            center={[event.coordinates[0], event.coordinates[1]]}
            zoom={13}
            scrollWheelZoom={false}>
            <TileLayer
              attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
              url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=gLEFUdwGIyJxOzqWgXnDyQdBUquHAVUDvqJFUliKpH3e5FQ68AZTwUphVyo81Tmn"
            />
            <Marker
            position={[event.coordinates[0],event.coordinates[1]]}
            >
            </Marker>
          </MapContainer>
          <div className="divider"></div>
          <section className="event-page-section">
            <h3>Description</h3>
            <div>{event.description}
            </div>
          </section>
          <div className="divider"></div>
          <section className="event-page-section">
            <h3>Joining</h3>
            <div>{listUsersJoining.length > 0 && listUsersJoining.map(joinedUserId => {
              return getJoinedUsersInfo(joinedUserId)
            })}
            </div>
          </section>
          <div className="divider"></div>
          <section className="event-page-section">
            <h3>Announcements</h3>
            {/* <div>{event.announcements}</div> */}
          </section>

          {joined ? <button className="button join-button"
            onClick={()=>{
              setJoined(false);
              if (numberUsersJoining) setNumberUsersJoining(numberUsersJoining-1);
              setListUsersJoining(listUsersJoining.filter(joinedUserId => joinedUserId !== activeUser?._id?.$oid));
              removeJoinedEvent(event._id); }}>JOINED</button>
              :
              <button className="button join-button"
              onClick={()=>{
              setJoined(true);
              if (numberUsersJoining) setNumberUsersJoining(numberUsersJoining+1);
              if (activeUser?._id?.$oid) setListUsersJoining([...listUsersJoining, activeUser._id.$oid]);
              addToJoinedEvents(event._id);
            }}>JOIN</button>

              }
      </>
      : 'loading...'}
      </div>
    </Layout>
  )
}

export default EventPage;
