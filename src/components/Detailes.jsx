import React from "react";
import { useLocation } from "react-router-dom";
import Comments from "./Comments";

const Detailes = () => {
  const { state } = useLocation();
  return (
    <div className="flex lg:items-center justify-center lg:h-screen container mt-8 lg:mt-0 ">
      <div className="border-slate-300 shadow-lg  rounded-lg border-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5">
          <div className="border-2 border-slate-200 rounded-md p-3 shadow-md">
            <img className="h-[300px] lg:h-[350px]" src={state.url} alt="."/>
            <div className=" bg-slate-300 mt-4 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">نویسنده: {state && state.user.name}</h3>
              <h6 className="font-bold">{state.title}</h6>
            </div>
            <p className="text-center pt-3 text-slate-800">{state.desc}</p>
            </div>
          </div>
          <div className="border-2 border-slate-200 rounded-md p-3 shadow-md">
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailes;
