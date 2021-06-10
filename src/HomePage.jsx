import "./styles/App.scss";
import FetchJobs from "./FetchJobs";
import TestJobs from "./TestJobs";

import { useEffect } from "react";

function HomePage(props) {
  useEffect(() => {
    props.changePageView("home");
  });

  return (
    <div>
      {/* If the API was still up, this would be a FetchJobs component instead */}
      <TestJobs toggleState={props.toggleState} filters={props.filters} />
    </div>
  );
}

export default HomePage;
