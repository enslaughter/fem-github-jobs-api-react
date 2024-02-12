import iconsun from "../assets/desktop/icon-sun.svg";
import iconmoon from "../assets/desktop/icon-moon.svg";
import iconfilter from "../assets/mobile/icon-filter.svg";
import iconfilterwhite from "../assets/mobile/icon-filter-white.svg";
import iconsearchwhite from "../assets/desktop/icon-search-white.svg";
import iconcheck from "../assets/desktop/icon-check.svg";
import iconcheckpurple from "../assets/desktop/icon-check-purple.svg";
import logo from "../assets/desktop/logo.svg";
import iconlocation from "../assets/desktop/icon-location.svg";

import { useState } from "react";

function Heading(props) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  function toggleFilterModal() {
    filtersOpen ? setFiltersOpen(false) : setFiltersOpen(true);
  }

  const [location, setLocation] = useState(props.filters.location);
  const [fulltime, setFullTime] = useState(props.filters.full_time);
  const [title, setTitle] = useState(props.filters.title);

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleFullTimeChange(event) {
    event.target.checked ? setCheckboxChecked(true) : setCheckboxChecked(false);
    setFullTime(event.target.checked);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleTitleSubmit(event) {
    event.preventDefault();
    submitSearch();
  }

  function submitSearch() {
    if (filtersOpen) {
      toggleFilterModal();
    }
    props.setFilters({
      page: 0,
      title: title,
      location: location,
      full_time: fulltime,
    });
  }

  return (
    <div className="heading-container" data-theme={props.toggleState}>
      <div className="heading-top">
        <a href="/" rel="noreferrer">
          <img src={logo} alt=""></img>
        </a>
        <div className="heading-toggle-container">
          <img src={iconsun} alt=""></img>
          <button id="toggle-theme" onClick={props.changeTheme}>
            <div
              className={
                props.toggleState === "light"
                  ? "theme-setting-indicator"
                  : "theme-setting-indicator theme-setting-indicator--night"
              }
            ></div>
          </button>
          <img src={iconmoon} alt=""></img>
        </div>
      </div>
      <div
        className="heading-filter-container"
        data-theme={props.toggleState}
        style={
          props.pageView === "home"
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <form className="search-form" onSubmit={handleTitleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Filter by title..."
            data-theme={props.toggleState}
            onChange={handleTitleChange}
          ></input>
        </form>
        <div>
          <button id="button-search-filter" onClick={toggleFilterModal}>
            <img
              src={props.toggleState === "light" ? iconfilter : iconfilterwhite}
              alt=""
              fill="white"
            ></img>
          </button>
          <button id="button-search" onClick={submitSearch}>
            <img src={iconsearchwhite} alt=""></img>
          </button>
        </div>
      </div>
      <div
        className="filter-modal-container"
        style={filtersOpen ? { display: "block" } : { display: "none" }}
      >
        <div className="filter-modal-close" onClick={toggleFilterModal}></div>
        <div className="filter-modal-flexbox">
          <div className="filter-modal" data-theme={props.toggleState}>
            <div className="filter-location">
              <img src={iconlocation} alt=""></img>
              <input
                type="text"
                placeholder="Filter by location..."
                onChange={handleLocationChange}
                data-theme={props.toggleState}
              ></input>
            </div>
            <div className="filter-checkbox">
              <input
                type="checkbox"
                onChange={handleFullTimeChange}
                data-theme={props.toggleState}
              ></input>
              <img
                className="checkbox-check"
                src={iconcheck}
                alt=""
                style={
                  checkboxChecked
                    ? { visibility: "visible", pointerEvents: "none" }
                    : { visibility: "hidden", pointerEvents: "none" }
                }
              ></img>{" "}
              <span className="checkbox-ft">Full Time Only</span>
            </div>
            <div className="filter-submit">
              <button className="app-button" onClick={submitSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heading;
