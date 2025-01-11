import React from "react";
import { NavLink,useNavigate } from "react-router-dom";

const Nav = ({ containerstyles, linkstyles }) => {
  const navigate = useNavigate()
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className={`${containerstyles}`}>
      <ul className={`${linkstyles}`}>
        {
          localStorage.getItem("user_name") ?  (<>
            <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "text-secondary" : ""
            }
            to="/"
          >
            خانه
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "text-secondary" : ""
            }
            to="/blog"
          >
            ارسال بلاک
          </NavLink>
        </li>
        <button onClick={logout}>خروج</button>
          </>): (<>
          <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "text-secondary" : ""
            }
            to="/"
          >
            خانه
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "text-secondary" : ""
            }
            to="/register"
          >
            ثبت نام
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "text-secondary" : ""
            }
            to="/login"
          >
            ورود
          </NavLink>
        </li>
          </>)
        }
      </ul>
    </nav>
  );
};

export default Nav;
