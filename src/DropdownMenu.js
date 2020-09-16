import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

const DropdownMenu = React.forwardRef((props, ref) => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  const signOut = () => {
    if (user) {
      auth.signOut();
      history.push("/login");
    }
  };

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  function DropdownItem(props) {
    return (
      <div className="menu-item">
        <span className="icon-button"></span>
        {props.children}
        <span className="icon-right"></span>
      </div>
    );
  }

  return (
    <div
      className="dropdown"
      style={{ height: menuHeight }}
      ref={(dropdownRef, ref)}
    >
      <div className="menu">
        <DropdownItem>My Profile</DropdownItem>
        <DropdownItem>
          <Link to="/login" className="header__link">
            <div onClick={signOut}>Log out</div>
          </Link>
        </DropdownItem>
      </div>
    </div>
  );
});

export default DropdownMenu;
