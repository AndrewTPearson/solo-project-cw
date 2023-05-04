import { createContext } from 'react';
import { EventInterface } from '../../types/EventInterface';

const AllEventsContext = createContext<{
  events: EventInterface[],
  setEvents: Function,
  getAllEvents: Function
}>({
  events: [],
  setEvents: () => {},
  getAllEvents: () => {}
});

export default AllEventsContext;