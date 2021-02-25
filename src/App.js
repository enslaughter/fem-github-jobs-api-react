import "./styles/App.scss";
import HomePage from "./HomePage";
import ViewListing from "./ViewListing";
import Heading from "./components/Heading";
import testListings from "./assets/testlistings.json";


import {useMediaPredicate} from 'react-media-hook';
//the useLocation hook can be included if not making an additional API call for direct listing linking
import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';
import {useState, useEffect} from "react";
//import FetchJobs from "./FetchJobs";

function App(){
    const[toggleState, setToggleState] = useState(useMediaPredicate("(prefers-color-scheme: dark)") ? "dark" : "light");
    const[pageView, setPageView] = useState("listing");
    const[activeListing, setActiveListing] = useState(testListings[0]);

    function changeActiveListing(listing){
        setActiveListing(listing);
    }

    function getActiveListing(){
        return activeListing;
    }

    function changeTheme(){
        if(toggleState==="light"){
            setToggleState("dark");
        } else {
            setToggleState("light");
        }
    }

    function changePageView(view){
        setPageView(view);
    }

    function GenerateListing(props){
        //let location = useLocation();
        let {listingid} = useParams();
        //console.log("Listing ID is " + listingid);
        //console.log("Listing ID type is " + typeof lisitngid);
            //let currentAPICall = `https://jobs.github.com/positions/${id}.json?markdown=true`;
            //let currentAPICall = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
            let currentAPICall = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${String(listingid)}.json`;
            //console.log("API calling; " + currentAPICall + " type is " + typeof currentAPICall);
            // var callHeaders = new Headers({
            //     "X-Requested-With": "XMLHttpRequest",
            //     "Access-Control-Allow-Headers": "x-requested-with",
            //     "Content-type": "application/json"
            // })

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
        
            //console.log(JSON.stringify(items[0]));

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
                    <Heading changeTheme={changeTheme} toggleState={toggleState} pageView={pageView}/>
                    <ViewListing changePageView={changePageView} toggleState={toggleState} listing={items}/>
                    {/* If uselocation was being used, the listing would equal {location.state.listingdata} */}
                </div>    
            )
        }
    
    }

    return(
        <div className="app" data-theme={toggleState}>
        <Router>
        <Switch>
            <Route path="/" exact>
                <HomePage changeTheme={changeTheme} toggleState={toggleState} pageView={pageView} changePageView={changePageView}/>
            </Route>
            <Route path="/listing/:listingid" component={GenerateListing}>
                {/* <Heading changeTheme={changeTheme} toggleState={toggleState} pageView={pageView}/>
                <ViewListing changePageView={changePageView} toggleState={toggleState} listing={activeListing}></ViewListing> */}
            </Route>
            <Route>
                <h1>ERROR: Page not found!</h1>
            </Route>
        </Switch>
        </Router>
            {/* Until functionality works again: <FetchJobs /> */}
            
        </div>
    )
}

export default App;