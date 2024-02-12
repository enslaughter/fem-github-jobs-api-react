import ListingCard from "./components/ListingCard";

import testListings from "./assets/testlistings.json";

import { useEffect, useState } from "react";

function TestJobs(props) {
  const [listings, setListings] = useState(filterListings(testListings));

  function filterListings(listingData) {
    return listingData.filter((listing) => {
      if (
        !listing.title.toLowerCase().includes(props.filters.title.toLowerCase())
      ) {
        return false;
      }
      if (
        !listing.location
          .toLowerCase()
          .includes(props.filters.location.toLowerCase())
      ) {
        return false;
      }
      if (props.filters.full_time && listing.type != "Full Time") {
        return false;
      }
      return true;
    });
  }

  useEffect(() => {
    setListings(filterListings(listings));
  }, [props.filters]);

  return (
    <div className="job-listing-container" data-theme={props.toggleState}>
      {listings.map((listingData, id) => {
        return (
          <ListingCard
            listing={listingData}
            key={id}
            toggleState={props.toggleState}
          />
        );
      })}
    </div>
  );
}

export default TestJobs;
