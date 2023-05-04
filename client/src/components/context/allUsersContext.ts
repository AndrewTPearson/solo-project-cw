import { createContext } from 'react';
import { User } from '../../types/User';

const AllUsersContext = createContext<{users: User[]}>({users: []});

export default AllUsersContext;