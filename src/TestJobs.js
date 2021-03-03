import ListingCard from "./components/ListingCard";

import testListings from "./assets/testlistings.json";

function TestJobs(props){

    return(
        <div className="job-listing-container">
            {testListings.map((listingData, id) => {
                return(
                    <ListingCard listing={listingData} key={id} toggleState={props.toggleState} />
                )
            })}
        </div>
    )
}

export default TestJobs;