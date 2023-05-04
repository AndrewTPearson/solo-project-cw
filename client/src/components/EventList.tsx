import { useContext } from "react";
import Context from "./context/context";
import Event from "./Event";
import './EventList.css';
import LoadingComponent from "./UI/LoadingComponent";
import LoadingContext from "./context/loadingContext";
import QueryContext from "./context/queryContext";

function EventList ({events, isEventFromOwner = false}) {
const {isLoading} = useContext(LoadingContext)
const {query} = useContext(QueryContext)

 return(
  <>
 {isLoading ? <LoadingComponent /> :
 <div className="event-list" id="list">
    {events.map((singleEvent, index) => {
      if(singleEvent.title !== ''){
        return singleEvent.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 && <>
            {index > 0 && <div className="divider"></div>}
            <Event key={singleEvent.title} link={true} data={singleEvent} isEventFromOwner={singleEvent.isEventFromOwner}/>
            </>
      }
      })}
  </div>}

  </>
 )
}

export default EventList;