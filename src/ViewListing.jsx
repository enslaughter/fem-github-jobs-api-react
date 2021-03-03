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

    //Search for the "how to apply" link for direct button components
    let parser = new DOMParser();
    let howtoapply = parser.parseFromString(props.listing.how_to_apply, "text/html");
    let apply_hyperlink = (howtoapply.querySelector('a') ? howtoapply.querySelector('a').href : "");

    return(
        <div className="view-listing-container" data-theme={props.toggleState}>

            <div className="listing-companyinfo" data-theme={props.toggleState}>
                <img className="listing-logo" src={props.listing.company_logo} alt=""></img>
                <h1 className="company-title" data-theme={props.toggleState}>{props.listing.company}</h1>
                <p className="company-url" data-theme={props.toggleState}>{props.listing.company_url}</p>
                {props.listing.company_url && <a className="app-button-linked app-button-company" href={props.listing.company_url} target="_blank" rel="noreferrer" data-theme={props.toggleState}>Company Site</a>}
            </div>

            <div className="listing-description" data-theme={props.toggleState}>
                    <div>
                        {convertTime(currentTime - Date.parse(props.listing.created_at))}
                        &nbsp; • &nbsp;
                        {props.listing.type}
                    </div>
                    <h3 data-theme={props.toggleState}>{props.listing.title}</h3>
                    <div className="listing-location">{props.listing.location}</div>
                    {apply_hyperlink && <a className="app-button-linked" href={apply_hyperlink} target="_blank" rel="noreferrer">Apply Now</a>}
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.listing.description)}}></div>
                    
            </div>

            <div className="listing-howtoapply">
                <h3>How to Apply</h3>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.listing.how_to_apply)}}></div>
                <a href={apply_hyperlink} target="_blank" rel="noreferrer">{apply_hyperlink}</a>
            </div>
            <div className="listing-footer" data-theme={props.toggleState}>
                {apply_hyperlink && <a className="app-button-linked" href={apply_hyperlink} target="_blank" rel="noreferrer">Apply Now</a>}
            </div>
        </div>
    )
}

export default ViewListing;