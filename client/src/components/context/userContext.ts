import { createContext } from 'react';
import { User } from '../../types/User';

const UserContext = createContext<{
  activeUser: User | null,
  getActiveUser: Function,
  setActiveUser: Function
}>({
  activeUser: null,
  getActiveUser: () => {},
  setActiveUser: () => {}
});

export default UserContext;