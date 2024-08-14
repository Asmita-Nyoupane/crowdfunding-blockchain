"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlinks } from "./navlinks";
import { useContext } from "react";
import { CrowdFundingContext } from "@/Context/CrowdFunding";
import { Button } from "../ui/button";

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const path = usePathname();
  return (
    <div className=" sticky  top-0 left-0 right-0 shadow-md  bg-dark-500 z-50 ">
      <div className=" hidden xl:flex justify-between items-center w-11/12 mx-auto  h-20 ">
        <div className=" flex items-center justify-center ">
          <Image
            src={"/Images/DreamFundWhite.png"}
            alt="logo/"
            height={140}
            width={140}
            quality={100}
            priority={true}
            className="object-fill "
          />
        </div>
        <div className="flex gap-3  items-center justify-center  text-base">
          {navlinks.map((link, i) => (
            <Link
              key={i}
              href={link.link}
              className={`hover:bg-blue-300 rounded-md py-2 px-2  hover:text-white  ${
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

export default Navbar;
