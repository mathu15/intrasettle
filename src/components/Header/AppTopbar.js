import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

export const AppTopbar = (props) => {
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img src={"images/userlogodarkk2.png"} alt="logo" />

        <span>Deployer</span>
      </Link>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={classNames("layout-topbar-menu lg:flex origin-top", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      >
        <li>
          <span className="text-xl">LOGOUT</span>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-power-off text-2xl" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
