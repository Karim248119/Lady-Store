import { Button } from "@/components/ui/button";
import React from "react";

const Header = ({ setIsAdding }) => {
  return (
    <header>
      <img src="../../pics/header.png" className="w-full h-[55vh]"></img>

      <div className=" absolute top-12 right-20">
        <button onClick={() => setIsAdding(true)}>
          <img
            src="../../pics/ADD product.png"
            className="h-40 w-40 hover:scale-110 transition-all"
          ></img>
        </button>
      </div>
      <div className=" absolute top-12 left-20">
        <button onClick={() => setIsAdding(true)}>
          <img
            src="../../pics/LOGOUT.png"
            className=" h-40 w-40 hover:scale-110 transition-all"
          ></img>
        </button>
      </div>
    </header>
  );
};

export default Header;
