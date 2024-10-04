import React from "react";

import { Link } from "react-router-dom";
const Shops = ({ data }) => {
  return (
    <>
      <Link to={data.link} className="shoperBox">
          <div className="top">
            <img src={data.url} />
          </div>
          <div className="name">{data.name}</div>
      </Link>
    </>
  );
};

export default Shops;
