import { createContext } from 'react';

const QueryContext = createContext<{
  query: String,
  setQuery: Function
}>({
  query: '',
  setQuery: () => {}
});

export default QueryContext;