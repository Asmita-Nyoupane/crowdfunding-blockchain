"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { navlinks } from "./navlinks";
import { CrowdFundingContext } from "@/Context/CrowdFunding";
import { Button } from "../ui/button";
const SideHeader = () => {
  const path = usePathname();
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=" sticky  top-0 left-0 right-0  z-50 ">
      <div
        className={`xl:hidden flex justify-between items-center px-4  bg-dark-500  z-20 ${
          isOpen ? "brightness-50" : ""
        }`}
      >
        <Image
          src={"/Images/DreamFundWhite.png"}
          alt="logo/"
          height={300}
          width={300}
          quality={100}
          priority={true}
          className="object-fill w-28 h-28"
        />
        <div
          onClick={toggleNavBar}
          className="text-3xl shadow-sm  text-white rounded-md p-2 flex my-auto hover:bg-blue-200"
        >
          {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </div>
      </div>
      <div
        className={`xl:hidden flex flex-col gap-1 items-center bg-dark-500 py-4 translate-x-0 top-0 right-0 fixed w-[40%] h-full duration-500 overflow-hidden transform ease-in-out transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={toggleNavBar}
      >
        {isOpen && (
          <div className="absolute top-0  right-0 p-4 z-10">
            <button
              onClick={toggleNavBar}
              className="hover:bg-blue-200 p-2  text-white rounded-full"
            >
              <RxCross1 size={24} className="" />
            </button>
          </div>
        )}
        <div className="mt-8 flex flex-col items-center gap-3">
          {navlinks.map((link, i) => (
            <Link
              key={i}
              href={link.link}
              className={`hover:bg-blue-300 rounded-md  py-2 px-2  hover:text-white  ${
                path === link.link ? "bg-blue-300 font-medium" : "text-white"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <Button onClick={connectWallet} className="shadBtn">
          {currentAccount
            ? currentAccount.slice(0, 6) + "..." + currentAccount.slice(-4)
            : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
};

export default SideHeader;
