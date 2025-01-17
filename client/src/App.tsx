import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Register from './components/UserAuth/Register';
import Login from './components/UserAuth/Login';
import ProfilePage from './components/Pages/ProfilePage';
import { useEffect, useState } from 'react';
import Context from './components/context/context';
import AllEventsContext from './components/context/allEventsContext';
import LoadingContext from './components/context/loadingContext';
import NavigationContext from './components/context/navigationContext';
import UserContext from './components/context/userContext';
import QueryContext from './components/context/queryContext';
import AllUsersContext from './components/context/allUsersContext';
import UserEventsContext from './components/context/userEventsContext';
import HomePage from './components/Pages/HomePage';
import * as EventService from './services/event_service';
import * as UserService from './services/user_service';
//import * as ActiveUserService from './services/active_user_service';
import EventPage from './components/Pages/EventPage';
import MapPage from './components/Pages/MapPage';
import MyEventsPage from './components/Pages/MyEvents';
import { formatEvents } from './helpers/formatting_functions';
import { User } from './types/User';
import { EventInterface } from './types/EventInterface';


function App() {
  
  const navigate = useNavigate();
  const [events, setEvents] = useState <EventInterface[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('')

  function addToSavedEvents(eventId){
    if (activeUser && activeUser._id) {
      UserService.addSavedEvent(activeUser._id, eventId).then(data=>setActiveUser(data))
    }
  }

  function removeSavedEvent(eventId){
    if (activeUser && activeUser._id) {
      UserService.removeSavedEvent(activeUser._id, eventId).then(data=>setActiveUser(data))
    }
  }

  function addToJoinedEvents(eventId){
    if (activeUser && activeUser._id) {
      EventService.addUserToJoinedList(activeUser._id, eventId)
      UserService.addJoinedEvent(activeUser._id, eventId).then(data=>setActiveUser(data))
    }
  }
  function removeJoinedEvent(eventId){
    if (activeUser && activeUser._id) {
      EventService.removeUserFromJoinedList(activeUser._id, eventId)
      UserService.removeJoinedEvent(activeUser._id, eventId).then(data=>setActiveUser(data))
    }
  }

  //Manually set for demonstartion
  // As stated in the README file in the main project folder,
  // if you added the mock-users and mock-events json files to your database
  // getting the active User will work as you will have an existent user with
  // id  "644116416da455b7fc0c8bba".
  // If you started clean this will give you an error. You can create a user
  // manually and then change the id here in the function.
  // In the future this would be dinamically set with an authentication process.
  async function getActiveUser() {
    setActiveUser(await UserService.getUserById(process.env.REACT_APP_USERID))
   }

  function getAllUsers () {
    UserService.getAllUsers()
    .then(data => {
      setUsers(data)
    })
  }

   function getAllEvents () {
    if(activeUser){
      EventService.getAllEvents(activeUser._id)
      .then(data => {
        setEvents(formatEvents(activeUser, data))
      })
      .then(() => {
        // only when all the activeUser, the users and the events states
        // have been set the loading state will be set to false.
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  useEffect(()=> {
      if(users){
        getActiveUser()
      }
  }, [users])

  useEffect(() => {
    getAllEvents();
  }, [activeUser]);

  return (
    // Config provider from Ant-design
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8663F3',
            colorTextPlaceholder: '#8663F3'
          },
        }}>
    <AllUsersContext.Provider value={{users}}>
      <AllEventsContext.Provider value={{events, setEvents, getAllEvents}}>
        <UserContext.Provider value={{activeUser, getActiveUser, setActiveUser}}>
          <UserEventsContext.Provider value={{addToJoinedEvents, addToSavedEvents, removeJoinedEvent, removeSavedEvent}}>
            <QueryContext.Provider value={{query, setQuery}}>
              <NavigationContext.Provider value={navigate}>
                <LoadingContext.Provider value={{isLoading}}>
                  <Context.Provider
                    value={{
                      navigate,  // navigation
                      setEvents, // events
                      events, // events
                      isLoading, // loading
                      users,  // ?
                      activeUser,  // user
                      getAllEvents,  // events
                      getActiveUser,  // user
                      setActiveUser,  // user
                      addToSavedEvents,  // userevents
                      removeSavedEvent,  // userevents
                      addToJoinedEvents,  // userevents
                      removeJoinedEvent,  // userevents
                      setQuery,  // query - and also below
                      query}}>
                    <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile/:username" element={<ProfilePage />}/>
                    <Route path="/event/:eventtitle" element={<EventPage />}/>
                    <Route path="/mapview" element={<MapPage />}/>
                    <Route path="/myevents" element={<MyEventsPage />}/>
                    <Route path="/" element={<HomePage />}/>
                    </Routes>
                  </Context.Provider>
                </LoadingContext.Provider>
              </NavigationContext.Provider>
            </QueryContext.Provider>
          </UserEventsContext.Provider>
        </UserContext.Provider>
      </AllEventsContext.Provider>
    </AllUsersContext.Provider>
    </ConfigProvider>
  );
}

export default App;
