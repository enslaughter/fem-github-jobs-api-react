import "./styles/App.scss";
import listingData from "./assets/testlistings.json";

import HomePage from "./HomePage";
import GenerateListingStatic from "./GenerateListingStatic";
// import ViewListing from "./ViewListing";
import Heading from "./components/Heading";
// import testListings from "./assets/testlistings.json";
// import FetchJobs from "./FetchJobs";

import { useMediaPredicate } from "react-media-hook";
//the useLocation hook can be included if not making an additional API call for direct listing linking
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [toggleState, setToggleState] = useState(
    useMediaPredicate("(prefers-color-scheme: dark)") ? "dark" : "light"
  );
  const [pageView, setPageView] = useState("listing");

  function getListing(id) {
    for (let listing of listingData) {
      if (listing.id === id) {
        return listing;
      }
    }
    return null;
  }

  function changeTheme() {
    if (toggleState === "light") {
      setToggleState("dark");
    } else {
      setToggleState("light");
    }
  }

  function changePageView(view) {
    setPageView(view);
  }

  const emptyFilters = {
    page: 0,
    title: "",
    location: "",
    full_time: false,
  };
  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {
    //console.log(JSON.stringify(filters));
  }, [filters]);

  return (
    <div className="app" data-theme={toggleState}>
      <Heading
        changeTheme={changeTheme}
        toggleState={toggleState}
        pageView={pageView}
        filters={filters}
        setFilters={setFilters}
      />
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage
              changeTheme={changeTheme}
              toggleState={toggleState}
              pageView={pageView}
              changePageView={changePageView}
              filters={filters}
            />
          </Route>
          <Route path="/listing/:listingid">
            {/* If the API was still functional, GenerateListing would be used over GenerateListingStatic */}
            <GenerateListingStatic
              changePageView={changePageView}
              getListing={getListing}
              toggleState={toggleState}
            />
          </Route>
          <Route>
            <h1>ERROR: Page not found!</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
