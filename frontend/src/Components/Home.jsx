import React from "react";
import { Link } from "react-router-dom";
import UIC from "../UI_Components/UIC";

const Home = (props) => (
  <div className="d-flex" style={{ placeContent: "center" }}>
    <div
      className="content-section"
      style={{ width: "700px", height: "300px" }}
    >
      <legend className="pt-xl-5 pb-xl-4" style={{ textAlign: "center" }}>
        Home
      </legend>

      <div className="pt-xl-5 pb-xl-4 font-16" style={{ textAlign: "center" }}>
        <Link to="/table">
          <UIC.Button>Explore Our Database</UIC.Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
