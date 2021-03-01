import ViewListing from './ViewListing';

import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function GenerateListing(props){
    //let location = useLocation();
    let {listingid} = useParams();
        let currentAPICall = `${process.env.REACT_APP_CORS_PROXY}https://jobs.github.com/positions/${String(listingid)}.json`;

        const[error, setError] = useState(null);
        const[isLoaded, setIsLoaded] = useState(false);
        const[items, setItems] = useState({});
    
        useEffect(() => {
            fetch(currentAPICall)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                setIsLoaded(true);
                setItems(result);
                },

                (err) => {
                setIsLoaded(true);
                setError(err);
                }
            )
        }, [])

    if(error){
        return(
            <div>
                ERROR: {error.message};
            </div>
        );
    } else if(!isLoaded){
        return(
            <div>
                Loading jobs...
            </div>
        );
    } else {
        return(
            <div>
                <ViewListing changePageView={props.changePageView} toggleState={props.toggleState} listing={items}/>
                {/* If uselocation was being used, the listing would equal {location.state.listingdata} */}
            </div>    
        )
    }

}

export default GenerateListing;