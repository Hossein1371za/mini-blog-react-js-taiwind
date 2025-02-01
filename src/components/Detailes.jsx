import React from "react";
import { useLocation } from "react-router-dom";
import Comments from "./Comments";

const Detailes = () => {
  const { state } = useLocation();
console.log(state);
  return (
    <div className="flex items-center justify-center h-screen container">
      <div className="border-secondary  rounded-lg border-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5">
          <div className="border-2 border-slate-200 rounded-md p-3 shadow-md">
            <img className="h-[300px] lg:h-[350px]" src={state.url} alt="."/>
            <div className=" bg-slate-300 mt-4 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <h6>نویسنده: {state && state.user.name}</h6>
              <h3>{state.title}</h3>
            </div>
            <p className="text-center pt-3">{state.desc}</p>
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
