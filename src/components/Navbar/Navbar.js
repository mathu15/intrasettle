import React from "react";

import { Menubar } from "primereact/menubar";
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import navitems from "./navitem";

const Navbar = () => {
  return (
    <div>
      <Menubar model={navitems} />
    </div>
  );
};

export default Navbar;
