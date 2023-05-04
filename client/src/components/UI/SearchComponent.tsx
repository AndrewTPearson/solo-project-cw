import { useContext } from 'react';
import { Input } from 'antd';
import './Search.css';
import Context from '../context/context';
import QueryContext from '../context/queryContext';


const { Search } = Input;
const SearchComponent = () => {
  const {setQuery} = useContext(QueryContext)


  function onChangeHandler(e) {
    setQuery(e.target.value)
  }

  return (
    <Search
        placeholder="input search text"
        onChange={onChangeHandler}
        className="search-bar"
     />
)
}

export default SearchComponent;