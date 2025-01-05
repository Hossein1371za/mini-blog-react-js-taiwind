import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/", name: "خانه" },
  { path: "/register", name: "ثبت نام" },
  { path: "/login", name: "ورود" },
];

const Nav = ({ containerstyles, linkstyles }) => {
  
    const location = useLocation();
    const [pathName, setPathName] = useState(location.pathname);
    useEffect(() => {
        setPathName(location.pathname);
      }, [location.pathname]);
  return (
    <nav className={`${containerstyles}`}>
      <ul className={`${linkstyles}`}>
        {links.map((link, index) => (
          <Link 
            className={` ${
              link.path === pathName && "text-[#87ff99]"
            }`}
            key={index}
            to={link.path}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
