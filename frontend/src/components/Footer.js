import React from "react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillCopyrightCircle,
} from "react-icons/ai";

function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:justify-around justify-items-center w-2/3 mx-auto border-t-2 border-gray-500 mt-20 pb-12 select-none">
        <div className="flex flex-col gap-y-2 text-black">
          <h2 className="text-black p-4 md:text-2xl">
            Request a Feature or Report a Bug.
          </h2>
          <button className="bg-white text-gray-800 rounded-full p-4 text-sm font-semibold md:text-xl hover:bg-primaryOrange-light hover:text-black hover:cursor-pointer transition-all duration-200">
            Report/Request
          </button>
        </div>
        <div className="flex mt-4 justify-between">
          <div className="flex flex-col gap-y-2 p-2 text-black">
            <h3
              className={"hover:text-primaryOrange-light hover:cursor-pointer"}
            >
              Contact Us
            </h3>
            <h3
              className={"hover:text-primaryOrange-light hover:cursor-pointer"}
            >
              About Us
            </h3>
            <h3
              className={"hover:text-primaryOrange-light hover:cursor-pointer"}
            >
              Privacy Policy
            </h3>

          </div>
          <div className="flex flex-col gap-y-2 p-2 text-black">
            <AiFillLinkedin
              size={32}
              className={"hover:text-primaryOrange-light hover:cursor-pointer"}
            />
            <AiFillGithub
              size={32}
              className={"hover:text-primaryOrange-light hover:cursor-pointer"}
            />
            
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-x-2 text-black p-4 select-none">
        <div>2024 CarGo</div>
        <div>
          <AiFillCopyrightCircle />
        </div>
      </div>
    </>
  );
}

export default Footer;
