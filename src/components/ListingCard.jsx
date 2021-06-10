// import { Link } from "react-router-dom";

function ListingCard(props) {
  let currentTime = new Date();

  //Converts the time since posting into a readable format
  function convertTime(time) {
    if (time > 604800000) {
      return Math.floor(time / 604800000) + "w ago";
    }
    if (time > 86400000) {
      return Math.floor(time / 86400000) + "d ago";
    }
    if (time > 3600000) {
      return Math.floor(time / 3600000) + "h ago";
    }
    if (time > 60000) {
      return Math.floor(time / 60000) + "min ago";
    }
    return "<1min ago";
  }

  return (
    <div className="listing" data-theme={props.toggleState}>
      <div>
        <img
          className="listing-logo"
          src={props.listing.company_logo}
          alt=""
        ></img>
        {/* <div dangerouslySetInnerHTML={{__html: props.listing.description}}></div> */}
        <div>
          {convertTime(currentTime - Date.parse(props.listing.created_at))}
          &nbsp; • &nbsp;
          {props.listing.type}
        </div>
        {/* for useLocation: to={{pathname: `/listing/${props.listing.id}`, state: {listingdata: props.listing}}} */}
        <a href={`/listing/${props.listing.id}`}>
          <p data-theme={props.toggleState}>{props.listing.title}</p>
        </a>
        <div>{props.listing.company}</div>
        <div className="listing-location">{props.listing.location}</div>
      </div>
    </div>
  );
}

export default ListingCard;
