import React, { Component } from "react";
import HomeBanner from "./homebanner";
import PopularSection from "./popularsection";
import Features from "./feature";
import SearchTestLoc from "./searchtestloc";
import SalesTeam from "./salesTeam";
import MapList from "./maplist";
import FormInfo from "./forminfo";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="main-wrapper">
          <HomeBanner />
          {/* <PopularSection /> */}
          {/* <Features /> */}
          <br />
          <SearchTestLoc />
          <br />
          <MapList />
          <SalesTeam />
          <FormInfo />
        </div>
      </div>
    );
  }
}
export default Home;
