import { useEffect, useState } from 'react';
import './styles/App.scss';
import ListingCard from "./components/ListingCard";
import {snakeCase} from "lodash";

function FetchJobs(props) {

  const[error, setError] = useState(null);
  const[isLoaded, setIsLoaded] = useState(false);
  const[items, setItems] = useState([]);

  function generateQuery(filters){
    let query = `${process.env.REACT_APP_CORS_PROXY}https://jobs.github.com/positions.json`;
    let queryPrefixes = 0;

    if(filters.page!==0){
      queryPrefixes++;
      query+=`${queryPrefixes===1 ? "?" : "&"}page=${filters.page}`;
    }

    if(filters.title!==""){
      queryPrefixes++;
      query+= `${queryPrefixes===1 ? "?" : "&"}search=${snakeCase(filters.title)}`;
    }

    if(filters.location!==""){
      queryPrefixes++;
      query+= `${queryPrefixes===1 ? "?" : "&"}location=${filters.location}`;
    }

    if(filters.full_time){
      queryPrefixes++;
      query+= `${queryPrefixes===1 ? "?" : "&"}full_time=${filters.full_time}`;
    }
    console.log("Generated query for: " + query);
    return query;
  }
    
  useEffect(() => {
    fetch(generateQuery(props.filters))
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      )
  }, [props.filters])

  if (error) {
    return<div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (<div className="job-listing-container" data-theme={props.toggleState}>
{items.map(item => (
          <ListingCard listing={item} toggleState={props.toggleState} />
        ))}
        </div>
    );
     
        
  }
 
}

export default FetchJobs;
