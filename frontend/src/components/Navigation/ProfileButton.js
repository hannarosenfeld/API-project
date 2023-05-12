import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-bars"></i>
        <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3&im_w=240"/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.firstName}</li>
        <li>{user.email }</li>
        <li className="navlinks" style={{display: "flex", flexDirection: "column"}}>
        <NavLink to="/spots/current">Manage Spots</NavLink>
        <NavLink to="/reviews/current">Manage Reviews</NavLink>
        </li>
        <li style={{alignSelf: "center", cursor: "pointer"}}>
          <button style={{alignSelf: "center", cursor: "pointer"}} onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
