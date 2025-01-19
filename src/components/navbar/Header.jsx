import React from "react";
import NavMobile from "./NavMobile";
import Nav from "./Nav";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-primary text-accent  h-16 z-40">
      <div className="container mx-auto flex items-center justify-between py-4 lg:py-6">
      <NavMobile />
      <Nav containerstyles="hidden lg:flex items-center justify-center gap-x-8" linkstyles="flex items-center gap-x-8"/>  
      <div>
        <Link to="/">Hossein Blog</Link>
      </div>  
        </div> 
    </header>
  );
};

export default Header;
