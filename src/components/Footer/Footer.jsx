import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark-500 text-white ">
      <div className="grid w-11/12 mx-auto  grid-cols-1 md:grid-cols-3 md:gap-3 gap-6 items-center  py-4 ">
        <div className="md:col-span-2">
          <p className="flex text-sm ">All Copyright Belongs to DreamFund</p>
        </div>

        <div className="flex gap-3   w-full text-sm    md:justify-end md:px-4">
          <Link href={"/"} className="border-r-2 pr-4 ">
            Terms of Condition
          </Link>
          <Link href={"/"}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
