import React from "react";

const Navbar = () => {
  return (
    <div className="max-w-screen-2xl fixed mx-auto container px-6 py-3 md:px-40 shadow-lg h-16  bg-slate-900">
      <div className="flex justify-between h-10 text-white">
        <h1 className="text-2xl cursor-pointer font-bold ">
          Word<span className="text-3xl text-purple-600">To</span>PDF
        </h1>
        <h1 className="mt-1 hover:scale-95 duration-150 text-2xl cursor-pointer font-bold ">Home</h1>
      </div>
    </div>
  );
};

export default Navbar;
