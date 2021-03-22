import React from "react";
import "./Header.css";
import DehazeIcon from "@material-ui/icons/Dehaze";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Header() {
  return (
    <div className="head__wrap">
      <div className="head__split">
        <div className="head__logo_wrap">
          <div className="head__dehazeIcon">
            <DehazeIcon fontSize="small" />
          </div>
          <div className="head__logo">My App</div>
        </div>
        <div className="head__main_wrap">
          <div className="head__main__iconGroup">
            <a href="#" className="head__main__searchIcon">
              <SearchIcon fontSize="small" />
            </a>
            <a href="#" className="head__main__moreVertIcon">
              <MoreVertIcon fontSize="small" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
