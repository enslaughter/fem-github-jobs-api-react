import ViewListing from "./ViewListing";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function GenerateListing(props) {
  //let location = useLocation();
  let { listingid } = useParams();
  let data = props.getListing(listingid);

  if (!data) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          ERROR: The specified listing could not be found.
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <ViewListing
          changePageView={props.changePageView}
          toggleState={props.toggleState}
          listing={data}
        />
        {/* If uselocation was being used, the listing would equal {location.state.listingdata} */}
      </div>
    );
  }
}

export default GenerateListing;
