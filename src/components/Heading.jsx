import iconsun from "../assets/desktop/icon-sun.svg";
import iconmoon from "../assets/desktop/icon-moon.svg";
import iconfilter from "../assets/mobile/icon-filter.svg";
import iconfilterwhite from "../assets/mobile/icon-filter-white.svg";
import iconsearchwhite from "../assets/desktop/icon-search-white.svg";
import logo from "../assets/desktop/logo.svg";
import iconlocation from "../assets/desktop/icon-location.svg";

import {useState} from 'react';

function Heading(props){
    
    const[filtersOpen,setFiltersOpen] = useState(false);

    function toggleFilterModal(){
        filtersOpen ? setFiltersOpen(false) : setFiltersOpen(true);
    }

    const[location, setLocation] = useState(props.filters.location);
    const[fulltime, setFullTime] = useState(props.filters.full_time);
    const[title, setTitle] = useState(props.filters.title);

    function handleLocationChange(event){
        setLocation(event.target.value);
    }

    function handleFullTimeChange(event){
        setFullTime(event.target.checked);
    }

    function handleTitleChange(event){
        setTitle(event.target.value);
    }

    function handleTitleSubmit(event){
        event.preventDefault();
        submitSearch();
    }

    function submitSearch(){
        if(filtersOpen){
            toggleFilterModal();
        }
        props.setFilters({
            page: 0,
            title: title,
            location: location,
            full_time: fulltime
        })
        console.log(JSON.stringify(props.filters));
    }

    return(
        <div className="heading-container" data-theme={props.toggleState}>
            <div className="heading-top">
                <a href="/" rel="noreferrer"><img src={logo} alt=""></img></a>
                <div className="heading-toggle-container">
                    <img src={iconsun} alt=""></img>
                    <button id="toggle-theme" onClick={props.changeTheme}>
                        <div className={props.toggleState==="light" ? "theme-setting-indicator" : "theme-setting-indicator theme-setting-indicator--night"}></div>
                    </button>
                    <img src={iconmoon} alt=""></img>
                </div>
            </div>
            <div className="heading-filter-container" data-theme={props.toggleState} style={props.pageView==="home" ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                <form className="search-form" onSubmit={handleTitleSubmit}>
                    <input className="search-input" type="text" placeholder="Filter by title..." data-theme={props.toggleState} onChange={handleTitleChange} ></input>
                </form>
                <div>
                    <button id="button-search-filter" onClick={toggleFilterModal}><img src={props.toggleState==="light" ? iconfilter : iconfilterwhite} alt="" fill="white"></img></button>
                    <button id="button-search" onClick={submitSearch}><img src={iconsearchwhite} alt=""></img></button>
                </div>
            </div>
            <div className="filter-modal-container" style={filtersOpen ? {display: 'block'} : {display: 'none'}} >
                <div className="filter-modal-close" onClick={toggleFilterModal}></div>
                <div className="filter-modal-flexbox">
                    <div className="filter-modal">
                        <div className="filter-location">
                        <img src={iconlocation} alt=""></img><input type="text" placeholder="Filter by location..." onChange={handleLocationChange}></input>
                        </div>
                        <div>
                        <input type="checkbox" onChange={handleFullTimeChange}></input> <span>Full Time Only</span>
                        </div>
                        
                        <button className="app-button" onClick={submitSearch}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading;