import { useEffect, useState } from 'react';
import './styles/App.scss';
import ListingCard from "./components/ListingCard";
import {snakeCase} from "lodash";

function FetchJobs(props) {

  const[error, setError] = useState(null);
  const[isLoaded, setIsLoaded] = useState(false);
  const[moreLoaded, setMoreLoaded] = useState(false);
  const[moreError, setMoreError] = useState(null);
  const[items, setItems] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[canLoadMore, setCanLoadMore] = useState(false);

  function generateQuery(filters, pagenum = 0){
    let query = `${process.env.REACT_APP_CORS_PROXY}https://jobs.github.com/positions.json`;
    let queryPrefixes = 0;

    if(pagenum!==0){
      queryPrefixes++;
      query+=`${queryPrefixes===1 ? "?" : "&"}page=${pagenum}`;
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
    //console.log("Generated query for: " + query);
    return query;
  }
    
  useEffect(() => {
    //If the filters change, then reset the page state to 1:
    setCurrentPage(1);
    setCanLoadMore(true);

    fetch(generateQuery(props.filters))
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length < 50){
            setCanLoadMore(false);
          } else {
            setCanLoadMore(true);
          }
          setIsLoaded(true);
          setMoreLoaded(true);
          setItems(result);
        },

        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      )
  }, [props.filters])

function addJobs(pagenum){
  fetch(generateQuery(props.filters, pagenum))
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          setMoreLoaded(true);
          if (result===[]){
            setCanLoadMore(false)
          } else {
            setItems(prevItems => ([
              ...prevItems, ...result
            ]));
          }
          
        },

        (err) => {
          setMoreLoaded(false);
          setMoreError(err);
        }
      )

  setMoreLoaded(false);
}

function handleLoadMore(){
  setCurrentPage(currentPage + 1);
  //console.log("Loading page: " + currentPage);
  addJobs(currentPage);
}

  if (error) {
    return<div><h1 style={{textAlign: "center"}}>
    ERROR: {error.message}
</h1></div>;
  } else if (!isLoaded) {
    return <div><h1 style={{textAlign: "center"}}>
    Loading Listings...
</h1></div>;
  } else {
    return (<div className="job-listing-container" data-theme={props.toggleState}>
{items.map((item, id) => (
          <ListingCard listing={item} key={id} toggleState={props.toggleState} />
        ))}
        <div className="loadmore-container">
          {canLoadMore ? <button className="app-button loadmore-button" onClick={handleLoadMore}>Load More</button> : <p>All Results Loaded</p>}
          {moreError && <p style={{textAlign: "center"}}>Error: {moreError.message}</p>}
          {!moreLoaded && <p style={{textAlign: "center"}}>Loading more results...</p>}
        </div>
        </div>
    );
     
        
  }
 
}

export default FetchJobs;
