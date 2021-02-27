import './styles/App.scss';
import FetchJobs from "./FetchJobs";

import {useEffect} from 'react';

function HomePage(props){

    useEffect(() => {
        props.changePageView('home');
    })

    return(
        
        <div>
            <FetchJobs toggleState={props.toggleState} filters={props.filters}/>
        </div>
    )
}

export default HomePage;