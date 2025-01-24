import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { CgMenuRight } from "react-icons/cg";
import Nav from "./Nav";

const NavMobile = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="lg:hidden">
      <div
        onClick={() => setMenu(!menu)}
        className={`cursor-pointer text-[32px]`}
      >
        {menu ? <IoMdClose /> : <CgMenuRight />}
      </div>
      <Nav
        containerStyles="flex flex-col items-center justify-center"
        linkstyles={`${
          menu ? "right-0" : "-right-full"
        } flex flex-col absolute top-[100%] h-screen w-[80vw] bg-primary items-center justify-center gap-y-8 transition-all duration-500`}
      />
    </div>
  );
};

export default NavMobile;
