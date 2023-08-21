import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import DeleteReviewModal from "../DeleteReviewModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1.5em"
        }}>
        <NavLink
        style={{
          alignSelf: "center"
        }}
        to="/spots/new"
        >Create a New Spot</NavLink>
        <ProfileButton user={sessionUser} />
      </li >
    );
  } else {
    sessionLinks = (
      <div>
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-bars"></i>
        <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3&im_w=240"/>
      </button>

      <div className={ulClassName} ref={ulRef}>
      <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
    );
  }

  return (
    <div className="nav-wrapper">
    <ul className="nav">
      <li className="home-button">
        <NavLink exact to="/">
          <span style={{marginLeft: "1.2em"}}><i class="fa-regular fa-heart"></i> oibnb</span>
        </NavLink>

      </li>
      {isLoaded && sessionLinks}
    </ul>
    </div>
  );
}

export default Navigation;
