import { createContext } from 'react';

const UserEventsContext = createContext<{
  addToSavedEvents: Function,
  removeSavedEvent: Function,
  addToJoinedEvents: Function,
  removeJoinedEvent: Function
}>({
  addToSavedEvents: () => {},
  removeSavedEvent: () => {},
  addToJoinedEvents: () => {},
  removeJoinedEvent: () => {}
})

export default UserEventsContext;