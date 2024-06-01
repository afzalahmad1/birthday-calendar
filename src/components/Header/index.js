import React from "react";
import "./styles.css";

import {  NavLink } from "react-router-dom";
import DatePickerValue from "../DatePickerValue";

const Header = ({ births, setBirths }) => {
  return (
    <div className="navbar">
      <div className="links">
        <NavLink to="/">Names</NavLink>
        <NavLink to="/fav">Favorite</NavLink>
      </div>
      <div className="date-container">
        <DatePickerValue births={births} setBirths={setBirths} />
      </div>
    </div>
  );
};

export default Header;
