import {useEffect} from 'react';

//Needed for extra security in the app
import DOMPurify from "dompurify";

function ViewListing(props){

    useEffect(() => {
        props.changePageView('listing');
    })

    let currentTime = new Date();

    //Converts the time since posting into a readable format
    function convertTime(time){
        if (time>604800000){
            return Math.floor(time/604800000) + "w ago";
        }
        if (time>86400000){
            return Math.floor(time/86400000) + "d ago";
        }
        if (time>3600000){
            return Math.floor(time/3600000) + "h ago";
        }
        if (time>60000){
            return Math.floor(time/60000) + "min ago";
        }
        return "<1min ago";
    }

    return(
        <div className="view-listing-container" data-theme={props.toggleState}>
            <div className="listing" data-theme={props.toggleState}>
                <div>
                    <img className="listing-logo" src={props.listing.company_logo} alt=""></img>
                    <div>
                        {convertTime(currentTime - Date.parse(props.listing.created_at))}
                        &nbsp; • &nbsp;
                        {props.listing.type}
                    </div>
                    
                    <p>{props.listing.title}</p>
                    <div>{props.listing.company}</div>
                </div>
                <div className="listing-location">{props.listing.location}</div>
            </div>
            <div className="listing-description">
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.listing.description)}}></div>
            </div>
        </div>
    )
}

export default ViewListing;